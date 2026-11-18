// NexusFlow - Telemetry Processor

const { normalizeTelemetry } = require("./telemetryNormalizer");
const { evaluateRules } = require("../rule-engine/ruleEngine");

/**
 * Processes incoming telemetry and evaluates configured rules.
 *
 * @param {Object} telemetry - Incoming sensor data
 * @param {Array} rules - Configured rules
 * @returns {Object} Processing result
 */

function processTelemetry(telemetry, rules = []) {

    if (!Array.isArray(rules)) {
        throw new Error("Rules must be provided as an array.");
    }

    const normalized = normalizeTelemetry(telemetry);

    if (!normalized.valid) {
        return {
            success: false,
            errors: normalized.errors,
            data: null,
            alerts: []
        };
    }

    const processedData = normalized.data;

    const alerts = evaluateRules(processedData, rules);

    return {
        success: true,
        data: processedData,
        alerts,
        alertCount: alerts.length
    };
}

module.exports = {
    processTelemetry
};