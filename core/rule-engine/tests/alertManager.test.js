const test = require("node:test");
const assert = require("node:assert");

const {
    createAlert,
    updateAlertStatus
} = require("../alertManager");

const sampleAlert = {
    deviceId: "DEVICE_001",
    ruleId: "RULE_001",
    ruleName: "High Temperature",
    metric: "temperature",
    value: 42,
    threshold: 40,
    severity: "Critical",
    message: "Temperature exceeded the configured limit."
};

// Test 1: Create alert
test("Should create an alert with a unique ID", () => {
    const alert = createAlert(sampleAlert);

    assert.ok(alert.alertId);
    assert.strictEqual(alert.deviceId, "DEVICE_001");
    assert.strictEqual(alert.status, "Active");
});

// Test 2: Unique IDs
test("Should generate unique IDs for different alerts", () => {
    const alert1 = createAlert(sampleAlert);
    const alert2 = createAlert(sampleAlert);

    assert.notStrictEqual(alert1.alertId, alert2.alertId);
});

// Test 3: Warning severity
test("Should support Warning severity", () => {
    const alert = createAlert({
        ...sampleAlert,
        severity: "Warning"
    });

    assert.strictEqual(alert.severity, "Warning");
});

// Test 4: Update status
test("Should update alert status to Acknowledged", () => {
    const alert = createAlert(sampleAlert);
    const updated = updateAlertStatus(alert, "Acknowledged");

    assert.strictEqual(updated.status, "Acknowledged");
    assert.ok(updated.updatedAt);
});

// Test 5: Resolve alert
test("Should update alert status to Resolved", () => {
    const alert = createAlert(sampleAlert);
    const updated = updateAlertStatus(alert, "Resolved");

    assert.strictEqual(updated.status, "Resolved");
});

// Test 6: Invalid severity
test("Should reject invalid severity", () => {
    assert.throws(
        () => createAlert({
            ...sampleAlert,
            severity: "Emergency"
        }),
        /Invalid alert severity/
    );
});

// Test 7: Missing required field
test("Should reject incomplete alert data", () => {
    const invalidAlert = { ...sampleAlert };
    delete invalidAlert.deviceId;

    assert.throws(
        () => createAlert(invalidAlert),
        /Missing required field/
    );
});

// Test 8: Invalid status
test("Should reject invalid alert status", () => {
    const alert = createAlert(sampleAlert);

    assert.throws(
        () => updateAlertStatus(alert, "Unknown"),
        /Invalid alert status/
    );
});