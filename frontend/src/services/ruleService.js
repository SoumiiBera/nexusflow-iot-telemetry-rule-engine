const API_BASE_URL = "http://127.0.0.1:5000/api/rules";

const handleResponse = async (response) => {
  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};

// Retrieve all rules
export const getRules = async () => {
  const response = await fetch(API_BASE_URL);
  const result = await handleResponse(response);

  return result.data;
};

// Create a new rule
export const createRule = async (ruleData) => {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ruleData),
  });

  return handleResponse(response);
};

// Update an existing rule
export const updateRule = async (ruleId, updates) => {
  const response = await fetch(
    `${API_BASE_URL}/${encodeURIComponent(ruleId)}`,
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

// Delete a rule
export const deleteRule = async (ruleId) => {
  const response = await fetch(
    `${API_BASE_URL}/${encodeURIComponent(ruleId)}`,
    {
      method: "DELETE",
    }
  );

  return handleResponse(response);
};