# NexusFlow – Rule Engine Design

## 1. Introduction

The Rule Engine is a core component of NexusFlow. It evaluates incoming IoT telemetry data against predefined conditions and generates alerts when abnormal conditions are detected.

## 2. Objectives

- Evaluate sensor readings against configured rules.
- Detect abnormal device conditions.
- Generate warning and critical alerts.
- Support configurable threshold values.
- Maintain alert history.
- Provide alert information to the dashboard.

## 3. Rule Structure

Each rule may contain:

- ruleId: Unique rule identifier.
- ruleName: Name of the rule.
- deviceId: Target device or applicable device group.
- metric: Sensor metric to evaluate.
- operator: Comparison operator.
- threshold: Configured threshold value.
- severity: Warning or Critical.
- enabled: Whether the rule is active.

## 4. Example Rules

| Condition | Severity | Alert |
|---|---|---|
| Temperature > 40°C | Critical | High Temperature |
| Temperature > 35°C | Warning | Temperature Rising |
| Humidity < 30% | Warning | Low Humidity |
| Device stops reporting | Critical | Device Offline |

These are proposed example rules. Thresholds should be configurable.

## 5. Rule Evaluation Workflow

1. Receive validated telemetry data.
2. Identify the device and sensor metric.
3. Retrieve applicable active rules.
4. Compare the sensor value with the configured condition.
5. Determine whether the condition is triggered.
6. Generate an alert if necessary.
7. Store the alert in MongoDB.
8. Notify the dashboard through Socket.IO, if enabled.

## 6. Comparison Operators

The proposed Rule Engine may support:

- Greater than (>)
- Less than (<)
- Equal to (==)
- Greater than or equal to (>=)
- Less than or equal to (<=)

## 7. Alert Severity

Warning:
Indicates an unusual condition that requires attention.

Critical:
Indicates a serious condition that requires immediate attention.

## 8. Alert Data Structure

Example:

```json
{
  "deviceId": "DEVICE_001",
  "ruleName": "High Temperature",
  "metric": "temperature",
  "value": 42,
  "threshold": 40,
  "severity": "Critical",
  "message": "Temperature exceeded the configured limit.",
  "timestamp": "2026-11-12T10:00:00Z"
}
