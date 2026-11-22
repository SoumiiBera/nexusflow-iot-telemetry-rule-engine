// NexusFlow - Device API Tests

const request = require("supertest");
const mongoose = require("mongoose");
const { before, after, test } = require("node:test");
const assert = require("node:assert/strict");

const app = require("../server");
const connectDB = require("../config/database");
const Device = require("../models/Device");

const TEST_DEVICE_PREFIX = "TEST_DEVICE_API_";

// Generate unique test device data
const createTestDevice = (overrides = {}) => ({
    deviceId: `${TEST_DEVICE_PREFIX}${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}`,
    name: "Temperature Sensor",
    deviceType: "Temperature Sensor",
    status: "Active",
    location: "Test Room",
    ...overrides
});

before(async () => {
    await connectDB();

    await Device.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });
});

after(async () => {
    await Device.deleteMany({
        deviceId: { $regex: `^${TEST_DEVICE_PREFIX}` }
    });

    await mongoose.disconnect();
});

// POST: Create a device
test("POST /api/devices - should register a new device", async () => {
    const deviceData = createTestDevice();

    const response = await request(app)
        .post("/api/devices")
        .send(deviceData);

    assert.equal(response.status, 201);
    assert.equal(response.body.success, true);
    assert.equal(response.body.data.deviceId, deviceData.deviceId);
});

// POST: Reject duplicate device ID
test("POST /api/devices - should reject duplicate device ID", async () => {
    const deviceData = createTestDevice();

    await Device.create(deviceData);

    const response = await request(app)
        .post("/api/devices")
        .send(deviceData);

    assert.equal(response.status, 409);
    assert.equal(response.body.success, false);
});

// POST: Reject invalid device data
test("POST /api/devices - should reject invalid device data", async () => {
    const response = await request(app)
        .post("/api/devices")
        .send({
            deviceId: "",
            name: ""
        });

    assert.equal(response.status, 400);
    assert.equal(response.body.success, false);
});

// GET: Retrieve all devices
test("GET /api/devices - should retrieve all devices", async () => {
    const device = await Device.create(createTestDevice());

    const response = await request(app)
        .get("/api/devices");

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);

    assert.ok(
        response.body.data.some(
            item => item.deviceId === device.deviceId
        )
    );
});

// GET: Filter devices by status
test("GET /api/devices - should filter devices by status", async () => {
    await Device.create(createTestDevice({
        status: "Inactive"
    }));

    const response = await request(app)
        .get("/api/devices")
        .query({ status: "Inactive" });

    assert.equal(response.status, 200);

    assert.ok(
        response.body.data.every(
            device => device.status === "Inactive"
        )
    );
});

// GET: Reject invalid status filter
test("GET /api/devices - should reject invalid status filter", async () => {
    const response = await request(app)
        .get("/api/devices")
        .query({ status: "Unknown" });

    assert.equal(response.status, 400);
});

// GET: Retrieve a single device
test("GET /api/devices/:deviceId - should retrieve a specific device", async () => {
    const device = await Device.create(createTestDevice());

    const response = await request(app)
        .get(`/api/devices/${device.deviceId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.data.deviceId, device.deviceId);
});

// GET: Return 404 for unknown device
test("GET /api/devices/:deviceId - should return 404 for unknown device", async () => {
    const response = await request(app)
        .get("/api/devices/UNKNOWN_TEST_DEVICE");

    assert.equal(response.status, 404);
});

// PUT: Update an existing device
test("PUT /api/devices/:deviceId - should update an existing device", async () => {
    const device = await Device.create(createTestDevice());

    const response = await request(app)
        .put(`/api/devices/${device.deviceId}`)
        .send({
            name: "Updated Sensor",
            status: "Inactive",
            location: "Room 202"
        });

    assert.equal(response.status, 200);
    assert.equal(response.body.data.name, "Updated Sensor");
    assert.equal(response.body.data.status, "Inactive");
    assert.equal(response.body.data.location, "Room 202");
});

// PUT: Reject empty update
test("PUT /api/devices/:deviceId - should reject empty update", async () => {
    const device = await Device.create(createTestDevice());

    const response = await request(app)
        .put(`/api/devices/${device.deviceId}`)
        .send({});

    assert.equal(response.status, 400);
});

// PUT: Reject invalid update
test("PUT /api/devices/:deviceId - should reject invalid status", async () => {
    const device = await Device.create(createTestDevice());

    const response = await request(app)
        .put(`/api/devices/${device.deviceId}`)
        .send({
            status: "Unknown"
        });

    assert.equal(response.status, 400);
});

// PUT: Return 404 for unknown device
test("PUT /api/devices/:deviceId - should return 404 for unknown device", async () => {
    const response = await request(app)
        .put("/api/devices/UNKNOWN_TEST_DEVICE")
        .send({
            name: "Updated Sensor"
        });

    assert.equal(response.status, 404);
});

// DELETE: Remove an existing device
test("DELETE /api/devices/:deviceId - should delete an existing device", async () => {
    const device = await Device.create(createTestDevice());

    const response = await request(app)
        .delete(`/api/devices/${device.deviceId}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.success, true);

    const deletedDevice = await Device.findOne({
        deviceId: device.deviceId
    });

    assert.equal(deletedDevice, null);
});

// DELETE: Return 404 for unknown device
test("DELETE /api/devices/:deviceId - should return 404 for unknown device", async () => {
    const response = await request(app)
        .delete("/api/devices/UNKNOWN_TEST_DEVICE");

    assert.equal(response.status, 404);
});