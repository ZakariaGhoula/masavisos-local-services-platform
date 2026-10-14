
import os
import json
import hmac
import hashlib
import logging
import asyncio

from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from fastapi.responses import PlainTextResponse
from dotenv import load_dotenv

load_dotenv(".env.local")

from app.ai import generate_response
from app.whatsapp import send_whatsapp_message

app = FastAPI(title="Masavisos AI")
logger = logging.getLogger(__name__)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/webhook")
async def verify_webhook(request: Request):
    params = request.query_params

    if (
        params.get("hub.mode") == "subscribe"
        and hmac.compare_digest(
            params.get("hub.verify_token", ""),
            os.environ["WHATSAPP_VERIFY_TOKEN"],
        )
    ):
        return PlainTextResponse(
            params.get("hub.challenge", "")
        )

    raise HTTPException(status_code=403)


async def process_message(phone: str, text: str):
    try:
        answer = await asyncio.to_thread(
            generate_response, phone, text
        )
        await send_whatsapp_message(phone, answer)
    except Exception:
        logger.exception("Failed to process WhatsApp message")


@app.post("/webhook")
async def receive_webhook(request: Request):
    body = await request.body()

    signature = request.headers.get(
        "x-hub-signature-256", ""
    )

    expected = "sha256=" + hmac.new(
        os.environ["META_APP_SECRET"].encode(),
        body,
        hashlib.sha256,
    ).hexdigest()

    if not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=403)

    payload = json.loads(body)

    for entry in payload.get("entry", []):
        for change in entry.get("changes", []):
            value = change.get("value", {})

            for message in value.get("messages", []):
                if message.get("type") != "text":
                    continue

                phone = message.get("from")
                text = message.get("text", {}).get("body")

                if phone and text:
                    asyncio.create_task(
                        process_message(phone, text)
                    )

    return {"status": "received"}

class MessageRequest(BaseModel):
    phone: str
    message: str


@app.post("/messages")
async def send_message(request: MessageRequest):
    try:
        answer = await asyncio.to_thread(
            generate_response,
            request.phone,
            request.message,
        )

        return {
            "phone": request.phone,
            "response": answer,
        }

    except Exception:
        logger.exception("Failed to generate AI response")
        raise HTTPException(
            status_code=502,
            detail="AI service unavailable",
        )