# NexusFlow – Rule Engine Design

## 1. Introduction

The Rule Engine is a core component of NexusFlow. It evaluates incoming IoT telemetry data against predefined monitoring rules and generates alerts when configured conditions are matched.

The Rule Engine helps identify abnormal sensor readings and provides structured alert information for monitoring and management.

The current implementation supports configurable rules, multiple comparison operators, rule validation, and automatic alert generation.

## 2. Objectives

The main objectives of the Rule Engine are:

- Evaluate sensor readings against configured rules.
- Detect abnormal telemetry conditions.
- Support configurable threshold values.
- Validate rule configurations.
- Support Warning and Critical alert severity levels.
- Generate alerts when rule conditions are matched.
- Provide structured alert information for alert management.

## 3. Rule Structure

Each rule contains the following fields:

| Field | Description | Data Type |
|---|---|---|
| ruleId | Unique rule identifier | String |
| ruleName | Name of the monitoring rule | String |
| deviceId | Identifier of the target device | String |
| metric | Telemetry metric to evaluate | String |
| operator | Comparison operator | String |
| threshold | Configured threshold value | Number |
| severity | Alert severity level | String |
| enabled | Determines whether the rule is active | Boolean |

### Example Rule

```json
{
  "ruleId": "RULE_001",
  "ruleName": "High Temperature",
  "deviceId": "DEVICE_001",
  "metric": "temperature",
  "operator": ">",
  "threshold": 40,
  "severity": "Critical",
  "enabled": true
}
```

The current implementation associates each rule with a specific device through `deviceId`.

## 4. Example Rules

| Condition | Severity | Alert |
|---|---|---|
| Temperature > 40°C | Critical | High Temperature |
| Temperature > 35°C | Warning | Temperature Rising |
| Humidity < 30% | Warning | Low Humidity |
| Temperature <= 20°C | Warning | Low Temperature |

These are example configurations. Users can define threshold values and comparison conditions through the rule configuration.

Note: Automatic device-offline detection is not currently part of the implemented Rule Engine.

## 5. Rule Validation

Before evaluation, every rule is checked by the Rule Validator.

The validator checks:

- Rule must be a valid object.
- Required fields must be present.
- `ruleId` must be a non-empty string.
- `ruleName` must be a non-empty string.
- `deviceId` must be a non-empty string.
- `metric` must be a non-empty string.
- Operator must be supported.
- Threshold must be a finite number.
- Severity must be either `Warning` or `Critical`.
- Enabled must be a boolean.

If a rule is invalid, the validation process returns errors and the Rule Engine stops that evaluation with an error.

## 6. Rule Evaluation Workflow

The current Rule Engine follows this workflow:

1. Receive telemetry data and an array of configured rules.
2. Validate the telemetry input.
3. Check that the rules input is an array.
4. Validate each rule configuration.
5. Skip rules where `enabled` is `false`.
6. Match the telemetry device ID with the rule's device ID.
7. Retrieve the telemetry value for the configured metric.
8. Check the value against the configured threshold and operator.
9. Generate an alert if the condition is matched.
10. Pass the generated alert data to the Alert Manager.
11. Return the generated alerts.

If the telemetry value is missing or is not a valid finite number, that rule does not generate an alert.

## 7. Comparison Operators

The current implementation supports five comparison operators.

| Operator | Meaning | Example |
|---|---|---|
| `>` | Greater than | Temperature > 40 |
| `<` | Less than | Humidity < 30 |
| `==` | Equal to | Temperature == 40 |
| `>=` | Greater than or equal to | Temperature >= 40 |
| `<=` | Less than or equal to | Humidity <= 30 |

These operators are implemented in the Rule Engine evaluator.

## 8. Alert Severity

The Rule Engine supports two alert severity levels.

### Warning

Indicates an unusual condition that requires attention but may not represent an immediate critical situation.

Example:
- Temperature exceeds a warning threshold.
- Humidity falls below a configured warning threshold.

### Critical

Indicates a serious condition that requires immediate attention.

Example:
- Temperature exceeds a critical threshold.
- A configured sensor value crosses a critical limit.

The severity level is defined in the rule configuration and included in the generated alert data.

## 9. Alert Data Structure

When a rule condition is matched, the evaluator generates structured alert information.

### Example Alert

```json
{
  "deviceId": "DEVICE_001",
  "ruleId": "RULE_001",
  "ruleName": "High Temperature",
  "metric": "temperature",
  "value": 42,
  "threshold": 40,
  "severity": "Critical",
  "message": "temperature exceeded the configured condition.",
  "timestamp": "2026-11-12T10:00:00.000Z"
}
```

### Alert Fields

| Field | Description |
|---|---|
| deviceId | Device associated with the alert |
| ruleId | Rule that triggered the alert |
| ruleName | Name of the matched rule |
| metric | Telemetry metric evaluated |
| value | Actual telemetry value |
| threshold | Configured threshold |
| severity | Warning or Critical |
| message | Alert description |
| timestamp | Time when the alert was generated |

The timestamp is generated using the current UTC time.

## 10. Rule Engine Modules

The Rule Engine is organized into separate modules.

### A. ruleEngine.js

Responsible for managing the overall rule evaluation process.

Main responsibilities:

- Validate telemetry input.
- Check the rules array.
- Validate individual rules.
- Execute rule evaluation.
- Collect generated alerts.
- Return the alert results.

### B. evaluator.js

Responsible for evaluating individual rules against telemetry data.

Main responsibilities:

- Check whether a rule is enabled.
- Validate required rule information.
- Match device IDs.
- Read the configured telemetry metric.
- Apply the comparison operator.
- Generate alert data when a condition is matched.

### C. ruleValidator.js

Responsible for validating rule configurations.

Main responsibilities:

- Check required fields.
- Validate data types.
- Validate comparison operators.
- Validate threshold values.
- Validate severity levels.
- Validate the enabled field.

### D. alertManager.js

Responsible for handling alert creation within the Rule Engine workflow.

## 11. Current Implementation Status

The following Rule Engine capabilities are implemented:

- Rule configuration validation.
- Required field validation.
- Numeric threshold validation.
- Five comparison operators.
- Warning and Critical severity levels.
- Enabled and disabled rule handling.
- Device-specific rule evaluation.
- Telemetry metric matching.
- Automatic alert data generation.
- Integration with the Alert Manager.
- Automated backend tests for Rule Engine functionality.

### Current Limitations

The following capabilities are not currently implemented:

- Device group-based rule evaluation.
- Automatic device-offline detection.
- Time-based or scheduled rule evaluation.
- Complex multi-condition rules.
- Socket.IO-based real-time alert notifications.
- Advanced rule analytics.

## 12. Future Improvements

Possible future enhancements include:

- Device group-based rules.
- Time-based monitoring conditions.
- Multiple conditions within a single rule.
- Advanced rule configuration options.
- Automatic device-offline detection.
- Real-time alert notifications using Socket.IO.
- Improved alert prioritization.
- Rule execution history and analytics.

## 13. Conclusion

The NexusFlow Rule Engine provides a structured approach to evaluating IoT telemetry data against configurable monitoring conditions.

With rule validation, multiple comparison operators, device-specific evaluation, and automatic alert generation, it forms an important part of the NexusFlow monitoring system.

Its modular architecture allows additional rule types, monitoring conditions, and notification mechanisms to be integrated in future versions.