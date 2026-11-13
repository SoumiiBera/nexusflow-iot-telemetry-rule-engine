const test = require("node:test");
const assert = require("node:assert");
const { evaluateRules } = require("../ruleEngine");

const telemetry = {
    deviceId: "DEVICE_001",
    temperature: 42,
    humidity: 25
};

const rules = [
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
    },
    {
        ruleId: "RULE_003",
        ruleName: "Normal Temperature",
        deviceId: "DEVICE_001",
        metric: "temperature",
        operator: "<",
        threshold: 35,
        severity: "Warning",
        enabled: true
    }
];

// Test 1: Multiple alerts
test("Should generate alerts for all triggered rules", () => {
    const alerts = evaluateRules(telemetry, rules);

    assert.strictEqual(alerts.length, 2);
    assert.strictEqual(alerts[0].severity, "Critical");
    assert.strictEqual(alerts[1].severity, "Warning");
});

// Test 2: Empty rules
test("Should return an empty array when no rules exist", () => {
    const alerts = evaluateRules(telemetry, []);

    assert.deepStrictEqual(alerts, []);
});

// Test 3: All rules disabled
test("Should not generate alerts for disabled rules", () => {
    const disabledRules = rules.map(rule => ({
        ...rule,
        enabled: false
    }));

    const alerts = evaluateRules(telemetry, disabledRules);

    assert.deepStrictEqual(alerts, []);
});

// Test 4: Invalid rules input
test("Should reject invalid rules input", () => {
    assert.throws(
        () => evaluateRules(telemetry, "invalid"),
        /Rules must be provided as an array/
    );
});

// Test 5: Invalid telemetry
test("Should reject invalid telemetry input", () => {
    assert.throws(
        () => evaluateRules(null, rules),
        /Valid telemetry data is required/
    );
});