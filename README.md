# MasAvisos — Local Services Dispatch Platform

MasAvisos is a Madrid-first local services platform that connects homeowners with verified professionals through WhatsApp-based job alerts.

The project focuses on fast lead qualification, service-area matching, WhatsApp dispatch, and local SEO acquisition.

## Architecture

- Next.js 15 App Router for the public website and SEO pages
- Python FastAPI backend for lead intake, matching, and dispatch logic
- PostgreSQL for professionals, requests, dispatch logs, and service areas
- WhatsApp API integration for client/professional communication
- AWS-ready deployment using a low-cost infrastructure approach

## Core Features

- Client request capture through WhatsApp
- Professional registration flow
- Service-based and location-based SEO pages
- Dispatch logic for matching professionals by trade and area
- Admin-ready data model
- Structured architecture documentation

## System Context

Client → MasAvisos Website → WhatsApp → FastAPI Backend → Matching Engine → Professionals

## Why this project matters

This project demonstrates:
- product-oriented architecture
- local marketplace design
- SEO-driven acquisition strategy
- async messaging workflows
- cloud-conscious infrastructure
- pragmatic trade-offs for early-stage scaling