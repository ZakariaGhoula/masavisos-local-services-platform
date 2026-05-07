# ADR-001: Use Next.js and FastAPI

## Status

Accepted

## Context

MasAvisos needs strong SEO for local service pages and a backend capable of handling WhatsApp webhooks, matching logic, and automation workflows.

## Decision

Use Next.js 15 for the frontend and Python FastAPI for backend services.

## Consequences

Positive:
- Strong SEO and routing model
- Clear API boundaries
- Python ecosystem for automation and AI
- Good developer velocity

Negative:
- Two runtimes to operate
- Requires clear API contracts