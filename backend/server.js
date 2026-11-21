// NexusFlow - Backend Server

require("dotenv").config();

const express = require("express");
const telemetryRoutes = require("./routes/telemetryRoutes");
const alertRoutes = require("./routes/alertRoutes");
const ruleRoutes = require("./routes/ruleRoutes");
const connectDB = require("./config/database");

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

// Alert API Routes
app.use("/api/alerts", alertRoutes);

// Rule Management API Routes
app.use("/api/rules", ruleRoutes);

// Start Server only when this file is executed directly
if (require.main === module) {
    const startServer = async () => {
        try {
            await connectDB();

            app.listen(PORT, () => {
                console.log(`NexusFlow Backend running on port ${PORT}`);
            });
        } catch (error) {
            console.error("Server startup failed:", error.message);
            process.exit(1);
        }
    };

    startServer();
}

module.exports = app;