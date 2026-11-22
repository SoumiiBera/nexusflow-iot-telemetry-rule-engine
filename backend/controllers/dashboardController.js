// NexusFlow - Dashboard Controller

const Device = require("../models/Device");
const Alert = require("../models/Alert");

// GET: Retrieve dashboard summary
const getDashboardSummary = async (req, res) => {
    try {
        const [
            totalDevices,
            activeDevices,
            totalAlerts
        ] = await Promise.all([
            Device.countDocuments(),
            Device.countDocuments({ status: "Active" }),
            Alert.countDocuments()
        ]);

        return res.status(200).json({
            success: true,
            data: {
                totalDevices,
                activeDevices,
                totalAlerts
            }
        });

    } catch (error) {
        console.error("Dashboard summary error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve dashboard summary"
        });
    }
};

module.exports = {
    getDashboardSummary
};