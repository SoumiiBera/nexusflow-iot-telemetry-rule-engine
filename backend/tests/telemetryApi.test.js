// NexusFlow - Telemetry API Tests
require("dotenv").config();
const { test, before, after } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");


const app = require("../server");
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Telemetry = require("../models/Telemetry");
const Alert = require("../models/Alert");
const Rule = require("../models/Rule");
const Device = require("../models/Device");

// Connect to MongoDB before running tests
before(async () => {
    await connectDB();
});

// Cleanup after all tests
after(async () => {
    await Telemetry.deleteMany({
        deviceId: /^TEST_DEVICE_/
    });

    await Alert.deleteMany({
    deviceId: /^TEST_DEVICE_/
});

    await Device.deleteMany({
        deviceId: /^TEST_DEVICE_/
    });

await Rule.deleteMany({
    deviceId: {
        $in: [
            "TEST_DEVICE_001",
            "TEST_DEVICE_002",
            "TEST_DEVICE_003"
        ]
    }
});

await mongoose.disconnect();
});

// Test 1: Valid telemetry
test("Should process valid telemetry successfully", async () => {
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            deviceId: "TEST_DEVICE_001",
            temperature: 35,
            humidity: 65
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(
        response.body.message,
        "Telemetry processed and saved successfully"
    );
});

// Test 2: Update device lastSeen after telemetry ingestion
test("Should update registered device lastSeen when telemetry is received", async () => {
    const deviceId = "TEST_DEVICE_LASTSEEN_001";

    await Device.create({
        deviceId,
        name: "Last Seen Test Device"
    });

    const latestTimestamp = new Date("2026-11-22T08:00:00.000Z");

    // Send telemetry with a timestamp
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            deviceId,
            temperature: 35,
            humidity: 60,
            timestamp: latestTimestamp.toISOString()
        });

    assert.strictEqual(response.status, 200);

    let savedDevice = await Device.findOne({ deviceId });

    assert.ok(savedDevice.lastSeen);
    assert.strictEqual(
        savedDevice.lastSeen.toISOString(),
        latestTimestamp.toISOString()
    );

    // Send older telemetry
    const olderTimestamp = new Date("2026-11-21T08:00:00.000Z");

    const olderResponse = await request(app)
        .post("/api/telemetry")
        .send({
            deviceId,
            temperature: 30,
            humidity: 55,
            timestamp: olderTimestamp.toISOString()
        });

    assert.strictEqual(olderResponse.status, 200);

    savedDevice = await Device.findOne({ deviceId });

    // lastSeen should not move backwards
    assert.strictEqual(
        savedDevice.lastSeen.toISOString(),
        latestTimestamp.toISOString()
    );
});

// Test 3: Invalid telemetry
test("Should reject invalid telemetry", async () => {
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            deviceId: "",
            temperature: "invalid",
            humidity: 65
        });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.success, false);
    assert.strictEqual(
        response.body.message,
        "Invalid telemetry data"
    );
});

// Test 4: Trigger alerts from database rules
test("Should generate alerts when database rules are triggered", async () => {

    // Create rules in MongoDB
    await Rule.create([
        {
            ruleId: "RULE_001",
            ruleName: "High Temperature",
            deviceId: "TEST_DEVICE_001",
            metric: "temperature",
            operator: ">",
            threshold: 40,
            severity: "Critical",
            enabled: true
        },
        {
            ruleId: "RULE_002",
            ruleName: "Low Humidity",
            deviceId: "TEST_DEVICE_001",
            metric: "humidity",
            operator: "<",
            threshold: 30,
            severity: "Warning",
            enabled: true
        }
    ]);

    // Send telemetry without rules
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            telemetry: {
                deviceId: "TEST_DEVICE_001",
                temperature: 42,
                humidity: 25
            }
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.alertCount, 2);
    assert.strictEqual(response.body.alerts.length, 2);

    // Verify both expected alert severities regardless of database order
const alertSeverities = response.body.alerts
    .map(alert => alert.severity)
    .sort();

assert.deepStrictEqual(
    alertSeverities,
    ["Critical", "Warning"]
);
    // Verify alerts are saved in MongoDB
    const savedAlerts = await Alert.find({
        deviceId: "TEST_DEVICE_001"
    });

    assert.strictEqual(savedAlerts.length, 2);

    assert.ok(savedAlerts[0].alertId);
    assert.strictEqual(savedAlerts[0].status, "Active");

    assert.ok(savedAlerts[1].alertId);
    assert.strictEqual(savedAlerts[1].status, "Active");
});

// Test 5: No rules triggered
test("Should return empty alerts when no rules are triggered", async () => {

    // Create a rule in MongoDB
    await Rule.create({
        ruleId: "RULE_003",
        ruleName: "High Temperature",
        deviceId: "TEST_DEVICE_002",
        metric: "temperature",
        operator: ">",
        threshold: 40,
        severity: "Critical",
        enabled: true
    });

    // Send telemetry below the threshold
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            telemetry: {
                deviceId: "TEST_DEVICE_002",
                temperature: 20,
                humidity: 50
            }
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.alertCount, 0);
    assert.strictEqual(response.body.alerts.length, 0);
});

// Test 6: Disabled rules should not generate alerts
test("Should not generate alerts from disabled database rules", async () => {

    // Create a disabled rule in MongoDB
    await Rule.create({
        ruleId: "RULE_004",
        ruleName: "Disabled Temperature Alert",
        deviceId: "TEST_DEVICE_003",
        metric: "temperature",
        operator: ">",
        threshold: 30,
        severity: "Critical",
        enabled: false
    });

    // Send telemetry exceeding the threshold
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            telemetry: {
                deviceId: "TEST_DEVICE_003",
                temperature: 45,
                humidity: 60
            }
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.alertCount, 0);
    assert.strictEqual(response.body.alerts.length, 0);
});

// Test 7: Retrieve telemetry history
test("Should retrieve telemetry history successfully", async () => {
    const response = await request(app)
        .get("/api/telemetry");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
});

// Test 8: Filter telemetry by device ID
test("Should filter telemetry history by device ID", async () => {
    const response = await request(app)
        .get("/api/telemetry?deviceId=TEST_DEVICE_001");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);

    assert.ok(
        response.body.data.every(
            record => record.deviceId === "TEST_DEVICE_001"
        )
    );
});