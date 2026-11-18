// NexusFlow - Telemetry Processor Tests

const test = require("node:test");
const assert = require("node:assert");

const { processTelemetry } = require("../telemetryProcessor");

// Test 1: Valid telemetry successfully processed
test("should process valid telemetry successfully", () => {
    const telemetry = {
        deviceId: " device-101 ",
        temperature: 30
    };

    const result = processTelemetry(telemetry);

    assert.equal(result.success, true);
    assert.equal(result.data.deviceId, "device-101");
    assert.equal(result.data.temperature, 30);
    assert.deepEqual(result.alerts, []);
    assert.equal(result.alertCount, 0);
});

// Test 2: Invalid telemetry rejected
test("should reject invalid telemetry", () => {
    const telemetry = {
        temperature: 30
    };

    const result = processTelemetry(telemetry);

    assert.equal(result.success, false);
    assert.ok(result.errors.length > 0);
    assert.equal(result.data, null);
    assert.deepEqual(result.alerts, []);
});

// Test 3: Should generate timestamp if missing
test("should process telemetry with generated timestamp", () => {
    const telemetry = {
        deviceId: "device-102",
        humidity: 65
    };

    const result = processTelemetry(telemetry);

    assert.equal(result.success, true);
    assert.ok(!Number.isNaN(Date.parse(result.data.timestamp)));
});

// Test 4: Should reject non-array rules
test("should throw an error when rules are not an array", () => {
    const telemetry = {
        deviceId: "device-103",
        temperature: 28
    };

    assert.throws(
        () => processTelemetry(telemetry, {}),
        /Rules must be provided as an array/
    );
});

// Test 5: Should reject invalid rule configuration
test("should throw an error for invalid rule configuration", () => {
    const telemetry = {
        deviceId: "device-104",
        temperature: 35
    };

    assert.throws(
        () => processTelemetry(telemetry, [{}]),
        /Invalid rule configuration/
    );
});