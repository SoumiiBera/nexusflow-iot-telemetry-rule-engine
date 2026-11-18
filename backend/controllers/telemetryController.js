// NexusFlow - Telemetry Controller

const { processTelemetry } = require("../core/telemetry/telemetryProcessor");

/**
 * Handles incoming telemetry data from IoT devices.
 */
const ingestTelemetry = (req, res) => {
    try {
        const { telemetry, rules } = req.body;

        // Support direct telemetry payload
        const incomingTelemetry = telemetry || req.body;

        // Process incoming telemetry with rules
        const result = processTelemetry(
            incomingTelemetry,
            rules || []
        );

        // Return validation errors
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid telemetry data",
                errors: result.errors
            });
        }

        // Successful processing response
        return res.status(200).json({
            success: true,
            message: "Telemetry processed successfully",
            data: result.data,
            alerts: result.alerts,
            alertCount: result.alertCount
        });

    } catch (error) {
        console.error("Telemetry processing error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Internal server error while processing telemetry"
        });
    }
};

module.exports = {
    ingestTelemetry
};