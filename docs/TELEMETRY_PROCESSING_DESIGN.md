# NexusFlow – Telemetry Processing Design

## 1. Introduction

Telemetry Processing is one of the core components of NexusFlow. It is responsible for validating, normalizing, and processing incoming IoT sensor data before it is evaluated by the Rule Engine.

The module ensures that telemetry data follows the expected structure and contains valid sensor readings.

The processed data can then be stored in MongoDB and used for rule-based monitoring and alert generation.

## 2. Objectives

The main objectives of the Telemetry Processing module are:

- Receive telemetry data through backend APIs.
- Validate incoming device information.
- Validate sensor readings.
- Support multiple numeric sensor metrics.
- Normalize telemetry data.
- Handle optional timestamps.
- Pass valid telemetry data to the Rule Engine.
- Return generated alerts as part of the processing result.
- Support telemetry storage and history retrieval through backend APIs.

## 3. Telemetry Data Structure

Each telemetry record contains:

| Field | Description | Data Type |
|---|---|---|
| deviceId | Unique device identifier | String |
| sensor metrics | One or more sensor readings | Number |
| timestamp | Date and time of the reading | Date / ISO string |

The current implementation supports flexible numeric sensor metrics rather than requiring only temperature and humidity.

### Example Telemetry Data

```json
{
  "deviceId": "DEVICE_001",
  "temperature": 42,
  "humidity": 28,
  "timestamp": "2026-11-12T10:00:00Z"
}
```

At least one sensor reading is required.

## 4. Telemetry Validation

The Telemetry Validator checks incoming data before normalization.

The following validations are performed:

### A. Object Validation

- Telemetry input must be a valid object.
- Arrays and invalid values are rejected.

### B. Device ID Validation

- `deviceId` must be a string.
- The device ID must not be empty or contain only whitespace.

### C. Sensor Reading Validation

- At least one sensor metric is required.
- Sensor readings must be numeric.
- Sensor values must be finite numbers.
- Invalid values such as `NaN` and `Infinity` are rejected.

### D. Timestamp Validation

- Timestamp is optional.
- If provided, it must represent a valid date and time.
- Invalid timestamps are rejected.

If validation fails, the validator returns a structured result containing validation errors.

## 5. Telemetry Normalization

After successful validation, telemetry data is normalized.

The Telemetry Normalizer performs the following operations:

- Removes unnecessary whitespace from the device ID.
- Preserves valid numeric sensor readings.
- Converts the timestamp into ISO 8601 format.
- Generates the current timestamp if no timestamp is provided.

### Example

Input:

```json
{
  "deviceId": " DEVICE_001 ",
  "temperature": 42,
  "humidity": 28
}
```

Normalized output:

```json
{
  "deviceId": "DEVICE_001",
  "temperature": 42,
  "humidity": 28,
  "timestamp": "2026-11-12T10:00:00.000Z"
}
```

The timestamp above is an illustrative example. The actual implementation generates it at processing time.

## 6. Telemetry Processing Workflow

The current processing workflow is:

1. Receive telemetry data.
2. Check that the rules input is an array.
3. Validate the telemetry object.
4. Validate the device ID.
5. Validate sensor readings.
6. Validate the timestamp if provided.
7. Normalize the telemetry data.
8. Pass normalized data and configured rules to the Rule Engine.
9. Evaluate matching rules.
10. Collect generated alerts.
11. Return the processing result.

### Processing Flow

Incoming Telemetry
↓
Telemetry Validation
↓
Telemetry Normalization
↓
Rule Engine Evaluation
↓
Alert Generation
↓
Processing Result

## 7. Telemetry Processing Modules

The telemetry processing system is divided into three modules.

### A. telemetryValidator.js

Responsible for validating incoming telemetry data.

Main responsibilities:

- Validate telemetry object structure.
- Validate device ID.
- Check sensor metric availability.
- Validate numeric sensor values.
- Validate optional timestamps.
- Return validation results and errors.

### B. telemetryNormalizer.js

Responsible for normalizing valid telemetry data.

Main responsibilities:

- Remove extra whitespace from device IDs.
- Preserve valid sensor readings.
- Convert timestamps into ISO format.
- Generate timestamps when missing.
- Return normalized telemetry data.

### C. telemetryProcessor.js

Responsible for coordinating telemetry processing and Rule Engine integration.

Main responsibilities:

- Validate the rules array.
- Call the Telemetry Normalizer.
- Handle invalid telemetry results.
- Pass normalized telemetry to the Rule Engine.
- Collect generated alerts.
- Return processing status, data, alerts, and alert count.

## 8. Processing Result Structure

The Telemetry Processor returns a structured result.

### Successful Processing

```json
{
  "success": true,
  "data": {
    "deviceId": "DEVICE_001",
    "temperature": 42,
    "humidity": 28,
    "timestamp": "2026-11-12T10:00:00.000Z"
  },
  "alerts": [],
  "alertCount": 0
}
```

### Failed Validation

```json
{
  "success": false,
  "errors": [
    "A valid deviceId is required."
  ],
  "data": null,
  "alerts": []
}
```

These examples illustrate the processing result structure. Actual error messages depend on the validation failure.

## 9. Rule Engine Integration

After normalization, telemetry data is passed to the Rule Engine.

The Rule Engine:

- Identifies rules matching the telemetry device.
- Checks whether each rule is enabled.
- Reads the configured sensor metric.
- Compares the metric value with the configured threshold.
- Generates alert data when a condition is matched.

The Telemetry Processor collects the generated alerts and includes them in its response.

## 10. Database Integration

Telemetry persistence is handled through the backend API and database integration layer.

MongoDB stores telemetry records through the Telemetry model.

The backend provides:

- Telemetry ingestion through `POST /api/telemetry`.
- Telemetry history retrieval through `GET /api/telemetry`.

The core Telemetry Processor handles validation, normalization, and Rule Engine integration; it does not directly perform MongoDB database operations.

## 11. Current Implementation Status

The following capabilities are implemented:

- Telemetry object validation.
- Device ID validation.
- Multiple numeric sensor metric support.
- Finite numeric value validation.
- Optional timestamp validation.
- Device ID normalization.
- ISO timestamp normalization.
- Automatic timestamp generation.
- Rule Engine integration.
- Alert collection.
- Structured processing results.
- Telemetry API integration.
- MongoDB telemetry storage through the backend integration layer.
- Telemetry history retrieval.

### Current Limitations

The following capabilities are not currently implemented in the telemetry processing module:

- MQTT-based telemetry ingestion.
- Socket.IO-based real-time telemetry broadcasting.
- Automatic device-offline detection.
- Advanced telemetry analytics.
- Time-series visualization.
- Automated anomaly detection using machine learning.

## 12. Future Improvements

Possible future enhancements include:

- MQTT-based device communication.
- Real-time telemetry updates.
- Advanced telemetry visualization.
- Time-series analytics.
- Automated anomaly detection.
- Telemetry aggregation.
- Improved device health monitoring.
- Scalable telemetry ingestion.

## 13. Conclusion

The NexusFlow Telemetry Processing module provides a structured pipeline for validating, normalizing, and processing IoT sensor data.

Its integration with the Rule Engine enables automated monitoring and alert generation based on configurable conditions.

The modular architecture provides a foundation for future enhancements such as MQTT communication, real-time updates, and advanced telemetry analytics.