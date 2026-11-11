# NexusFlow: Visual IoT Telemetry & Rule Engine

**Organization:** Infotact Solutions  
**Internship role:** Associate L1 Intern – Web Development  
**Project period:** 10 November 2026 – 10 December 2026  
**Team lead:** Soumi Bera  
**Team members:** Shreya, Chandra

## Project overview
NexusFlow is planned as a web-based platform for monitoring IoT device telemetry, visualizing sensor readings, evaluating configurable rules, and presenting alerts.

> **Important:** This repository contains a proposed implementation plan based on the project title and assignment letter. Confirm the exact functional requirements, approved technology stack, hardware/simulation expectations, and evaluation criteria with the Infotact mentor before treating proposed features as mandatory.

## Proposed MVP
1. Device registry: add, view, and manage devices.
2. Telemetry ingestion: receive and validate sample sensor readings.
3. Dashboard: show device status and recent readings.
4. Visualization: charts for temperature and humidity (if these are in the confirmed scope).
5. Rule engine: evaluate configurable threshold conditions.
6. Alerts: generate and store warning/critical events.
7. History: browse past readings and alerts.

## Proposed technology stack
- Frontend: React, JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time updates: Socket.IO, if required by the confirmed scope
- Charts: Chart.js or an equivalent library
- IoT transport: simulated data initially; MQTT only if required/approved
- Version control: Git and GitHub

## Team ownership
| Member | Role | Primary ownership |
|---|---|---|
| Soumi Bera | Team Leader & Core System Developer | Architecture, telemetry processing design, rule engine, real-time integration, system integration, reviews and coordination |
| Shreya | Frontend Developer | React dashboard, responsive UI, charts, device and alert views, frontend API integration |
| Chandra | Backend & Database Developer | Express APIs, MongoDB models, device APIs, telemetry persistence, validation |

All members contribute to documentation and testing of their own modules. Integration is collaborative; task owners remain responsible for delivering working code for their modules.

## Repository workflow
1. Create a branch from `main` for each task.
2. Use descriptive branch names, e.g. `feature/device-dashboard`, `feature/telemetry-api`, `feature/rule-engine`.
3. Commit small, meaningful changes.
4. Open a Pull Request (PR) to `main`.
5. Add a short summary, test evidence, and screenshots where relevant.
6. At least one teammate reviews the PR; Soumi coordinates final integration.
7. Never commit `.env`, credentials, API keys, database connection strings, or personal data.

## Getting started
The exact commands depend on the final stack and folder setup. Once the team agrees on the app structure, add the frontend and backend setup instructions here.

## Project documents
- [Development roadmap](ROADMAP.md)
- [Team responsibilities and task checklist](TEAM_TASKS.md)
- [Contribution guide](CONTRIBUTING.md)

## Deliverables
- Source code
- Project documentation
- Project report
- Presentation (PPT)
- Model evaluation results, if applicable
- Final project demonstration, if applicable
