# NexusFlow – Frontend

NexusFlow is a Visual IoT Telemetry & Rule Engine project designed to monitor IoT devices, visualize telemetry data, manage rules, and track automatically generated alerts.

This folder contains the frontend application built using React.js and Vite.

## Tech Stack

- React.js
- Vite
- JavaScript
- CSS
- Fetch API

## Features

- **Dashboard:** Displays total devices, active devices, and total alerts.
- **Device Management:** View registered devices and register new devices.
- **Telemetry Monitoring:** View incoming IoT telemetry data.
- **Rule Management:** Create and manage telemetry monitoring rules.
- **Alert Management:** View generated alerts, acknowledge them, and resolve them.

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Prerequisites

- Node.js
- npm
- NexusFlow backend running on port 5000

## Installation

From the project root:

```bash
cd frontend
npm install
```

## Run Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:5173/
```

## Build for Production

```bash
npm run build
```

## Backend Connection

The frontend communicates with the NexusFlow backend through REST APIs.

Default backend URL:

```text
http://127.0.0.1:5000
```

The backend must be running for dashboard data, device management, telemetry, rules, and alerts to work.

## Project

**NexusFlow – Visual IoT Telemetry & Rule Engine**

Frontend developed as part of the Infotact Solutions project.