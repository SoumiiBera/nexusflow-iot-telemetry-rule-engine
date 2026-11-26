// NexusFlow - Dashboard Controller

const Device = require("../models/Device");
const Alert = require("../models/Alert");
const Telemetry = require("../models/Telemetry");

// GET: Retrieve comprehensive dashboard analytics
const getDashboardSummary = async (req, res) => {
    try {
        const recentlySeenThreshold = new Date(
            Date.now() - 24 * 60 * 60 * 1000
        );

        const [
            totalDevices,
            activeDevices,
            inactiveDevices,
            recentlySeenDevices,
            totalAlerts,
            activeAlerts,
            acknowledgedAlerts,
            resolvedAlerts,
            criticalAlerts,
            warningAlerts,
            totalTelemetryReadings,
            latestTelemetry,
            recentTelemetry,
            recentAlerts
        ] = await Promise.all([
            Device.countDocuments(),

            Device.countDocuments({
                status: "Active"
            }),

            Device.countDocuments({
                status: "Inactive"
            }),

            Device.countDocuments({
                status: "Active",
                lastSeen: {
                    $gte: recentlySeenThreshold
                }
            }),

            Alert.countDocuments(),

            Alert.countDocuments({
                status: "Active"
            }),

            Alert.countDocuments({
                status: "Acknowledged"
            }),

            Alert.countDocuments({
                status: "Resolved"
            }),

            Alert.countDocuments({
                severity: "Critical"
            }),

            Alert.countDocuments({
                severity: "Warning"
            }),

            Telemetry.countDocuments(),

            Telemetry.findOne()
                .sort({ timestamp: -1 })
                .lean(),

            Telemetry.find()
                .sort({ timestamp: -1 })
                .limit(6)
                .lean(),

            Alert.find()
                .sort({ timestamp: -1 })
                .limit(6)
                .lean()
        ]);

        const recentActivity = [
            ...recentAlerts.map((alert) => ({
                type: "alert",
                id: alert.alertId,
                deviceId: alert.deviceId,
                title: alert.ruleName,
                description: alert.message,
                severity: alert.severity,
                status: alert.status,
                timestamp: alert.timestamp
            })),

            ...recentTelemetry.map((reading) => ({
                type: "telemetry",
                id: reading._id,
                deviceId: reading.deviceId,
                title: "Telemetry received",
                description: "New sensor readings recorded",
                readings: {
                    temperature: reading.temperature,
                    humidity: reading.humidity,
                    ...(
                        reading.readings &&
                        typeof reading.readings === "object" &&
                        !Array.isArray(reading.readings)
                            ? reading.readings
                            : {}
                    )
                },
                timestamp: reading.timestamp
            }))
        ]
            .sort(
                (a, b) =>
                    new Date(b.timestamp) - new Date(a.timestamp)
            )
            .slice(0, 10);

        return res.status(200).json({
            success: true,

            data: {
                totalDevices,
                activeDevices,
                totalAlerts,

                deviceHealth: {
                    active: activeDevices,
                    inactive: inactiveDevices,
                    recentlySeen: recentlySeenDevices
                },

                alertIntelligence: {
                    total: totalAlerts,
                    active: activeAlerts,
                    acknowledged: acknowledgedAlerts,
                    resolved: resolvedAlerts,
                    critical: criticalAlerts,
                    warning: warningAlerts
                },

                telemetry: {
                    totalReadings: totalTelemetryReadings,
                    latest: latestTelemetry,
                    recentReadings: recentTelemetry
                },

                recentActivity
            }
        });

    } catch (error) {
        console.error(
            "Dashboard summary error:",
            error.message
        );

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve dashboard summary"
        });
    }
};

module.exports = {
    getDashboardSummary
};
