// NexusFlow - Telemetry Validator

/**
 * Validates incoming IoT telemetry data.
 *
 * @param {Object} telemetry - Incoming sensor data
 * @returns {Object} Validation result
 */

function validateTelemetry(telemetry) {
    const errors = [];

    if (
        !telemetry ||
        typeof telemetry !== "object" ||
        Array.isArray(telemetry)
    ) {
        return {
            valid: false,
            errors: ["Telemetry must be a valid object."]
        };
    }

    // Validate device ID
    if (
        typeof telemetry.deviceId !== "string" ||
        !telemetry.deviceId.trim()
    ) {
        errors.push("A valid deviceId is required.");
    }

    // Validate sensor readings
    const sensorMetrics = Object.keys(telemetry).filter(
        key => key !== "deviceId" && key !== "timestamp"
    );

    if (sensorMetrics.length === 0) {
        errors.push("At least one sensor reading is required.");
    }

    for (const metric of sensorMetrics) {
        if (
            typeof telemetry[metric] !== "number" ||
            !Number.isFinite(telemetry[metric])
        ) {
            errors.push(`${metric} must be a finite number.`);
        }
    }

    // Validate timestamp if provided
    if (telemetry.timestamp !== undefined) {
        const timestamp = new Date(telemetry.timestamp);

        if (Number.isNaN(timestamp.getTime())) {
            errors.push("Invalid telemetry timestamp.");
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

module.exports = {
    validateTelemetry
};