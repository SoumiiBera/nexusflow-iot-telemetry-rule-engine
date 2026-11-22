// NexusFlow - Device Model

const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        name: {
            type: String,
            required: true,
            trim: true
        },

        deviceType: {
            type: String,
            default: "Sensor",
            trim: true
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        },

        location: {
            type: String,
            default: "Not specified",
            trim: true
        },

        lastSeen: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Device", deviceSchema);