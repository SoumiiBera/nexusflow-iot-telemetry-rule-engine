# NexusFlow – IoT Telemetry & Rule Engine

![React](https://img.shields.io/badge/Frontend-React%2019-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/API-Express.js-lightgrey)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green)
![Tests](https://img.shields.io/badge/Backend%20Tests-88%20Passing-brightgreen)

**NexusFlow** is a full-stack IoT telemetry monitoring and rule-based alert management application. It allows users to register devices, process sensor telemetry, configure monitoring rules, automatically generate alerts, and monitor system statistics through a centralized dashboard.

This project was independently implemented and integrated by **Soumi Bera**.

---

## Overview

NexusFlow provides a centralized system for managing IoT devices and monitoring their telemetry data.

The backend processes incoming telemetry, validates sensor readings, evaluates configured rules, and generates alerts when specified conditions are met.

The React frontend provides an interface for managing devices, reviewing telemetry history, configuring rules, and monitoring alerts.

## Features

### Dashboard
- Total registered device count.
- Active device count.
- Total generated alerts.
- Centralized monitoring overview.

### Device Management
- Register new IoT devices.
- View registered devices.
- Retrieve individual device information.
- Update device information through the backend API.
- Delete devices through the backend API.
- Filter devices by status and device type.
- Track device last-seen timestamps.

### Telemetry Management
- Receive telemetry through REST API.
- Validate and normalize incoming telemetry.
- Store telemetry records in MongoDB.
- Retrieve telemetry history.
- Filter telemetry history by device ID.
- Support temperature, humidity, and flexible readings data.

### Rule Engine
- Create configurable monitoring rules.
- Validate rule configurations.
- Support comparison operators: `>`, `<`, `==`, `>=`, `<=`.
- Enable or disable rules.
- Update and delete rules through the backend API.
- Evaluate incoming telemetry against enabled rules.

### Alert Management
- Automatically generate alerts when rule conditions are satisfied.
- Support Warning and Critical severity levels.
- Retrieve and filter alerts.
- Acknowledge alerts.
- Resolve alerts.

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| API Communication | REST API |
| Testing | Node.js Test Runner, Supertest |
| Development Tools | Git, GitHub, npm |

## System Architecture

```text
             React Frontend
                   |
                   | REST API Requests
                   |
             Express Server
                   |
       -------------------------
       |           |           |
    Devices      Rules     Telemetry
       |           |           |
       |      Rule Engine      |
       |           |           |
       |      Alert Manager    |
       |           |           |
       -------------------------
                   |
              MongoDB Atlas
                   |
             Dashboard Data
```

## Backend Architecture

```text
backend/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── alertController.js
│   ├── dashboardController.js
│   ├── deviceController.js
│   ├── ruleController.js
│   └── telemetryController.js
│
├── core/
│   ├── rule-engine/
│   │   ├── alertManager.js
│   │   ├── evaluator.js
│   │   ├── ruleEngine.js
│   │   └── ruleValidator.js
│   │
│   └── telemetry/
│       ├── telemetryNormalizer.js
│       ├── telemetryProcessor.js
│       └── telemetryValidator.js
│
├── models/
│   ├── Alert.js
│   ├── Device.js
│   ├── Rule.js
│   └── Telemetry.js
│
├── routes/
│   ├── alertRoutes.js
│   ├── dashboardRoutes.js
│   ├── deviceRoutes.js
│   ├── ruleRoutes.js
│   └── telemetryRoutes.js
│
├── tests/
├── server.js
└── package.json
```

## API Reference

Base URL:

```text
http://localhost:5000
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend health |
| POST | `/api/devices` | Register a device |
| GET | `/api/devices` | Retrieve devices |
| GET | `/api/devices/:deviceId` | Retrieve one device |
| PUT | `/api/devices/:deviceId` | Update a device |
| DELETE | `/api/devices/:deviceId` | Delete a device |
| POST | `/api/telemetry` | Submit telemetry |
| GET | `/api/telemetry` | Retrieve telemetry history |
| POST | `/api/rules` | Create a rule |
| GET | `/api/rules` | Retrieve rules |
| GET | `/api/rules/:ruleId` | Retrieve one rule |
| PUT | `/api/rules/:ruleId` | Update a rule |
| DELETE | `/api/rules/:ruleId` | Delete a rule |
| GET | `/api/alerts` | Retrieve alerts |
| PATCH | `/api/alerts/:alertId/status` | Update alert status |
| GET | `/api/dashboard/summary` | Retrieve dashboard statistics |

### Example Telemetry Request

```json
{
  "deviceId": "DEVICE-001",
  "temperature": 42,
  "humidity": 65,
  "timestamp": "2026-11-24T10:30:00.000Z"
}
```

The telemetry endpoint processes the submitted reading against enabled rules associated with the device. Matching conditions can generate and store alerts automatically.

## Installation and Setup

### Prerequisites

- Node.js
- npm
- MongoDB Atlas account or MongoDB connection URI
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/SoumiiBera/nexusflow-iot-telemetry-rule-engine.git
cd nexusflow-iot-telemetry-rule-engine
```

Replace `https://github.com/SoumiiBera/nexusflow-iot-telemetry-rule-engine.git` with the actual repository URL.

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs on the Vite development server, normally:

```text
http://localhost:5173
```

**Note:** The current frontend API services use `http://127.0.0.1:5000` as their backend base URL. The backend CORS configuration allows `http://localhost:5173`.

## Testing

Run backend tests:

```bash
cd backend
npm test
```

### Verified Backend Test Results

| Metric | Result |
|---|---:|
| Total Tests | 88 |
| Passed | 88 |
| Failed | 0 |

### Frontend Code Quality

Run ESLint:

```bash
cd frontend
npm run lint
```

### Production Build

```bash
cd frontend
npm run build
```

The frontend lint check and production build have both completed successfully.

## Current Implementation Notes

- Telemetry is submitted through REST API requests.
- The telemetry page retrieves stored history; continuous live streaming is not currently implemented.
- Device update and delete operations are available in the backend API.
- Rule update operations are available in the backend API.
- The frontend currently provides a more limited set of management actions than the backend API.
- Authentication, role-based access control, and production deployment are not currently implemented.

## Future Improvements

- MQTT-based IoT device communication.
- Real-time telemetry streaming.
- Interactive telemetry charts and analytics.
- Advanced alert notifications.
- AI-based anomaly detection.
- Role-based authentication and authorization.
- Cloud deployment and production monitoring.
- Improved responsive layouts across all application pages.

## Developer

**Soumi Bera**

BCA Student | Full-Stack Developer

- GitHub: [SoumiiBera](https://github.com/SoumiiBera)

---

*NexusFlow – Connecting IoT Devices, Telemetry, Rules, and Alerts.*
