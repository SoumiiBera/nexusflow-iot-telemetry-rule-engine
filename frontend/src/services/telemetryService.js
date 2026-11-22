const API_BASE_URL = "http://127.0.0.1:5000/api/telemetry";

// Retrieve telemetry history
export const getTelemetryHistory = async (deviceId = "") => {
  const url = new URL(API_BASE_URL);

  if (deviceId) {
    url.searchParams.append("deviceId", deviceId);
  }

  const response = await fetch(url);

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Failed to fetch telemetry history"
    );
  }

  return result.data;
};