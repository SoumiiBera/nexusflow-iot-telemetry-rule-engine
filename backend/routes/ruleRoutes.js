// NexusFlow - Rule Routes

const express = require("express");
const router = express.Router();

const {
    createRule,
    getRules,
    getRuleById,
    updateRule,
    deleteRule
} = require("../controllers/ruleController");

// POST: Create a new rule
router.post("/", createRule);

// GET: Retrieve all rules
router.get("/", getRules);

// GET: Retrieve a single rule
router.get("/:ruleId", getRuleById);

// PUT: Update an existing rule
router.put("/:ruleId", updateRule);

// DELETE: Remove a rule
router.delete("/:ruleId", deleteRule);

module.exports = router;