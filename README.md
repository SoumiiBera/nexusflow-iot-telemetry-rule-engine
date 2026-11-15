# 🚀 NexusFlow – Visual IoT Telemetry & Rule Engine

![Project](https://img.shields.io/badge/Project-NexusFlow-blue)
![Domain](https://img.shields.io/badge/Domain-IoT%20%7C%20Telemetry-orange)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

**Project Name:** NexusFlow – Visual IoT Telemetry & Rule Engine  
**Organization:** Infotact Solutions  
**Internship Role:** Associate L1 Intern – Web Development  
**Project Duration:** 10 November 2026 – 10 December 2026  
**Team Leader:** Soumi Bera  
**Team Members:** Soumi Bera, Shreya, Chandra

---

# 📌 1. Project Overview

NexusFlow is a proposed Visual IoT Telemetry and Rule Engine designed to manage IoT devices, process incoming sensor data, evaluate predefined rules and generate alerts based on device conditions.

The system aims to provide a centralized platform where device telemetry can be validated, processed and monitored through a structured backend system and a visual dashboard.

The project focuses on developing a modular and scalable architecture that separates telemetry processing, rule evaluation, alert management, backend services and frontend visualization.

---

# 🎯 2. Problem Statement

IoT devices continuously generate sensor data. Managing this data manually can become difficult when multiple devices are connected to a system.

Some common challenges include:

- Monitoring multiple IoT devices.
- Validating incoming sensor data.
- Identifying abnormal sensor readings.
- Evaluating predefined conditions.
- Generating alerts when conditions are matched.
- Managing and monitoring device activities.
- Organizing telemetry information efficiently.

NexusFlow aims to address these challenges through an organized telemetry processing and rule evaluation system.

---

# 💡 3. Project Objectives

The main objectives of NexusFlow are:

1. Build a structured IoT telemetry management system.
2. Validate incoming device telemetry.
3. Normalize and process sensor data.
4. Evaluate predefined rules automatically.
5. Generate alerts based on rule evaluation results.
6. Maintain device and telemetry information.
7. Provide a basic visual dashboard.
8. Develop a modular backend architecture.
9. Integrate all modules into one working application.

---

# ⚙️ 4. Proposed Key Features

### 4.1 Device Management
- Register IoT devices.
- Maintain device identification.
- Monitor device information.
- Display device statistics.

### 4.2 Telemetry Management
- Receive telemetry data.
- Validate device IDs.
- Validate numeric sensor readings.
- Validate timestamps.
- Detect missing or invalid readings.
- Normalize telemetry data.
- Process validated telemetry.

### 4.3 Rule Engine
- Create and validate rules.
- Evaluate sensor readings.
- Support comparison operators.
- Perform device ID-based rule evaluation.
- Handle disabled rules.
- Handle non-matching conditions.

### 4.4 Alert Management
- Generate alerts based on rule evaluation.
- Generate unique alert IDs.
- Support Warning and Critical severity.
- Manage alert statuses.
- Update alert status when required.

### 4.5 Dashboard
The proposed dashboard will display:

- Total Devices
- Active Devices
- Total Alerts

The initial frontend implementation will focus on a basic dashboard layout.

---

# 🛠️ 5. Technology Stack

The following technologies are selected or proposed for the project.

| Category | Technology |
|---|---|
| Frontend | React.js |
| Frontend Build Tool | Vite |
| Programming Language | JavaScript |
| Backend Runtime | Node.js |
| Backend Framework | Express.js |
| Database | MongoDB |
| Database ODM | Mongoose |
| Testing | Node.js Test Runner |
| Version Control | Git |
| Code Hosting | GitHub |
| API Testing | Postman / Browser |
| Development Environment | Visual Studio Code |

*Note: Technologies and integrations will be implemented according to the project development requirements.*

---

# 🏗️ 6. System Architecture

NexusFlow follows a modular architecture.

### Proposed Data Flow

             IoT Devices
                  |
                  |
                  v
          Incoming Telemetry
                  |
                  v
          Telemetry Validator
                  |
                  v
         Telemetry Normalizer
                  |
                  v
         Telemetry Processor
                  |
                  v
             Rule Engine
                  |
          +-------+-------+
          |               |
          v               v
     Rule Matched    Rule Not Matched
          |
          v
      Alert Manager
          |
          v
      Alert Storage
          |
          v
       Dashboard


### Main System Components

| Component | Responsibility |
|---|---|
| Telemetry Validator | Validates incoming sensor data |
| Telemetry Normalizer | Standardizes telemetry data |
| Telemetry Processor | Processes validated telemetry |
| Rule Engine | Evaluates predefined conditions |
| Alert Manager | Creates and manages alerts |
| Backend API | Handles application requests |
| Database | Stores devices, rules, telemetry and alerts |
| Frontend | Displays dashboard information |

---

# 👥 7. Team Members & Responsibilities

The project responsibilities have been divided into three separate development areas to avoid overlapping tasks.

## 7.1 Soumi Bera

**Role:** Team Leader & Core System Developer  
**Branch:** soumi-core

### Assigned Responsibilities

**A. Core Rule Engine**
- Develop Rule Evaluation Logic.
- Implement Rule Validation.
- Handle comparison operators:
  - >
  - <
  - ==
  - >=
  - <=
- Implement device ID-based rule evaluation.
- Handle disabled rules.
- Handle non-matching conditions.

**B. Alert Manager**
- Implement alert creation.
- Generate unique UUID-based alert IDs.
- Support Warning and Critical severity.
- Manage alert statuses:
  - Active
  - Acknowledged
  - Resolved
- Implement alert status updates.

**C. Telemetry Validation**
- Validate telemetry objects.
- Validate device IDs.
- Validate numeric sensor readings.
- Validate timestamps.
- Detect missing or invalid readings.
- Handle validation errors.

**D. Telemetry Processing**
- Develop telemetry normalization.
- Process incoming telemetry data.
- Connect telemetry processing with the Rule Engine.
- Ensure validated telemetry can be evaluated.

**E. Main Backend Development**
- Manage MongoDB integration.
- Develop database models.
- Develop Device APIs.
- Develop Telemetry APIs.
- Develop Rule APIs.
- Develop Alert APIs.
- Manage routes and controllers.
- Implement error handling.

**F. Integration and Testing**
- Integrate Rule Engine and Telemetry Processing.
- Integrate Alert Manager.
- Perform API testing.
- Perform system testing.
- Perform end-to-end testing.
- Review team members' code.
- Manage Pull Requests and final integration.

**G. Team Management**
- Coordinate team members.
- Monitor development progress.
- Maintain the main README.
- Manage project documentation.
- Review and merge approved Pull Requests.

---

## 7.2 Shreya

**Role:** Frontend Developer  
**Branch:** shreya-frontend

### Assigned Responsibilities

1. Set up the React + Vite project.
2. Create the basic frontend folder structure.
3. Develop the Navbar component.
4. Develop the Sidebar component.
5. Create the basic Dashboard page.
6. Create three Dashboard Cards:
   - Total Devices
   - Active Devices
   - Total Alerts
7. Complete basic UI layout and CSS styling.

**Scope Limitation:**

The following tasks are not included in the current assignment:

- API Integration.
- Charts and Graphs.
- Advanced Dashboard Functionality.
- Complex Frontend Features.
- Backend Development.

---

## 7.3 Chandra

**Role:** Backend Developer  
**Branch:** chandra-backend

### Assigned Responsibilities

1. Create the backend folder.
2. Initialize the Node.js project.
3. Create server.js.
4. Create package.json.
5. Install Express.js.
6. Configure a basic Express server on port 5000.
7. Create a basic GET route.
8. Display the following welcome message:

Welcome to NexusFlow Backend!


9. Test the backend server through the browser.

10. Add the following start script to package.json:

"scripts": {
  "start": "node server.js"
}


11. Ensure the backend server can be started using the npm start command.

**Expected URL:**

http://localhost:5000


**Scope Limitation:**

The following tasks are not included in the current assignment:

- MongoDB Integration.
- Database Models.
- Device APIs.
- Telemetry APIs.
- Rule Engine Development.
- Alert Manager Development.
- Complex Backend Development.
  
---
  
# 📁 8. Project Folder Structure

The following is the planned overall project structure.

nexusflow-iot-telemetry-rule-engine/
│
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
│       └── task.md
│
├── core/
│   │
│   ├── rule-engine/
│   │   ├── evaluator.js
│   │   ├── ruleEngine.js
│   │   ├── alertManager.js
│   │   ├── ruleValidator.js
│   │   │
│   │   └── tests/
│   │       ├── evaluator.test.js
│   │       ├── ruleEngine.test.js
│   │       ├── alertManager.test.js
│   │       └── ruleValidator.test.js
│   │
│   ├── telemetry/
│   │   ├── telemetryValidator.js
│   │   ├── telemetryNormalizer.js
│   │   ├── telemetryProcessor.js
│   │   │
│   │   └── tests/
│   │       ├── telemetryValidator.test.js
│   │       ├── telemetryNormalizer.test.js
│   │       └── telemetryProcessor.test.js
│   │
│   └── integration/
│       ├── ruleTelemetryIntegration.js
│       ├── alertIntegration.js
│       └── tests/
│           └── integration.test.js
│
├── backend/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── environment.js
│   │
│   ├── models/
│   │   ├── Device.js
│   │   ├── Telemetry.js
│   │   ├── Rule.js
│   │   └── Alert.js
│   │
│   ├── controllers/
│   │   ├── deviceController.js
│   │   ├── telemetryController.js
│   │   ├── ruleController.js
│   │   └── alertController.js
│   │
│   ├── routes/
│   │   ├── deviceRoutes.js
│   │   ├── telemetryRoutes.js
│   │   ├── ruleRoutes.js
│   │   └── alertRoutes.js
│   │
│   ├── services/
│   │   ├── deviceService.js
│   │   ├── telemetryService.js
│   │   ├── ruleService.js
│   │   └── alertService.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   │
│   ├── utils/
│   │   ├── responseHandler.js
│   │   └── logger.js
│   │
│   ├── tests/
│   │   ├── device.test.js
│   │   ├── telemetry.test.js
│   │   ├── rule.test.js
│   │   └── alert.test.js
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── DashboardCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── SOUMI_WORK.md
│   ├── SHREYA_WORK.md
│   ├── CHANDRA_WORK.md
│   ├── RULE_ENGINE_DESIGN.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── TELEMETRY_PROCESSING_DESIGN.md
│   └── REAL_TIME_INTEGRATION_DESIGN.md
│
├── scripts/
│   └── test.js
│
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── CONTRIBUTING.md
├── ROADMAP.md
└── TEAM_TASKS.md


**Important:** This is the planned overall structure, not a claim that every listed file already exists. Existing modules should be maintained, and new files should be created only when their implementation begins.

---

# 🧪 9. Testing

Testing is an important part of the NexusFlow development process.

### Current Core Testing

The existing Core Rule Engine and Telemetry Validator have automated tests.

**Latest Recorded Test Result:**

| Test Information | Result |
|---|---:|
| Total Tests | 37 |
| Passed | 37 |
| Failed | 0 |

### Test Command

Run the following command from the project root:

node --test core/rule-engine/tests/*.test.js core/telemetry/tests/*.test.js


### Testing Areas

- Rule Evaluation Testing.
- Rule Validation Testing.
- Alert Manager Testing.
- Telemetry Validation Testing.
- Integration Testing.
- Backend API Testing.
- End-to-End Testing.

*Note: The 37/37 result represents the latest recorded test run. Run the command again to verify the current code.*

---

# 🔀 10. GitHub Branch Management

The project uses Git and GitHub for version control and team collaboration.

### Development Branches

| Branch | Responsible Member | Purpose |
|---|---|---|
| main | Soumi Bera | Stable integrated code |
| soumi-core | Soumi Bera | Core System Development |
| shreya-frontend | Shreya | Frontend Development |
| chandra-backend | Chandra | Basic Backend Setup |

### GitHub Workflow

           soumi-core       shreya-frontend       chandra-backend
     |                   |                    |
     v                   v                    v
 Development         Development          Development
     |                   |                    |
     v                   v                    v
 Testing             Testing              Testing
     |                   |                    |
     v                   v                    v
 Pull Request        Pull Request         Pull Request
     |                   |                    |
     +-------------------+--------------------+
                         |
                         v
                Team Leader Review
                         |
                         v
                    main Branch


### Collaboration Rules

1. Every member must work on their assigned branch.
2. Do not directly push changes to main.
3. Commit meaningful and understandable changes.
4. Push completed work regularly.
5. Create a Pull Request after completing assigned tasks.
6. The Team Leader will review Pull Requests.
7. Approved changes will be merged into main.
8. Keep the main branch stable.

---

# 📚 11. Documentation Responsibilities

Each team member is responsible for maintaining their individual work documentation.

| File | Responsible Member |
|---|---|
| README.md | Soumi Bera |
| docs/SOUMI_WORK.md | Soumi Bera |
| docs/SHREYA_WORK.md | Shreya |
| docs/CHANDRA_WORK.md | Chandra |
| CONTRIBUTING.md | Soumi Bera |
| ROADMAP.md | Soumi Bera |
| TEAM_TASKS.md | Soumi Bera |

### Documentation Guidelines

- Document only the work actually completed.
- Mention the files and modules created.
- Include test results when available.
- Update development progress regularly.
- Do not mark unfinished work as completed.

---

# 🚀 12. Getting Started

### Prerequisites

Install the following tools before starting development:

- Node.js
- npm
- Git
- Visual Studio Code
- MongoDB (required when database integration begins)

### Clone the Repository

git clone https://github.com/SoumiiBera/nexusflow-iot-telemetry-rule-engine.git


Move into the project directory:

cd nexusflow-iot-telemetry-rule-engine


### Switch to Your Assigned Branch

First, fetch all remote branches:

git fetch origin


**Note:** The git switch --track origin/<branch-name> command is used when creating a local tracking branch for the first time. If the local branch already exists, use git switch <branch-name> instead.

For Soumi:

git switch --track origin/soumi-core


For Shreya:

git switch --track origin/shreya-frontend


For Chandra:

git switch --track origin/chandra-backend


Each team member should switch to their assigned branch before starting development.

### Run Core Tests

From the project root:

node --test core/rule-engine/tests/*.test.js core/telemetry/tests/*.test.js


### Run Frontend

After the frontend project has been initialized:

cd frontend
npm install
npm run dev

**Note:** Keep the frontend running in one terminal. Open a separate terminal from the project root to run the backend.

### Run Backend

After the backend project has been initialized:

cd backend
npm install
npm start


Before running the backend, make sure backend/package.json contains the following start script:

"scripts": {
  "start": "node server.js"
}


If the start script is not available, add it to the existing package.json file.

The backend server will run at:

http://localhost:5000


**Note:** The backend must be configured to use port 5000.

**Integration Note:** Chandra's initial backend setup uses port 5000. The main integrated backend will be maintained by Soumi after reviewing and incorporating the basic server setup.

---

# 🗺️ 13. Development Roadmap

| Phase | Development Task | Responsible Member |
|---|---|---|
| Phase 1 | Core Rule Engine | Soumi |
| Phase 2 | Rule Validation | Soumi |
| Phase 3 | Alert Manager | Soumi |
| Phase 4 | Telemetry Validation | Soumi |
| Phase 5 | Basic Frontend Setup | Shreya |
| Phase 6 | Basic Backend Setup | Chandra |
| Phase 7 | Telemetry Normalization | Soumi |
| Phase 8 | Telemetry Processing | Soumi |
| Phase 9 | MongoDB Integration | Soumi |
| Phase 10 | Database Models | Soumi |
| Phase 11 | Backend API Development | Soumi |
| Phase 12 | System Integration | Soumi |
| Phase 13 | Final Testing | Team |
| Phase 14 | Documentation and Final Review | Soumi |

*The roadmap represents the planned development sequence. Actual progress will be updated as tasks are completed and reviewed.*

---

# 🔗 14. Planned System Integration

After individual development is completed, the modules will be integrated.

### Integration Responsibilities

**Frontend – Shreya**
- Provide the basic dashboard interface.
- Display the three assigned summary cards.

**Basic Backend – Chandra**
- Provide the initial Express server setup.
- Verify the server response.

**Core System & Main Backend – Soumi**
- Integrate telemetry processing.
- Connect the Rule Engine.
- Integrate Alert Manager.
- Develop database connectivity and APIs.
- Coordinate integration with the frontend.

The basic backend setup created by Chandra will be reviewed and incorporated into the main backend structure as appropriate, avoiding duplicate server implementations.

---

# 📦 15. Project Deliverables

The expected project deliverables include:

1. Core Rule Engine.
2. Rule Validation Module.
3. Alert Management Module.
4. Telemetry Validation Module.
5. Telemetry Processing Module.
6. Basic React Dashboard.
7. Basic Express Backend Server.
8. Database Integration.
9. Backend API Modules.
10. Integrated IoT Telemetry System.
11. Automated Test Cases.
12. Technical Documentation.
13. Final GitHub Repository.

---

# 📊 16. Current Project Status

NexusFlow is under active development.

| Module | Responsible Member | Status |
|---|---|---|
| Core Rule Engine | Soumi | Implemented |
| Rule Validation | Soumi | Implemented |
| Alert Manager | Soumi | Implemented |
| Telemetry Validator | Soumi | Implemented |
| Core Automated Tests | Soumi | 37/37 in latest recorded run |
| Telemetry Normalization | Soumi | Planned |
| Telemetry Processing | Soumi | Planned |
| Basic Frontend | Shreya | Assigned – Pending Verification |
| Basic Backend | Chandra | Assigned – Pending Verification |
| MongoDB Integration | Soumi | Planned |
| Database Models | Soumi | Planned |
| Backend APIs | Soumi | Planned |
| System Integration | Team | Planned |
| End-to-End Testing | Team | Planned |
| Final Documentation | Soumi | Ongoing |

---

# 🔮 17. Future Improvements

Possible future improvements include:

- Real-time IoT telemetry monitoring.
- Advanced device management.
- Interactive data visualization.
- Historical telemetry analysis.
- Advanced alert filtering.
- More flexible rule configuration.
- Improved dashboard functionality.
- Scalable device communication.
- Enhanced system monitoring.

These features may be considered after the current project scope is completed.

---

# 🤝 18. Contribution Guidelines

Team members should follow the assigned development responsibilities.

### Contribution Process

1. Switch to your assigned branch.
2. Complete your assigned task.
3. Test your changes.
4. Update your individual documentation.
5. Commit your changes.
6. Push your branch to GitHub.
7. Create a Pull Request.
8. Wait for Team Leader review.
9. Merge approved changes into main.

### Example Commit Messages

git add .
git commit -m "Implemented assigned frontend components"
git push origin shreya-frontend


For Chandra:

git add .
git commit -m "Added basic Express backend server"
git push origin chandra-backend


For Soumi:

git add .
git commit -m "Updated core telemetry processing"
git push origin soumi-core


---

# 👩‍💻 19. Team

| Name | Role |
|---|---|
| Soumi Bera | Team Leader & Core System Developer |
| Shreya | Frontend Developer |
| Chandra | Backend Developer |

---

# 📄 20. Project Information

**Project:** NexusFlow – Visual IoT Telemetry & Rule Engine  
**Organization:** Infotact Solutions  
**Internship:** Associate L1 Intern – Web Development  
**Project Period:** 10 November 2026 – 10 December 2026  
**Team Leader:** Soumi Bera

---

# ⭐ 21. Conclusion

NexusFlow aims to provide a structured approach to IoT telemetry management through data validation, rule evaluation, alert generation and visual monitoring.

By dividing responsibilities among team members and following a modular development approach, the project aims to achieve a maintainable and integrated IoT telemetry system.

The team will continue improving the system through development, testing, collaboration and documentation.

**Developed as part of the Infotact Solutions Internship Project.**

---
