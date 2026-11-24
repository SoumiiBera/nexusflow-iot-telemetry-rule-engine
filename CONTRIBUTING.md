# Contributing to NexusFlow

## Project Development

NexusFlow is maintained as an individual development project by Soumi Bera.

This document defines the development standards and guidelines followed throughout the project.

## Branch Naming

Use descriptive branch names based on the type of work:

- `feature/<short-name>`
- `fix/<short-name>`
- `docs/<short-name>`
- `test/<short-name>`

Examples:

- `feature/device-dashboard`
- `feature/telemetry-api`
- `feature/rule-engine`
- `fix/telemetry-validation`
- `docs/update-readme`

## Commit Messages

Use clear and concise commit messages.

Recommended prefixes:

- `feat:` New features.
- `fix:` Bug fixes.
- `docs:` Documentation updates.
- `test:` Test-related changes.
- `refactor:` Code improvements.
- `style:` UI and formatting changes.
- `chore:` Maintenance tasks.

Examples:

- `feat: add device status endpoint`
- `fix: validate telemetry payload`
- `docs: update project roadmap`
- `test: add rule engine test cases`
- `style: improve dashboard layout`

## Code Quality Guidelines

- Keep code readable and maintainable.
- Use meaningful variable and function names.
- Follow a consistent project structure.
- Validate incoming API requests.
- Handle errors appropriately.
- Avoid unnecessary code duplication.
- Keep frontend and backend responsibilities separate.

## Testing Guidelines

Before considering a feature complete:

- [ ] Run relevant backend tests.
- [ ] Check frontend lint.
- [ ] Verify frontend production build.
- [ ] Test the related API endpoints.
- [ ] Verify the feature manually.
- [ ] Check for unexpected errors.

## Security Guidelines

- Never commit `.env` files or database credentials.
- Never expose API secrets or sensitive configuration.
- Validate incoming data.
- Avoid storing unnecessary personal information.
- Keep sensitive configuration in environment variables.

## Documentation Guidelines

- Update README.md when project setup or major features change.
- Update API documentation when endpoints change.
- Update ROADMAP.md when development progress changes.
- Keep the development checklist updated.

## Development Standards

The project follows a structured development approach focused on:

- Maintainability
- Reliability
- Data validation
- Scalable architecture
- Secure database connectivity
- Consistent API design
- User-friendly interface