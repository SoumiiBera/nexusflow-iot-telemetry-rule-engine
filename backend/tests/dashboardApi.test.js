// NexusFlow - Dashboard API Tests

const request = require("supertest");
const mongoose = require("mongoose");
const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");

const app = require("../server");
const connectDB = require("../config/database");

const Device = require("../models/Device");
const Alert = require("../models/Alert");
const Telemetry = require("../models/Telemetry");

const TEST_DEVICE_PREFIX = "TEST_DASHBOARD_DEVICE_";
const TEST_ALERT_PREFIX = "TEST_DASHBOARD_ALERT_";

const TEST_TELEMETRY_DEVICE = `${TEST_DEVICE_PREFIX}001`;

before(async () => {
    await connectDB();

    await Device.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });

    await Alert.deleteMany({
        alertId: { $regex: `^${TEST_ALERT_PREFIX}` }
    });

    await Telemetry.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });
});

after(async () => {
    await Device.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });

    await Alert.deleteMany({
        alertId: { $regex: `^${TEST_ALERT_PREFIX}` }
    });

    await Telemetry.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });

    await mongoose.disconnect();
});

// GET: Retrieve dashboard summary
test("GET /api/dashboard/summary - should return complete dashboard statistics", async () => {

    const now = new Date();

    // Capture existing database counts
    const initialTotalDevices = await Device.countDocuments();
    const initialActiveDevices = await Device.countDocuments({
        status: "Active"
    });
    const initialTotalAlerts = await Alert.countDocuments();
    const initialTotalTelemetry = await Telemetry.countDocuments();

    const initialActiveAlerts = await Alert.countDocuments({
        status: "Active"
    });
    const initialAcknowledgedAlerts = await Alert.countDocuments({
        status: "Acknowledged"
    });
    const initialResolvedAlerts = await Alert.countDocuments({
        status: "Resolved"
    });
    const initialCriticalAlerts = await Alert.countDocuments({
        severity: "Critical"
    });
    const initialWarningAlerts = await Alert.countDocuments({
        severity: "Warning"
    });

    // Create test devices
    await Device.create([
        {
            deviceId: `${TEST_DEVICE_PREFIX}001`,
            name: "Dashboard Test Sensor 1",
            status: "Active",
            lastSeen: new Date(now.getTime() - 60 * 60 * 1000)
        },
        {
            deviceId: `${TEST_DEVICE_PREFIX}002`,
            name: "Dashboard Test Sensor 2",
            status: "Inactive",
            lastSeen: new Date(now.getTime() - 48 * 60 * 60 * 1000)
        }
    ]);

    // Create test alerts with different severities and statuses
    await Alert.create([
        {
            alertId: `${TEST_ALERT_PREFIX}001`,
            deviceId: TEST_TELEMETRY_DEVICE,
            ruleId: "TEST_RULE_001",
            ruleName: "Temperature Warning",
            metric: "temperature",
            value: 80,
            threshold: 70,
            severity: "Warning",
            status: "Active",
            message: "Test temperature warning",
            timestamp: now
        },
        {
            alertId: `${TEST_ALERT_PREFIX}002`,
            deviceId: TEST_TELEMETRY_DEVICE,
            ruleId: "TEST_RULE_002",
            ruleName: "Critical Temperature",
            metric: "temperature",
            value: 100,
            threshold: 90,
            severity: "Critical",
            status: "Acknowledged",
            message: "Test critical temperature",
            timestamp: new Date(now.getTime() - 1000)
        },
        {
            alertId: `${TEST_ALERT_PREFIX}003`,
            deviceId: TEST_TELEMETRY_DEVICE,
            ruleId: "TEST_RULE_003",
            ruleName: "Resolved Humidity",
            metric: "humidity",
            value: 90,
            threshold: 80,
            severity: "Warning",
            status: "Resolved",
            message: "Test resolved humidity alert",
            timestamp: new Date(now.getTime() - 2000)
        }
    ]);

    // Create test telemetry readings
    await Telemetry.create([
        {
            deviceId: TEST_TELEMETRY_DEVICE,
            temperature: 28.5,
            humidity: 65,
            readings: {
                pressure: 1012
            },
            timestamp: now
        },
        {
            deviceId: TEST_TELEMETRY_DEVICE,
            temperature: 29.5,
            humidity: 68,
            readings: {
                pressure: 1013
            },
            timestamp: new Date(now.getTime() - 60 * 1000)
        }
    ]);

    const response = await request(app)
        .get("/api/dashboard/summary");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);

    const data = response.body.data;

    // Existing dashboard statistics
    assert.equal(data.totalDevices, initialTotalDevices + 2);
    assert.equal(data.activeDevices, initialActiveDevices + 1);
    assert.equal(data.totalAlerts, initialTotalAlerts + 3);

    // Device health
    assert.equal(data.deviceHealth.active, initialActiveDevices + 1);
    assert.equal(data.deviceHealth.inactive, initialTotalDevices - initialActiveDevices + 1);
    assert.equal(data.deviceHealth.recentlySeen, 1);

    // Alert intelligence
    assert.equal(data.alertIntelligence.total, initialTotalAlerts + 3);
    assert.equal(data.alertIntelligence.active, initialActiveAlerts + 1);
    assert.equal(data.alertIntelligence.acknowledged, initialAcknowledgedAlerts + 1);
    assert.equal(data.alertIntelligence.resolved, initialResolvedAlerts + 1);
    assert.equal(data.alertIntelligence.critical, initialCriticalAlerts + 1);
    assert.equal(data.alertIntelligence.warning, initialWarningAlerts + 2);

    // Telemetry statistics
    assert.equal(data.telemetry.totalReadings, initialTotalTelemetry + 2);
    assert.ok(data.telemetry.latest);
    assert.equal(data.telemetry.latest.deviceId, TEST_TELEMETRY_DEVICE);
    assert.equal(data.telemetry.latest.temperature, 28.5);
    assert.ok(data.telemetry.recentReadings.length >= 2);
    assert.equal(
        data.telemetry.recentReadings.filter(
            (reading) => reading.deviceId === TEST_TELEMETRY_DEVICE
        ).length,
        2
    );

    // Recent activity
    assert.ok(Array.isArray(data.recentActivity));

    const testAlertActivity = data.recentActivity.filter(
        (activity) =>
            activity.type === "alert" &&
            activity.id.startsWith(TEST_ALERT_PREFIX)
    );

    assert.equal(testAlertActivity.length, 3);

    const testTelemetryActivity = data.recentActivity.filter(
        (activity) =>
            activity.type === "telemetry" &&
            activity.deviceId === TEST_TELEMETRY_DEVICE
    );

    assert.equal(testTelemetryActivity.length, 2);

    // Verify recent activity is sorted newest first
    for (let index = 1; index < data.recentActivity.length; index++) {
        assert.ok(
            new Date(data.recentActivity[index - 1].timestamp) >=
            new Date(data.recentActivity[index].timestamp)
        );
    }
});
