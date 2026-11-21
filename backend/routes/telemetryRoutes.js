// NexusFlow - Telemetry Routes

const express = require("express");
const router = express.Router();

const {
    ingestTelemetry,
    getTelemetryHistory
} = require("../controllers/telemetryController");

// POST: Telemetry Ingestion
router.post("/", ingestTelemetry);

// GET: Telemetry History
router.get("/", getTelemetryHistory);

module.exports = router;