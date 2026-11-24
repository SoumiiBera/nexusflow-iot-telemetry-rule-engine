# NexusFlow – Real-Time Integration Design

## 1. Introduction

Real-time integration is a planned enhancement for NexusFlow. It aims to allow the dashboard to receive live updates from the backend without requiring users to manually refresh the page.

The current implementation uses REST APIs for communication between the React frontend and Node.js backend.

Socket.IO is planned for future integration to support live telemetry updates, device status changes, and alert notifications.

## 2. Current Communication Architecture

Currently, NexusFlow uses REST APIs for frontend-backend communication.

The frontend sends HTTP requests to retrieve and manage application data.

Current communication includes:

- Device information retrieval and management.
- Telemetry data submission.
- Telemetry history retrieval.
- Rule creation and management.
- Alert retrieval and status updates.
- Dashboard summary retrieval.

### Current Workflow

React Frontend
↓
HTTP REST API Requests
↓
Express.js Backend
↓
MongoDB Database
↓
JSON API Responses
↓
React Dashboard

The dashboard displays data returned by the backend APIs.

## 3. Objectives of Future Real-Time Integration

The planned real-time integration aims to:

- Deliver live telemetry updates.
- Display newly generated alerts automatically.
- Update device status without manual refresh.
- Reduce repeated API polling.
- Improve dashboard responsiveness.
- Support communication with multiple connected clients.

## 4. Proposed Technology

| Component | Technology |
|---|---|
| Frontend | React.js |
| Backend | Node.js and Express.js |
| Real-Time Communication | Socket.IO |
| Database | MongoDB |
| Future Scaling | Redis Adapter |

Socket.IO and Redis integration are planned enhancements and are not part of the current implementation.

## 5. Proposed Communication Workflow

The planned real-time workflow is:

1. An IoT device or external source generates telemetry data.
2. The backend receives and validates the data.
3. Valid telemetry is processed and stored in MongoDB.
4. The Rule Engine evaluates the telemetry.
5. Alerts are generated when configured conditions are matched.
6. The backend emits events through Socket.IO.
7. Connected frontend clients receive the events.
8. The dashboard updates the relevant information.

## 6. Proposed Socket.IO Events

The following event names are proposed for future implementation.

| Event Name | Direction | Purpose |
|---|---|---|
| `telemetryUpdate` | Server to Client | Send updated sensor readings |
| `deviceStatusUpdate` | Server to Client | Update device status |
| `newAlert` | Server to Client | Notify clients about new alerts |
| `subscribeDevice` | Client to Server | Subscribe to device updates |
| `unsubscribeDevice` | Client to Server | Stop receiving device updates |

These event names may be adjusted during implementation.

## 7. Device-Based Rooms

Socket.IO rooms may be introduced to organize connected clients based on device subscriptions.

Example room names:

- `device_DEVICE_001`
- `device_DEVICE_002`

Device-based rooms can help deliver updates only to relevant connected clients.

Before allowing subscriptions, the backend should verify that the client is authorized to access the requested device.

## 8. Connection Management

Future implementation should handle:

- Client connection and disconnection.
- Unexpected network interruptions.
- Automatic reconnection.
- Duplicate event prevention.
- Connection error handling.
- Authentication and authorization.
- Reliable event handling.

## 9. Security Considerations

Security will be important when introducing real-time communication.

Planned security measures include:

- Authenticate Socket.IO connections.
- Validate event payloads.
- Verify device subscriptions.
- Apply authorization before sending device data.
- Avoid exposing sensitive information.
- Configure appropriate CORS policies.
- Prevent unauthorized event access.

## 10. Error Handling

The future integration should handle:

- Server disconnection.
- Client disconnection.
- Failed reconnection attempts.
- Invalid event payloads.
- Unauthorized subscriptions.
- Unexpected communication errors.

## 11. Current Implementation Status

### Implemented

- REST API-based frontend-backend communication.
- Express.js API endpoints.
- JSON request and response handling.
- Telemetry data ingestion.
- Telemetry history retrieval.
- Rule Engine integration.
- Alert generation.
- Alert retrieval and status management.
- Dashboard summary API.

### Not Yet Implemented

- Socket.IO server integration.
- Socket.IO frontend client connection.
- Live telemetry broadcasting.
- Automatic device status broadcasting.
- Real-time alert notifications.
- Device-based Socket.IO rooms.
- Redis Adapter integration.
- Socket connection authentication.

## 12. Future Improvements

Possible future enhancements include:

- Socket.IO-based real-time communication.
- Live telemetry monitoring.
- Automatic alert notifications.
- Device-based event subscriptions.
- Redis Adapter for horizontal scaling.
- Multiple backend server support.
- Improved event delivery reliability.
- Real-time analytics.
- Advanced device monitoring.

## 13. Conclusion

NexusFlow currently uses REST APIs to connect its React frontend with the Node.js and Express.js backend.

The existing architecture supports telemetry processing, rule evaluation, alert generation, and dashboard data retrieval.

Socket.IO-based real-time communication is planned as a future enhancement. Its integration will improve live monitoring capabilities and provide a more responsive dashboard experience.