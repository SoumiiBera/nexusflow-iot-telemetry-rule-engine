// NexusFlow - Device Controller

const Device = require("../models/Device");

// POST: Register a new device
const createDevice = async (req, res) => {
    try {
        const { deviceId, name, deviceType, status, location } = req.body;

        // Validate required fields
        if (
            typeof deviceId !== "string" ||
            !deviceId.trim() ||
            typeof name !== "string" ||
            !name.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Device ID and name are required"
            });
        }

        // Check whether device already exists
        const existingDevice = await Device.findOne({
            deviceId: deviceId.trim()
        });

        if (existingDevice) {
            return res.status(409).json({
                success: false,
                message: "Device ID already exists"
            });
        }

        // Create device
        const device = await Device.create({
            deviceId: deviceId.trim(),
            name: name.trim(),
            deviceType,
            status,
            location
        });

        return res.status(201).json({
            success: true,
            message: "Device registered successfully",
            data: device
        });

    } catch (error) {
        console.error("Device registration error:", error.message);

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "Device ID already exists"
            });
        }

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Invalid device data",
                errors: Object.values(error.errors).map(
                    item => item.message
                )
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to register device"
        });
    }
};

// GET: Retrieve all devices
const getDevices = async (req, res) => {
    try {
        const { status, deviceType } = req.query;

        const filter = {};

        if (status) {
            if (!["Active", "Inactive"].includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Status must be Active or Inactive"
                });
            }

            filter.status = status;
        }

        if (deviceType) {
            filter.deviceType = deviceType;
        }

        const devices = await Device.find(filter)
            .sort({ createdAt: -1 })
            .limit(100);

        return res.status(200).json({
            success: true,
            count: devices.length,
            data: devices
        });

    } catch (error) {
        console.error("Device retrieval error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve devices"
        });
    }
};

// GET: Retrieve a single device
const getDeviceById = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const device = await Device.findOne({ deviceId });

        if (!device) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: device
        });

    } catch (error) {
        console.error("Device retrieval error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve device"
        });
    }
};

// PUT: Update an existing device
const updateDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;
        const allowedFields = [
            "name",
            "deviceType",
            "status",
            "location"
        ];

        const updates = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid fields provided for update"
            });
        }

        const updatedDevice = await Device.findOneAndUpdate(
            { deviceId },
            updates,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedDevice) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Device updated successfully",
            data: updatedDevice
        });

    } catch (error) {
        console.error("Device update error:", error.message);

        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: "Invalid device data"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Unable to update device"
        });
    }
};

// DELETE: Remove a device
const deleteDevice = async (req, res) => {
    try {
        const { deviceId } = req.params;

        const deletedDevice = await Device.findOneAndDelete({
            deviceId
        });

        if (!deletedDevice) {
            return res.status(404).json({
                success: false,
                message: "Device not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Device deleted successfully",
            data: deletedDevice
        });

    } catch (error) {
        console.error("Device deletion error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to delete device"
        });
    }
};

module.exports = {
    createDevice,
    getDevices,
    getDeviceById,
    updateDevice,
    deleteDevice
};