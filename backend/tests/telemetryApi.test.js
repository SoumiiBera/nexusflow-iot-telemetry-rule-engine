// NexusFlow - Telemetry API Tests

const test = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../server");

// Test 1: Valid telemetry
test("Should process valid telemetry successfully", async () => {
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            deviceId: "DEVICE_001",
            temperature: 35,
            humidity: 65
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(
        response.body.message,
        "Telemetry processed successfully"
    );
});

// Test 2: Invalid telemetry
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

// Test 3: Trigger alerts from rules
test("Should generate alerts when rules are triggered", async () => {
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            telemetry: {
                deviceId: "DEVICE_001",
                temperature: 42,
                humidity: 25
            },
            rules: [
                {
                    ruleId: "RULE_001",
                    ruleName: "High Temperature",
                    deviceId: "DEVICE_001",
                    metric: "temperature",
                    operator: ">",
                    threshold: 40,
                    severity: "Critical",
                    enabled: true
                },
                {
                    ruleId: "RULE_002",
                    ruleName: "Low Humidity",
                    deviceId: "DEVICE_001",
                    metric: "humidity",
                    operator: "<",
                    threshold: 30,
                    severity: "Warning",
                    enabled: true
                }
            ]
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.alertCount, 2);
    assert.strictEqual(response.body.alerts.length, 2);
    assert.strictEqual(response.body.alerts[0].severity, "Critical");
    assert.strictEqual(response.body.alerts[1].severity, "Warning");
});

// Test 4: No rules triggered
test("Should return empty alerts when no rules are triggered", async () => {
    const response = await request(app)
        .post("/api/telemetry")
        .send({
            telemetry: {
                deviceId: "DEVICE_001",
                temperature: 20,
                humidity: 50
            },
            rules: [
                {
                    ruleId: "RULE_001",
                    ruleName: "High Temperature",
                    deviceId: "DEVICE_001",
                    metric: "temperature",
                    operator: ">",
                    threshold: 40,
                    severity: "Critical",
                    enabled: true
                }
            ]
        });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.body.success, true);
    assert.strictEqual(response.body.alertCount, 0);
    assert.strictEqual(response.body.alerts.length, 0);
});