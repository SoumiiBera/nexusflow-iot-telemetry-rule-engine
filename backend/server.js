// NexusFlow - Backend Server

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const telemetryRoutes = require("./routes/telemetryRoutes");
const alertRoutes = require("./routes/alertRoutes");
const ruleRoutes = require("./routes/ruleRoutes");
const deviceRoutes = require("./routes/deviceRoutes");
const connectDB = require("./config/database");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173"
}));

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

// Device Management API Routes
app.use("/api/devices", deviceRoutes);

// Alert API Routes
app.use("/api/alerts", alertRoutes);

// Rule Management API Routes
app.use("/api/rules", ruleRoutes);

// Dashboard Summary API Routes
app.use("/api/dashboard", dashboardRoutes);

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