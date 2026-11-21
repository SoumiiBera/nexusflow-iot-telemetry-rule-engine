// NexusFlow - Rule Engine Manager

const { evaluateRule } = require("./evaluator");
const { validateRule } = require("./ruleValidator");
const { createAlert } = require("./alertManager");

function evaluateRules(telemetry, rules) {
    if (!telemetry || typeof telemetry !== "object") {
        throw new Error("Valid telemetry data is required.");
    }

    if (!Array.isArray(rules)) {
        throw new Error("Rules must be provided as an array.");
    }

    const alerts = [];

    for (const rule of rules) {
        const validation = validateRule(rule);

        if (!validation.valid) {
            throw new Error(
                `Invalid rule configuration: ${validation.errors.join(" ")}`
            );
        }

        const alertData = evaluateRule(telemetry, rule);

        if (alertData) {
            const alert = createAlert(alertData);
            alerts.push(alert);
        }
    }

    return alerts;
}

module.exports = {
    evaluateRules
};