// NexusFlow - Device Routes

const express = require("express");
const router = express.Router();

const {
    createDevice,
    getDevices,
    getDeviceById,
    updateDevice,
    deleteDevice
} = require("../controllers/deviceController");

// POST: Register a new device
router.post("/", createDevice);

// GET: Retrieve all devices
router.get("/", getDevices);

// GET: Retrieve a single device
router.get("/:deviceId", getDeviceById);

// PUT: Update an existing device
router.put("/:deviceId", updateDevice);

// DELETE: Remove a device
router.delete("/:deviceId", deleteDevice);

module.exports = router;