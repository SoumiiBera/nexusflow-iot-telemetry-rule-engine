// NexusFlow - Rule Model

const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema(
    {
        ruleId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        ruleName: {
            type: String,
            required: true
        },

        deviceId: {
            type: String,
            required: true,
            index: true
        },

        metric: {
            type: String,
            required: true
        },

        operator: {
            type: String,
            enum: [">", "<", "==", ">=", "<="],
            required: true
        },

        threshold: {
            type: Number,
            required: true
        },

        severity: {
            type: String,
            enum: ["Warning", "Critical"],
            required: true
        },

        enabled: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Rule", ruleSchema);