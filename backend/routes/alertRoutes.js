// NexusFlow - Alert Routes

const express = require("express");
const router = express.Router();

const {
    getAlerts,
    updateAlertStatus
} = require("../controllers/alertController");

// GET: Retrieve alerts
router.get("/", getAlerts);

// PATCH: Update alert status
router.patch("/:alertId/status", updateAlertStatus);

module.exports = router;