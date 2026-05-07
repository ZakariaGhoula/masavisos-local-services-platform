# Architecture Overview

## Goals

- Minimize infrastructure cost during MVP stage
- Prioritize WhatsApp conversion
- Support Madrid-first local SEO
- Keep backend logic isolated from the frontend
- Allow future migration to AWS managed services

## High-Level Architecture

Frontend:
Next.js app for landing pages, service pages, and professional registration.

Backend:
FastAPI service responsible for lead qualification, professional matching, and dispatch events.

Database:
PostgreSQL with normalized entities for professionals, requests, zones, and dispatch logs.

Messaging:
WhatsApp API used as the main communication channel.

## Main Domains

- Client Requests
- Professionals
- Services
- Locations
- Dispatch
- Notifications
- SEO Pages

## Deployment Strategy

MVP:
- Vercel for frontend
- AWS Lightsail for backend
- Supabase or Neon for PostgreSQL
- S3 for static assets

Future:
- ECS/Fargate
- RDS PostgreSQL
- SQS for dispatch queue
- EventBridge for automation