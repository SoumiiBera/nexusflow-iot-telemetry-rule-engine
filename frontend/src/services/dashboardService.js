const API_BASE_URL = "http://127.0.0.1:5000";

export const getDashboardSummary = async () => {
  const response = await fetch(`${API_BASE_URL}/api/dashboard/summary`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard summary");
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error("Dashboard API returned an error");
  }

  return result.data;
};
