# NexusFlow – Frontend

The frontend of NexusFlow is a web-based dashboard for monitoring IoT devices, viewing telemetry records, managing monitoring rules, and handling alerts.

## Technology Stack

- React.js
- Vite
- JavaScript
- CSS
- ESLint

## Application Pages

| Page | Description |
|---|---|
| Dashboard | Displays device and monitoring summaries. |
| Devices | Displays registered IoT devices and device information. |
| Telemetry | Displays telemetry records and sensor readings. |
| Rules | Provides an interface for managing monitoring rules. |
| Alerts | Displays alerts and supports status updates. |

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── App.css
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Prerequisites

- Node.js
- npm
- NexusFlow backend running locally

## Installation

Open a terminal inside the `frontend` directory.

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The Vite development server normally runs at:

```text
http://localhost:5173
```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server. |
| `npm run build` | Creates a production build. |
| `npm run lint` | Runs ESLint checks. |
| `npm run preview` | Previews the production build. |

## Backend Integration

The frontend communicates with the NexusFlow backend through HTTP REST APIs.

The current frontend services use:

```text
http://127.0.0.1:5000
```

Make sure the backend server and MongoDB connection are running before using the application.

## Quality Checks

Latest verification:

- ESLint: Passed with 0 errors and 0 warnings.
- Production build: Successful.

## Current Limitations

- Complete responsive verification is pending.
- End-to-end workflow testing is pending.
- Real-time telemetry streaming is planned for a future release.
- Telemetry charts and advanced analytics are planned improvements.