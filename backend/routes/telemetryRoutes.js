// NexusFlow - Telemetry Routes

const express = require("express");
const router = express.Router();

const { ingestTelemetry } = require("../controllers/telemetryController");

// Telemetry Ingestion API
router.post("/", ingestTelemetry);

module.exports = router;