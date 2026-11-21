// NexusFlow - Alert Controller

const Alert = require("../models/Alert");
const {
    VALID_STATUSES
} = require("../core/rule-engine/alertManager");

// GET: Retrieve alerts
const getAlerts = async (req, res) => {
    try {
        const { deviceId, status, severity } = req.query;

        const filter = {};

        if (deviceId) filter.deviceId = deviceId;
        if (status) filter.status = status;
        if (severity) filter.severity = severity;

        const alerts = await Alert.find(filter)
            .sort({ timestamp: -1 })
            .limit(100);

        return res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts
        });

    } catch (error) {
        console.error("Alert retrieval error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve alerts"
        });
    }
};

// PATCH: Update alert status
const updateAlertStatus = async (req, res) => {
    try {
        const { alertId } = req.params;
        const { status } = req.body;

        if (!VALID_STATUSES.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid alert status"
            });
        }

        const updatedAlert = await Alert.findOneAndUpdate(
            { alertId },
            {
                status,
                updatedAt: new Date()
            },
            {
               returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedAlert) {
            return res.status(404).json({
                success: false,
                message: "Alert not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Alert status updated successfully",
            data: updatedAlert
        });

    } catch (error) {
        console.error("Alert status update error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to update alert status"
        });
    }
};

module.exports = {
    getAlerts,
    updateAlertStatus
};
