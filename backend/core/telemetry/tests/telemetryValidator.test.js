const test = require("node:test");
const assert = require("node:assert/strict");

const { validateTelemetry } = require("../telemetryValidator");

const validTelemetry = {
    deviceId: "DEVICE_001",
    temperature: 42,
    humidity: 25,
    timestamp: new Date().toISOString()
};

test("Should accept valid telemetry data", () => {
    const result = validateTelemetry(validTelemetry);

    assert.equal(result.valid, true);
    assert.deepEqual(result.errors, []);
});

test("Should reject invalid telemetry object", () => {
    const result = validateTelemetry(null);

    assert.equal(result.valid, false);
});

test("Should reject missing deviceId", () => {
    const telemetry = {
        temperature: 42
    };

    const result = validateTelemetry(telemetry);

    assert.equal(result.valid, false);
});

test("Should reject empty deviceId", () => {
    const telemetry = {
        deviceId: " ",
        temperature: 42
    };

    const result = validateTelemetry(telemetry);

    assert.equal(result.valid, false);
});

test("Should reject non-numeric sensor readings", () => {
    const telemetry = {
        deviceId: "DEVICE_001",
        temperature: "42"
    };

    const result = validateTelemetry(telemetry);

    assert.equal(result.valid, false);
});

test("Should reject invalid timestamp", () => {
    const telemetry = {
        deviceId: "DEVICE_001",
        temperature: 42,
        timestamp: "invalid-date"
    };

    const result = validateTelemetry(telemetry);

    assert.equal(result.valid, false);
});

test("Should reject telemetry without sensor readings", () => {
    const telemetry = {
        deviceId: "DEVICE_001"
    };

    const result = validateTelemetry(telemetry);

    assert.equal(result.valid, false);
});

test("Should accept multiple numeric sensor readings", () => {
    const telemetry = {
        deviceId: "DEVICE_002",
        temperature: 35,
        humidity: 60,
        pressure: 1013
    };

    const result = validateTelemetry(telemetry);

    assert.equal(result.valid, true);
});