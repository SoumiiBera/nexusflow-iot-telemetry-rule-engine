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

As the Team Leader and Core System Developer, I am responsible for developing the core backend logic, managing the main system components, coordinating team activities, and integrating the different modules of NexusFlow.

My major responsibilities include:

- Core Rule Engine development.
- Rule validation and evaluation.
- Telemetry data validation and processing.
- Alert Manager development.
- Backend API development and integration.
- Database and model management.
- Testing and debugging.
- Code review and team coordination.
- Project documentation and GitHub management.

---

## 3. Core Rule Engine Development

The Rule Engine is responsible for evaluating incoming telemetry data against predefined rules.

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

Telemetry Processing handles incoming device data and prepares it for further system operations.

### Main Responsibilities

- Validating incoming telemetry data.
- Checking required data fields.
- Handling invalid telemetry values.
- Processing and normalizing telemetry data.
- Maintaining consistency in telemetry records.
- Preparing validated data for Rule Engine evaluation.

### Related Files

```text
core/
└── telemetry/
    ├── telemetryValidator.js
    └── tests/
        └── telemetryValidator.test.js
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

## 6. Backend Development

I am responsible for the main backend architecture and core API integration.

### Main Responsibilities

- Setting up and managing the main backend.
- Working with Node.js and Express.js.
- Managing MongoDB database connectivity.
- Designing and managing database models.
- Developing Device APIs.
- Developing Telemetry APIs.
- Developing Rule APIs.
- Developing Alert APIs.
- Managing routes and controllers.
- Implementing error handling.
- Integrating core modules with backend services.

---

## 7. Testing and Debugging

Testing is important to ensure that the core modules work correctly.

### Testing Responsibilities

- Writing and maintaining unit tests.
- Testing rule validation.
- Testing rule evaluation.
- Testing alert generation and status updates.
- Testing telemetry validation.
- Identifying and fixing errors.
- Verifying integration between modules.

### Test Command

```bash
node --test core/rule-engine/tests/*.test.js core/telemetry/tests/*.test.js
```

---

## 8. Team Leadership and Collaboration

As Team Leader, I am responsible for coordinating development activities and maintaining collaboration between team members.

### Responsibilities

- Assigning tasks to team members.
- Monitoring development progress.
- Reviewing submitted code.
- Managing GitHub branches.
- Reviewing Pull Requests.
- Coordinating module integration.
- Maintaining project documentation.
- Helping resolve development issues.

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

I am responsible for maintaining the following project documentation:

- `README.md`
- `docs/SOUMI_WORK.md`
- `docs/TEAM_TASKS.md`
- `ROADMAP.md`
- `CONTRIBUTING.md`

---

## 11. Current Development Focus

My current development focus includes:

1. Improving the Core Rule Engine.
2. Completing and testing Telemetry Processing.
3. Maintaining Alert Manager functionality.
4. Developing and integrating backend APIs.
5. Testing the complete core workflow.
6. Reviewing team contributions.
7. Maintaining project documentation.

---

## 12. Conclusion

As the Team Leader and Core System Developer, my contribution focuses on building and maintaining the core functionality of NexusFlow.

My goal is to ensure that the Rule Engine, Telemetry Processing, Alert Manager, and backend components work together reliably while maintaining proper code quality, testing, documentation, and team coordination.