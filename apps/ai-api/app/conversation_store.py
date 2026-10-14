import os
from threading import Lock
from typing import Any

import psycopg
from psycopg.rows import dict_row
from psycopg.types.json import Jsonb


HISTORY_LIMIT = int(os.getenv("CONVERSATION_HISTORY_LIMIT", "12"))
DATABASE_URL = os.getenv("DATABASE_URL") or os.getenv("NEON_DATABASE_URL")

schema_lock = Lock()
schema_ready = False


def _database_url() -> str:
    if not DATABASE_URL:
        raise RuntimeError(
            "Set DATABASE_URL or NEON_DATABASE_URL for conversation storage"
        )
    return DATABASE_URL


def _connect():
    return psycopg.connect(
        _database_url(),
        row_factory=dict_row,
    )


def _ensure_schema(conn) -> None:
    global schema_ready

    if schema_ready:
        return

    with schema_lock:
        if schema_ready:
            return

        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS ai_conversation_messages (
                id BIGSERIAL PRIMARY KEY,
                phone TEXT NOT NULL,
                role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
                content TEXT NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT now()
            )
            """
        )
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_ai_conversation_messages_phone_id
            ON ai_conversation_messages (phone, id DESC)
            """
        )
        # Extracted lead data, stored on assistant messages so it survives
        # between turns instead of being re-derived from the chat text.
        conn.execute(
            """
            ALTER TABLE ai_conversation_messages
            ADD COLUMN IF NOT EXISTS record JSONB
            """
        )
        conn.commit()
        schema_ready = True


def _lock_phone(conn, phone: str) -> None:
    conn.execute(
        "SELECT pg_advisory_xact_lock(hashtextextended(%s, 0))",
        (phone,),
    )


def _fetch_recent_messages(conn, phone: str) -> list[dict[str, str]]:
    rows = conn.execute(
        """
        SELECT role, content
        FROM (
            SELECT role, content, id
            FROM ai_conversation_messages
            WHERE phone = %s
            ORDER BY id DESC
            LIMIT %s
        ) recent
        ORDER BY id ASC
        """,
        (phone, HISTORY_LIMIT),
    ).fetchall()

    return [
        {
            "role": row["role"],
            "content": row["content"],
        }
        for row in rows
    ]


def _fetch_last_record(conn, phone: str) -> dict[str, Any] | None:
    row = conn.execute(
        """
        SELECT record
        FROM ai_conversation_messages
        WHERE phone = %s AND record IS NOT NULL
        ORDER BY id DESC
        LIMIT 1
        """,
        (phone,),
    ).fetchone()

    return row["record"] if row else None


def _insert_message(
    conn,
    phone: str,
    role: str,
    content: str,
    record: dict[str, Any] | None = None,
) -> None:
    conn.execute(
        """
        INSERT INTO ai_conversation_messages (phone, role, content, record)
        VALUES (%s, %s, %s, %s)
        """,
        (phone, role, content, Jsonb(record) if record else None),
    )


def run_with_phone_context(phone: str, callback) -> Any:
    with _connect() as conn:
        _ensure_schema(conn)
        with conn.transaction():
            _lock_phone(conn, phone)
            previous_messages = _fetch_recent_messages(conn, phone)
            previous_record = _fetch_last_record(conn, phone)
            result = callback(previous_messages, previous_record)
            _insert_message(
                conn,
                phone,
                "user",
                result.user_content,
            )
            _insert_message(
                conn,
                phone,
                "assistant",
                result.response,
                result.record,
            )
            return result
