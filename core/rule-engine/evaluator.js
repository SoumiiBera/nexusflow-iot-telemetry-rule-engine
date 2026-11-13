// NexusFlow - Core Rule Engine
// Responsible for evaluating IoT telemetry against configured rules.

const OPERATORS = {
    ">": (value, threshold) => value > threshold,
    "<": (value, threshold) => value < threshold,
    "==": (value, threshold) => value === threshold,
    ">=": (value, threshold) => value >= threshold,
    "<=": (value, threshold) => value <= threshold
};

/**
 * Evaluates a single rule against telemetry data.
 *
 * @param {Object} telemetry - Incoming sensor data
 * @param {Object} rule - Configured rule
 * @returns {Object|null} Alert object or null
 */
function evaluateRule(telemetry, rule) {

    if (!telemetry || !rule) {
        throw new Error("Telemetry and rule are required.");
    }

    if (rule.enabled === false) {
        return null;
    }

    if (!rule.ruleId || !rule.ruleName || !rule.deviceId || !rule.metric) {
        throw new Error("Invalid rule configuration.");
    }

    if (!OPERATORS[rule.operator]) {
        throw new Error("Unsupported comparison operator.");
    }

    if (
        typeof rule.threshold !== "number" ||
        !Number.isFinite(rule.threshold)
    ) {
        throw new Error("Rule threshold must be a valid number.");
    }

    if (
        !["Warning", "Critical"].includes(rule.severity)
    ) {
        throw new Error("Severity must be Warning or Critical.");
    }

    if (telemetry.deviceId !== rule.deviceId) {
        return null;
    }

    const value = telemetry[rule.metric];

    if (typeof value !== "number" || !Number.isFinite(value)) {
        return null;
    }

    const isTriggered = OPERATORS[rule.operator](
        value,
        rule.threshold
    );

    if (!isTriggered) {
        return null;
    }

    return {
        deviceId: telemetry.deviceId,
        ruleId: rule.ruleId,
        ruleName: rule.ruleName,
        metric: rule.metric,
        value: value,
        threshold: rule.threshold,
        severity: rule.severity,
        message: `${rule.metric} exceeded the configured condition.`,
        timestamp: new Date().toISOString()
    };
}

module.exports = {
    evaluateRule,
    OPERATORS
};