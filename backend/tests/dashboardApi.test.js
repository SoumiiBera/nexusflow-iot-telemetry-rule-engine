// NexusFlow - Dashboard API Tests

const request = require("supertest");
const mongoose = require("mongoose");
const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");

const app = require("../server");
const connectDB = require("../config/database");

const Device = require("../models/Device");
const Alert = require("../models/Alert");

const TEST_DEVICE_PREFIX = "TEST_DASHBOARD_DEVICE_";
const TEST_ALERT_PREFIX = "TEST_DASHBOARD_ALERT_";

before(async () => {
    await connectDB();

    await Device.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });

    await Alert.deleteMany({
        alertId: { $regex: `^${TEST_ALERT_PREFIX}` }
    });
});

after(async () => {
    await Device.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });

    await Alert.deleteMany({
        alertId: { $regex: `^${TEST_ALERT_PREFIX}` }
    });

    await mongoose.disconnect();
});

// GET: Retrieve dashboard summary
test("GET /api/dashboard/summary - should return correct dashboard statistics", async () => {

    // Capture existing database counts
    const initialTotalDevices = await Device.countDocuments();
    const initialActiveDevices = await Device.countDocuments({
        status: "Active"
    });
    const initialTotalAlerts = await Alert.countDocuments();

    // Create test devices
    await Device.create([
        {
            deviceId: `${TEST_DEVICE_PREFIX}001`,
            name: "Dashboard Test Sensor 1",
            status: "Active"
        },
        {
            deviceId: `${TEST_DEVICE_PREFIX}002`,
            name: "Dashboard Test Sensor 2",
            status: "Inactive"
        }
    ]);

    // Create a test alert
    await Alert.create({
        alertId: `${TEST_ALERT_PREFIX}001`,
        deviceId: `${TEST_DEVICE_PREFIX}001`,
        ruleId: "TEST_RULE_001",
        ruleName: "Temperature Alert",
        metric: "temperature",
        value: 80,
        threshold: 70,
        severity: "Warning",
        message: "Test temperature alert",
        timestamp: new Date()
    });

    const response = await request(app)
        .get("/api/dashboard/summary");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);

    assert.equal(
        response.body.data.totalDevices,
        initialTotalDevices + 2
    );

    assert.equal(
        response.body.data.activeDevices,
        initialActiveDevices + 1
    );

    assert.equal(
        response.body.data.totalAlerts,
        initialTotalAlerts + 1
    );
});