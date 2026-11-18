// NexusFlow - Alert Manager
// Manages generated IoT alerts.

const { randomUUID } = require("node:crypto");

const VALID_SEVERITIES = ["Warning", "Critical"];

const VALID_STATUSES = ["Active", "Acknowledged", "Resolved"];

/**
 * Creates a standardized alert.
 */
function createAlert(alertData) {
    if (!alertData || typeof alertData !== "object") {
        throw new Error("Valid alert data is required.");
    }

    const requiredFields = [
        "deviceId",
        "ruleId",
        "ruleName",
        "metric",
        "value",
        "threshold",
        "severity",
        "message"
    ];

    for (const field of requiredFields) {
        if (alertData[field] === undefined || alertData[field] === null) {
            throw new Error(`Missing required field: ${field}`);
        }
    }

    if (!VALID_SEVERITIES.includes(alertData.severity)) {
        throw new Error("Invalid alert severity.");
    }

    if (
        typeof alertData.value !== "number" ||
        typeof alertData.threshold !== "number"
    ) {
        throw new Error("Alert values must be numbers.");
    }

    return {
        alertId: randomUUID(),
        deviceId: alertData.deviceId,
        ruleId: alertData.ruleId,
        ruleName: alertData.ruleName,
        metric: alertData.metric,
        value: alertData.value,
        threshold: alertData.threshold,
        severity: alertData.severity,
        message: alertData.message,
        status: "Active",
        timestamp: new Date().toISOString()
    };
}

/**
 * Updates an alert's status.
 */
function updateAlertStatus(alert, newStatus) {
    if (!alert || typeof alert !== "object") {
        throw new Error("Valid alert is required.");
    }

    if (!VALID_STATUSES.includes(newStatus)) {
        throw new Error("Invalid alert status.");
    }

    return {
        ...alert,
        status: newStatus,
        updatedAt: new Date().toISOString()
    };
}

module.exports = {
    createAlert,
    updateAlertStatus,
    VALID_SEVERITIES,
    VALID_STATUSES
};