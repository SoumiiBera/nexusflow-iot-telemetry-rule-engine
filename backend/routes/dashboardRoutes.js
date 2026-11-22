// NexusFlow - Dashboard Routes

const express = require("express");
const router = express.Router();

const {
    getDashboardSummary
} = require("../controllers/dashboardController");

// GET: Retrieve dashboard summary
router.get("/summary", getDashboardSummary);

module.exports = router;