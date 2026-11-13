const test = require("node:test");
const assert = require("node:assert");
const { evaluateRule } = require("../evaluator");

// Sample telemetry data
const telemetry = {
    deviceId: "DEVICE_001",
    temperature: 42,
    humidity: 25
};

// Sample rule
const rule = {
    ruleId: "RULE_001",
    ruleName: "High Temperature",
    deviceId: "DEVICE_001",
    metric: "temperature",
    operator: ">",
    threshold: 40,
    severity: "Critical",
    enabled: true
};

// Test 1: Critical alert generation
test("Should generate Critical alert when temperature exceeds threshold", () => {
    const alert = evaluateRule(telemetry, rule);

    assert.ok(alert);
    assert.strictEqual(alert.severity, "Critical");
    assert.strictEqual(alert.value, 42);
});

// Test 2: No alert when condition is false
test("Should return null when temperature is below threshold", () => {
    const alert = evaluateRule(
        { ...telemetry, temperature: 30 },
        rule
    );

    assert.strictEqual(alert, null);
});

// Test 3: Disabled rule
test("Should ignore disabled rules", () => {
    const alert = evaluateRule(
        telemetry,
        { ...rule, enabled: false }
    );

    assert.strictEqual(alert, null);
});

// Test 4: Device ID mismatch
test("Should ignore telemetry from another device", () => {
    const alert = evaluateRule(
        { ...telemetry, deviceId: "DEVICE_002" },
        rule
    );

    assert.strictEqual(alert, null);
});

// Test 5: All comparison operators
test("Should support all five comparison operators", () => {
    const operators = [
        [">", 42, 40, true],
        ["<", 30, 40, true],
        ["==", 40, 40, true],
        [">=", 40, 40, true],
        ["<=", 40, 40, true]
    ];

    operators.forEach(([operator, value, threshold, expected]) => {
        const result = evaluateRule(
            { ...telemetry, temperature: value },
            { ...rule, operator, threshold }
        );

        assert.strictEqual(Boolean(result), expected);
    });
});

// Test 6: Invalid operator
test("Should reject unsupported operators", () => {
    assert.throws(
        () => evaluateRule(
            telemetry,
            { ...rule, operator: "!=" }
        ),
        /Unsupported comparison operator/
    );
});