// NexusFlow - Alert API Tests

require("dotenv").config();

const { test, before, after } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");
const mongoose = require("mongoose");
const connectDB = require("../config/database");
const Alert = require("../models/Alert");

// Connect to MongoDB
before(async () => {
    await connectDB();

    await Alert.deleteMany({
        deviceId: "TEST_ALERT_API"
    });
});

// Cleanup after tests
after(async () => {
    await Alert.deleteMany({
        deviceId: "TEST_ALERT_API"
    });

    await mongoose.disconnect();
});

// Create a test alert
async function createTestAlert() {
    return Alert.create({
        alertId: `TEST_${Date.now()}_${Math.random()}`,
        deviceId: "TEST_ALERT_API",
        ruleId: "RULE_TEST",
        ruleName: "High Temperature",
        metric: "temperature",
        value: 45,
        threshold: 40,
        severity: "Critical",
        message: "Temperature exceeded threshold.",
        status: "Active",
        timestamp: new Date()
    });
}

// Test 1: Retrieve alerts
test("Should retrieve alerts successfully", async () => {
    await createTestAlert();

    const response = await request(app)
        .get("/api/alerts");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.ok(Array.isArray(response.body.data));
});

// Test 2: Filter alerts by device ID
test("Should filter alerts by device ID", async () => {
    const response = await request(app)
        .get("/api/alerts?deviceId=TEST_ALERT_API");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);

    assert.ok(
        response.body.data.every(
            alert => alert.deviceId === "TEST_ALERT_API"
        )
    );
});

// Test 3: Update alert status
test("Should update alert status successfully", async () => {
    const alert = await createTestAlert();

    const response = await request(app)
        .patch(`/api/alerts/${alert.alertId}/status`)
        .send({
            status: "Acknowledged"
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.data.status, "Acknowledged");
});

// Test 4: Reject invalid status
test("Should reject invalid alert status", async () => {
    const alert = await createTestAlert();

    const response = await request(app)
        .patch(`/api/alerts/${alert.alertId}/status`)
        .send({
            status: "Invalid"
        });

    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.body.success, false);
});

// Test 5: Handle non-existing alert
test("Should return 404 for non-existing alert", async () => {
    const response = await request(app)
        .patch("/api/alerts/UNKNOWN_ALERT/status")
        .send({
            status: "Resolved"
        });

    assert.strictEqual(response.status, 404);
    assert.strictEqual(response.body.success, false);
});