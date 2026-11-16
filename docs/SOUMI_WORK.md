# Soumi Bera – Work Documentation

## 1. Team Member Information

- **Name:** Soumi Bera
- **Role:** Team Leader & Core System Developer
- **Project:** NexusFlow – Visual IoT Telemetry & Rule Engine
- **Branch:** `soumi-core`
- **Organization:** Infotact Solutions
- **Internship Role:** Associate L1 Intern – Web Development

---

## 2. Role and Responsibilities

As the Team Leader and Core System Developer, I am responsible for developing the core system logic, managing backend development, coordinating team activities, and integrating the different modules of NexusFlow.

My major responsibilities include:

- Core Rule Engine development.
- Rule validation and evaluation.
- Telemetry data validation and processing.
- Telemetry normalization.
- Alert Manager development.
- Main backend API development.
- MongoDB database integration and model management.
- Backend and core module integration.
- Testing and debugging.
- Code review and team coordination.
- Project documentation and GitHub management.

---

## 3. Core Rule Engine Development

The Rule Engine evaluates incoming telemetry data against predefined rules and generates alerts when configured conditions are satisfied.

### Main Responsibilities

- Implementing rule evaluation logic.
- Validating rule configurations.
- Supporting comparison operators:
  - `>`
  - `<`
  - `==`
  - `>=`
  - `<=`
- Evaluating rules based on device IDs.
- Handling disabled rules.
- Handling conditions that do not match.
- Ensuring consistent rule evaluation results.

### Related Files

```text
core/
└── rule-engine/
    ├── alertManager.js
    ├── evaluator.js
    ├── ruleEngine.js
    ├── ruleValidator.js
    └── tests/
        ├── alertManager.test.js
        ├── evaluator.test.js
        ├── ruleEngine.test.js
        └── ruleValidator.test.js
```

---

## 4. Telemetry Data Processing

Telemetry Processing validates, normalizes, and processes incoming device data before sending it to the Rule Engine.

### Main Responsibilities

- Validating incoming telemetry data.
- Checking required data fields.
- Handling invalid telemetry values.
- Normalizing telemetry data.
- Maintaining consistency in telemetry records.
- Preparing validated data for Rule Engine evaluation.
- Connecting telemetry processing with rule evaluation.

### Related Files

```text
core/
└── telemetry/
    ├── telemetryValidator.js
    ├── telemetryNormalizer.js
    ├── telemetryProcessor.js
    └── tests/
        ├── telemetryValidator.test.js
        ├── telemetryNormalizer.test.js
        └── telemetryProcessor.test.js
```

---

## 5. Alert Manager Development

The Alert Manager handles alerts generated when device telemetry data matches configured rules.

### Main Responsibilities

- Generating unique alert IDs using UUID.
- Supporting Warning and Critical severity levels.
- Managing alert statuses:
  - Active
  - Acknowledged
  - Resolved
- Updating alert statuses.
- Managing alert information consistently.
- Supporting the alert lifecycle.

### Related File

```text
core/rule-engine/alertManager.js
```

---

## 6. Backend Development and Integration

I am responsible for the main backend development and integration of the core system components.

### Main Responsibilities

- Managing the main backend architecture.
- Working with Node.js and Express.js.
- Managing MongoDB database connectivity.
- Designing and managing database models.
- Developing Device APIs.
- Developing Telemetry APIs.
- Developing Rule APIs.
- Developing Alert APIs.
- Managing routes and controllers.
- Implementing request validation and error handling.
- Integrating the Rule Engine with backend services.
- Connecting telemetry processing with the backend workflow.
- Managing communication between system components.

---

## 7. Testing and Debugging

Testing ensures that the core modules work correctly and produce consistent results.

### Testing Responsibilities

- Writing and maintaining unit tests.
- Testing rule validation.
- Testing rule evaluation.
- Testing alert generation and status updates.
- Testing telemetry validation.
- Testing telemetry normalization.
- Testing telemetry processing.
- Identifying and fixing errors.
- Verifying integration between core modules.

### Combined Test Command

```bash
node --test core/rule-engine/tests/*.test.js core/telemetry/tests/*.test.js
```

### Current Test Results

- Total Tests: 47
- Passed: 47
- Failed: 0

**Status:** All 47 core module tests are passing.

---

## 8. Team Leadership and Collaboration

As Team Leader, I coordinate development activities and maintain collaboration between team members.

### Responsibilities

- Assigning tasks to team members.
- Monitoring development progress.
- Reviewing submitted code.
- Managing GitHub branches.
- Reviewing Pull Requests.
- Coordinating module integration.
- Maintaining project documentation.
- Helping resolve development issues.
- Ensuring responsibilities remain clearly defined.

---

## 9. GitHub Branch Management

My assigned development branch is:

```text
soumi-core
```

### Branch Responsibilities

- Developing core backend modules.
- Committing code changes.
- Pushing updates to GitHub.
- Reviewing team contributions.
- Coordinating Pull Requests.
- Maintaining the stability of the main branch.

---

## 10. Documentation Responsibilities

I am responsible for maintaining and coordinating the following project documentation:

- `README.md`
- `docs/SOUMI_WORK.md`
- `docs/SHREYA_WORK.md`
- `docs/CHANDRA_WORK.md`
- `TEAM_TASKS.md`
- `SYSTEM_INTEGRATION_DESIGN.md`
- `ROADMAP.md`
- `CONTRIBUTING.md`

---

## 11. Current Development Focus

My current development focus includes:

1. Maintaining and improving the Core Rule Engine.
2. Completing and testing Telemetry Processing.
3. Maintaining Alert Manager functionality.
4. Developing the main backend APIs.
5. Integrating MongoDB with backend services.
6. Connecting core modules with the backend workflow.
7. Testing the complete telemetry-to-alert workflow.
8. Reviewing team contributions.
9. Coordinating frontend and backend integration.
10. Maintaining project documentation.

---

## 12. Conclusion

As the Team Leader and Core System Developer, my contribution focuses on developing and maintaining the core functionality of NexusFlow.

My goal is to ensure that the Rule Engine, Telemetry Processing, Alert Manager, and backend components work together reliably while maintaining proper code quality, testing, documentation, and team coordination.