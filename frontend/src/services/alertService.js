const API_BASE_URL = "http://127.0.0.1:5000/api/alerts";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Failed to fetch alerts");
  }

  return result;
};

// Retrieve all alerts
export const getAlerts = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await handleResponse(response);

  return result.data;
};

// Update alert status
export const updateAlertStatus = async (alertId, status) => {
  const response = await fetch(
    `${API_BASE_URL}/${encodeURIComponent(alertId)}/status`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  return handleResponse(response);
};