// NexusFlow - Alert Model

const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(
    {
        alertId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },

        deviceId: {
            type: String,
            required: true,
            index: true
        },

        ruleId: {
            type: String,
            required: true
        },

        ruleName: {
            type: String,
            required: true
        },

        metric: {
            type: String,
            required: true
        },

        value: {
            type: Number,
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

        message: {
            type: String,
            required: true
        },

        status: {
            type: String,
            enum: ["Active", "Acknowledged", "Resolved"],
            default: "Active",
            index: true
        },

        timestamp: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Alert", alertSchema);