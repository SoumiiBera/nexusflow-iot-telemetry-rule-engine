// NexusFlow - Rule Controller

const Rule = require("../models/Rule");
const { validateRule } = require("../core/rule-engine/ruleValidator");

// POST: Create a new rule
const createRule = async (req, res) => {
    try {
        const validation = validateRule(req.body);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid rule configuration",
                errors: validation.errors
            });
        }

        const existingRule = await Rule.findOne({
            ruleId: req.body.ruleId
        });

        if (existingRule) {
            return res.status(409).json({
                success: false,
                message: "Rule ID already exists"
            });
        }

        const rule = await Rule.create(req.body);

        return res.status(201).json({
            success: true,
            message: "Rule created successfully",
            data: rule
        });

    } catch (error) {
        console.error("Rule creation error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to create rule"
        });
    }
};

// GET: Retrieve all rules
const getRules = async (req, res) => {
    try {
        const { deviceId, severity, enabled } = req.query;

        const filter = {};

        if (deviceId) filter.deviceId = deviceId;
        if (severity) filter.severity = severity;

        if (enabled !== undefined) {
            if (!["true", "false"].includes(enabled)) {
                return res.status(400).json({
                    success: false,
                    message: "Enabled must be true or false"
                });
            }

            filter.enabled = enabled === "true";
        }

        const rules = await Rule.find(filter)
            .sort({ createdAt: -1 })
            .limit(100);

        return res.status(200).json({
            success: true,
            count: rules.length,
            data: rules
        });

    } catch (error) {
        console.error("Rule retrieval error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve rules"
        });
    }
};

// GET: Retrieve a single rule
const getRuleById = async (req, res) => {
    try {
        const { ruleId } = req.params;

        const rule = await Rule.findOne({ ruleId });

        if (!rule) {
            return res.status(404).json({
                success: false,
                message: "Rule not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: rule
        });

    } catch (error) {
        console.error("Rule retrieval error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to retrieve rule"
        });
    }
};

// PUT: Update an existing rule
const updateRule = async (req, res) => {
    try {
        const { ruleId } = req.params;

        const updatedData = {
            ...req.body,
            ruleId
        };

        const validation = validateRule(updatedData);

        if (!validation.valid) {
            return res.status(400).json({
                success: false,
                message: "Invalid rule configuration",
                errors: validation.errors
            });
        }

        const updatedRule = await Rule.findOneAndUpdate(
            { ruleId },
            updatedData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!updatedRule) {
            return res.status(404).json({
                success: false,
                message: "Rule not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rule updated successfully",
            data: updatedRule
        });

    } catch (error) {
        console.error("Rule update error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to update rule"
        });
    }
};

// DELETE: Remove a rule
const deleteRule = async (req, res) => {
    try {
        const { ruleId } = req.params;

        const deletedRule = await Rule.findOneAndDelete({ ruleId });

        if (!deletedRule) {
            return res.status(404).json({
                success: false,
                message: "Rule not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Rule deleted successfully"
        });

    } catch (error) {
        console.error("Rule deletion error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Unable to delete rule"
        });
    }
};

module.exports = {
    createRule,
    getRules,
    getRuleById,
    updateRule,
    deleteRule
};