// NexusFlow - Backend Server

const express = require("express");
const telemetryRoutes = require("./routes/telemetryRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Health Check API
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "NexusFlow Backend",
        message: "Backend server is running successfully"
    });
});

// Telemetry API Routes
app.use("/api/telemetry", telemetryRoutes);

// Start Server only when this file is executed directly
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`NexusFlow Backend running on port ${PORT}`);
    });
}

module.exports = app;