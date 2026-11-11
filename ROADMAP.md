# NexusFlow – 30-Day Development Roadmap

**Project start:** 10 November 2026  
**Target completion:** 10 December 2026  
**Team:** Soumi (Team Lead), Shreya, Chandra

This is a proposed schedule. Adjust it after mentor confirmation of the exact requirements.

| Dates | Focus | Planned outcomes | Owner(s) |
|---|---|---|---|
| 10–12 Nov | Requirement clarification & planning | Confirm requirements, scope, stack, user flows, acceptance criteria | Soumi leads; all contribute |
| 13–17 Nov | Project foundation | GitHub repo, app structure, environment setup, initial UI, database connection and API skeleton | Soumi coordinates; Shreya frontend; Chandra backend |
| 18–22 Nov | Core device & telemetry modules | Device registry UI/API; telemetry schema, validation and sample data flow | Shreya: UI; Chandra: APIs/storage; Soumi: processing design |
| 23–27 Nov | Rule engine & alerts | Configurable rule model, threshold evaluation, alert creation and alert UI | Soumi: rule engine; Chandra: persistence/API support; Shreya: alert UI |
| 28 Nov–2 Dec | Visualization & integration | Dashboard charts, device status, end-to-end data flow, real-time updates if required | Shreya: visualization; Chandra: API support; Soumi: integration |
| 3–6 Dec | Testing & stabilization | Unit/API tests, integration tests, validation, bug fixes, security review | All; Soumi coordinates |
| 7–8 Dec | Documentation | README, setup guide, architecture notes, project report draft | All contribute; Soumi coordinates |
| 9 Dec | Demo preparation | PPT, screenshots, demo script, final rehearsal | All |
| 10 Dec | Final submission | Verify deliverables and submit project | Soumi coordinates; all confirm |

## Weekly checkpoints
- **Week 1:** Scope, architecture, repository, and working skeleton approved.
- **Week 2:** Device and telemetry flow works end to end with test/simulated data.
- **Week 3:** Rule evaluation and alert generation work for agreed test cases.
- **Week 4:** Dashboard integration, testing, documentation, and demo are complete.

## Definition of Done
A task is complete only when:
- The agreed acceptance criteria are met.
- Code is committed to a task branch and merged through a reviewed PR.
- Basic tests or manual verification steps are recorded.
- No secrets or credentials are committed.
- Related documentation is updated.

## Risks to track
- Unclear mentor requirements or late scope changes.
- Physical hardware/MQTT dependency not confirmed early.
- Integration delays between frontend and backend.
- Unvalidated sensor data or unclear threshold units.
- Insufficient time reserved for testing and documentation.
