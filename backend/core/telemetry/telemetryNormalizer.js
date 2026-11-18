// NexusFlow - Telemetry Normalizer

const { validateTelemetry } = require("./telemetryValidator");

/**
 * Normalizes valid IoT telemetry data.
 *
 * @param {Object} telemetry - Incoming sensor data
 * @returns {Object} Normalization result
 */

function normalizeTelemetry(telemetry) {
    const validation = validateTelemetry(telemetry);

    if (!validation.valid) {
        return {
            valid: false,
            errors: validation.errors
        };
    }

    const normalizedTelemetry = {};

    normalizedTelemetry.deviceId = telemetry.deviceId.trim();

    const sensorMetrics = Object.keys(telemetry).filter(
        key => key !== "deviceId" && key !== "timestamp"
    );

    for (const metric of sensorMetrics) {
        normalizedTelemetry[metric] = telemetry[metric];
    }

    normalizedTelemetry.timestamp =
        telemetry.timestamp !== undefined
            ? new Date(telemetry.timestamp).toISOString()
            : new Date().toISOString();

    return {
        valid: true,
        data: normalizedTelemetry
    };
}

module.exports = {
    normalizeTelemetry
};