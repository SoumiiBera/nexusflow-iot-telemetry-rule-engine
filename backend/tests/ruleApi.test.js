// NexusFlow - Rule API Tests

const request = require("supertest");
const mongoose = require("mongoose");
const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");

const app = require("../server");
const connectDB = require("../config/database");
const Rule = require("../models/Rule");

const TEST_DEVICE_ID = "TEST_RULE_API";

before(async () => {
    await connectDB();
    await Rule.deleteMany({ deviceId: TEST_DEVICE_ID });
});

after(async () => {
    await Rule.deleteMany({ deviceId: TEST_DEVICE_ID });
    await mongoose.disconnect();
});

// Test rule data
const createTestRule = (overrides = {}) => ({
    ruleId: `TEST_RULE_${Date.now()}_${Math.random()}`,
    ruleName: "High Temperature Alert",
    deviceId: TEST_DEVICE_ID,
    metric: "temperature",
    operator: ">",
    threshold: 40,
    severity: "Warning",
    enabled: true,
    ...overrides
});

// POST: Create a rule
test("POST /api/rules - should create a new rule", async () => {
    const ruleData = createTestRule();

    const response = await request(app)
        .post("/api/rules")
        .send(ruleData);

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.ruleId, ruleData.ruleId);
});

// POST: Reject duplicate rule ID
test("POST /api/rules - should reject duplicate rule ID", async () => {
    const ruleData = createTestRule();

    await Rule.create(ruleData);

    const response = await request(app)
        .post("/api/rules")
        .send(ruleData);

    assert.equal(response.status, 409);
    assert.equal(response.body.success, false);
});

// POST: Reject invalid rule
test("POST /api/rules - should reject invalid rule data", async () => {
    const response = await request(app)
        .post("/api/rules")
        .send({
            ruleId: "",
            threshold: "invalid"
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
});

// GET: Retrieve all rules
test("GET /api/rules - should retrieve all rules", async () => {
    await Rule.create(createTestRule());

    const response = await request(app)
        .get("/api/rules")
        .query({ deviceId: TEST_DEVICE_ID });

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);
    assert.ok(response.body.count >= 1);
});

// GET: Filter by enabled status
test("GET /api/rules - should filter rules by enabled status", async () => {
    await Rule.create(createTestRule({ enabled: false }));

    const response = await request(app)
        .get("/api/rules")
        .query({
            deviceId: TEST_DEVICE_ID,
            enabled: "false"
        });

    assert.equal(response.status, 200);
    assert.ok(response.body.data.every(rule => rule.enabled === false));
});

// GET: Reject invalid enabled query
test("GET /api/rules - should reject invalid enabled query", async () => {
    const response = await request(app)
        .get("/api/rules")
        .query({ enabled: "yes" });

    assert.equal(response.status, 400);
});

// GET: Retrieve a single rule
test("GET /api/rules/:ruleId - should retrieve a specific rule", async () => {
    const rule = await Rule.create(createTestRule());

    const response = await request(app)
        .get(`/api/rules/${rule.ruleId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.data.ruleId, rule.ruleId);
});

// GET: Return 404 for unknown rule
test("GET /api/rules/:ruleId - should return 404 for unknown rule", async () => {
    const response = await request(app)
        .get("/api/rules/UNKNOWN_RULE");

    assert.equal(response.status, 404);
});

// PUT: Update an existing rule
test("PUT /api/rules/:ruleId - should update an existing rule", async () => {
    const rule = await Rule.create(createTestRule());

    const response = await request(app)
        .put(`/api/rules/${rule.ruleId}`)
        .send({
            ruleName: "Updated Temperature Alert",
            deviceId: TEST_DEVICE_ID,
            metric: "temperature",
            operator: ">",
            threshold: 50,
            severity: "Critical",
            enabled: true
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.data.threshold, 50);
    assert.equal(response.body.data.severity, "Critical");
});

// PUT: Reject invalid update
test("PUT /api/rules/:ruleId - should reject invalid rule update", async () => {
    const rule = await Rule.create(createTestRule());

    const response = await request(app)
        .put(`/api/rules/${rule.ruleId}`)
        .send({
            ruleName: "",
            deviceId: TEST_DEVICE_ID,
            metric: "temperature",
            operator: "INVALID",
            threshold: 50,
            severity: "Critical",
            enabled: true
        });

    assert.equal(response.status, 400);
});

// PUT: Return 404 for unknown rule
test("PUT /api/rules/:ruleId - should return 404 for unknown rule", async () => {
    const response = await request(app)
        .put("/api/rules/UNKNOWN_RULE")
        .send(createTestRule());

    assert.equal(response.status, 404);
});

// DELETE: Remove an existing rule
test("DELETE /api/rules/:ruleId - should delete an existing rule", async () => {
    const rule = await Rule.create(createTestRule());

    const response = await request(app)
        .delete(`/api/rules/${rule.ruleId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);

    const deletedRule = await Rule.findOne({ ruleId: rule.ruleId });
    assert.equal(deletedRule, null);
});

// DELETE: Return 404 for unknown rule
test("DELETE /api/rules/:ruleId - should return 404 for unknown rule", async () => {
    const response = await request(app)
        .delete("/api/rules/UNKNOWN_RULE");

    assert.equal(response.status, 404);
});