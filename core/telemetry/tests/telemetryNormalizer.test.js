const test = require("node:test");
const assert = require("node:assert/strict");

const { normalizeTelemetry } = require("../telemetryNormalizer");

test("Should normalize valid telemetry data", () => {
    const telemetry = {
        deviceId: " DEVICE_001 ",
        temperature: 42,
        humidity: 25,
        timestamp: "2026-11-16T08:00:00Z"
    };

    const result = normalizeTelemetry(telemetry);

    assert.equal(result.valid, true);
    assert.equal(result.data.deviceId, "DEVICE_001");
    assert.equal(result.data.temperature, 42);
    assert.equal(result.data.humidity, 25);
    assert.equal(
        result.data.timestamp,
        "2026-11-16T08:00:00.000Z"
    );
});

test("Should reject invalid telemetry data", () => {
    const telemetry = {
        deviceId: "DEVICE_001",
        temperature: "42"
    };

    const result = normalizeTelemetry(telemetry);

    assert.equal(result.valid, false);
    assert.ok(result.errors.length > 0);
});

test("Should generate timestamp when timestamp is missing", () => {
    const telemetry = {
        deviceId: "DEVICE_002",
        temperature: 35
    };

    const result = normalizeTelemetry(telemetry);

    assert.equal(result.valid, true);
    assert.ok(!Number.isNaN(Date.parse(result.data.timestamp)));
});

test("Should not modify original telemetry data", () => {
    const telemetry = {
        deviceId: " DEVICE_003 ",
        temperature: 30
    };

    normalizeTelemetry(telemetry);

    assert.equal(telemetry.deviceId, " DEVICE_003 ");
});

test("Should normalize multiple sensor readings", () => {
    const telemetry = {
        deviceId: "DEVICE_004",
        temperature: 28,
        humidity: 65,
        pressure: 1013
    };

    const result = normalizeTelemetry(telemetry);

    assert.equal(result.valid, true);
    assert.equal(result.data.pressure, 1013);
});