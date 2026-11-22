const API_BASE_URL = "http://127.0.0.1:5000/api/devices";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

// Retrieve all devices
export const getDevices = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await handleResponse(response);
  return result.data;
};

// Register a new device
export const createDevice = async (deviceData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(deviceData),
  });

  return handleResponse(response);
};

// Update an existing device
export const updateDevice = async (deviceId, updates) => {
  const response = await fetch(
    `${API_BASE_URL}/${encodeURIComponent(deviceId)}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    }
  );

  return handleResponse(response);
};

// Delete a device
export const deleteDevice = async (deviceId) => {
  const response = await fetch(
    `${API_BASE_URL}/${encodeURIComponent(deviceId)}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse(response);
};
