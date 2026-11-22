// NexusFlow - Telemetry Controller

const { processTelemetry } = require("../core/telemetry/telemetryProcessor");
const Telemetry = require("../models/Telemetry");
const Alert = require("../models/Alert");
const Rule = require("../models/Rule");
const Device = require("../models/Device");

// POST: Ingest telemetry and save generated alerts
const ingestTelemetry = async (req, res) => {
    try {
        const { telemetry } = req.body;
        const incomingTelemetry = telemetry || req.body;

        // Fetch enabled rules for the incoming device
        const activeRules = await Rule.find({
            deviceId: incomingTelemetry.deviceId,
            enabled: true
        }).lean();

        // Process telemetry using database rules
        const result = processTelemetry(incomingTelemetry, activeRules);
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid telemetry data",
                errors: result.errors
            });
        }

        // Save telemetry
        const savedTelemetry = await Telemetry.create(result.data);

        // Update lastSeen for the registered device
        await Device.updateOne(
            { deviceId: savedTelemetry.deviceId },
            {
                $max: {
                    lastSeen: savedTelemetry.timestamp
                }
            }
        );

        // Save generated alerts
        if (result.alerts.length > 0) {
            await Alert.insertMany(result.alerts);
        }

        return res.status(200).json({
            success: true,
            message: "Telemetry processed and saved successfully",
            data: savedTelemetry,
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

// GET: Retrieve telemetry history
const getTelemetryHistory = async (req, res) => {
    try {
        const { deviceId } = req.query;

        const filter = deviceId ? { deviceId } : {};

        const records = await Telemetry.find(filter)
            .sort({ timestamp: -1 })
            .limit(100);

        return res.status(200).json({
            success: true,
            count: records.length,
            data: records
        });

    } catch (error) {
        console.error("Telemetry retrieval error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve telemetry history"
        });
    }
};

module.exports = {
    ingestTelemetry,
    getTelemetryHistory
};