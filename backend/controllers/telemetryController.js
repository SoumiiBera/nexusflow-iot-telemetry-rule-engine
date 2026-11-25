// NexusFlow - Telemetry Controller

const { processTelemetry } = require("../core/telemetry/telemetryProcessor");
const Telemetry = require("../models/Telemetry");
const Alert = require("../models/Alert");
const Rule = require("../models/Rule");
const Device = require("../models/Device");
const { validateTelemetry } = require("../core/telemetry/telemetryValidator");

// POST: Ingest telemetry and save generated alerts
const ingestTelemetry = async (req, res) => {
    try {
        const { telemetry } = req.body || {};
        const incomingTelemetry = telemetry || req.body;

        // Validate telemetry before database lookup
        const validation = validateTelemetry(incomingTelemetry);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid telemetry data",
                errors: validation.errors
            });
        }

        const deviceId = incomingTelemetry.deviceId.trim();

        // Verify that the device is registered
        const device = await Device.findOne({ deviceId }).lean();

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device is not registered."
            });
        }

        // Reject telemetry from inactive devices
        if (device.status !== "Active") {
            return res.status(409).json({
                success: false,
                message: "Telemetry cannot be accepted from an inactive device."
            });
        }

        // Fetch enabled rules for the registered device
        const activeRules = await Rule.find({
            deviceId,
            enabled: true
        }).lean();

        // Process and validate telemetry
        const result = processTelemetry(
            { ...incomingTelemetry, deviceId },
            activeRules
        );

        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: "Invalid telemetry data",
                errors: result.errors
            });
        }

        // Save telemetry
        const savedTelemetry = await Telemetry.create(result.data);

        // Update lastSeen without moving backwards
        await Device.updateOne(
            { deviceId },
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