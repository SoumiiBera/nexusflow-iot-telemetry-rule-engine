const mongoose = require("mongoose");

const telemetrySchema = new mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: true,
            index: true
        },

        temperature: {
            type: Number
        },

        humidity: {
            type: Number
        },

        readings: {
            type: mongoose.Schema.Types.Mixed
        },

        timestamp: {
            type: Date,
            required: true,
            index: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Telemetry", telemetrySchema);