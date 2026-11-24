import { useEffect, useState } from "react";
import { getRules, createRule, deleteRule } from "../services/ruleService";
import "./Rules.css";

const initialForm = {
  ruleId: "",
  ruleName: "",
  deviceId: "",
  metric: "temperature",
  operator: ">",
  threshold: "",
  severity: "Warning",
  enabled: true,
};

function Rules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState(initialForm);

  const fetchRules = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getRules();
      setRules(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  let cancelled = false;

  const loadRules = async () => {
    try {
      const data = await getRules();

      if (!cancelled) {
        setRules(data);
      }
    } catch (err) {
      if (!cancelled) {
        setError(err.message);
      }
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  };

  loadRules();

  return () => {
    cancelled = true;
  };
}, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await createRule({
        ...formData,
        threshold: Number(formData.threshold),
      });

      setSuccess("Rule created successfully!");
      setFormData(initialForm);
      setShowForm(false);

      await fetchRules();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (ruleId) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete rule ${ruleId}?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await deleteRule(ruleId);
      setSuccess("Rule deleted successfully!");

      await fetchRules();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="rules-page">
      <div className="rules-header">
        <div>
          <h1>Rules Management</h1>
          <p>Configure and manage automated IoT monitoring rules.</p>
        </div>

        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Close Form" : "+ Create Rule"}
        </button>
      </div>

      {error && <div className="rules-error">{error}</div>}
      {success && <div className="rules-success">{success}</div>}

      {showForm && (
        <div className="rule-form-container">
          <h2>Create New Rule</h2>

          <form onSubmit={handleSubmit} className="rule-form">
            <div className="rule-form-grid">
              <label>
                Rule ID
                <input
                  name="ruleId"
                  value={formData.ruleId}
                  onChange={handleChange}
                  placeholder="RULE-001"
                  required
                />
              </label>

              <label>
                Rule Name
                <input
                  name="ruleName"
                  value={formData.ruleName}
                  onChange={handleChange}
                  placeholder="High Temperature Alert"
                  required
                />
              </label>

              <label>
                Device ID
                <input
                  name="deviceId"
                  value={formData.deviceId}
                  onChange={handleChange}
                  placeholder="DEVICE_001"
                  required
                />
              </label>

              <label>
                Metric
                <select
                  name="metric"
                  value={formData.metric}
                  onChange={handleChange}
                >
                  <option value="temperature">Temperature</option>
                  <option value="humidity">Humidity</option>
                </select>
              </label>

              <label>
                Operator
                <select
                  name="operator"
                  value={formData.operator}
                  onChange={handleChange}
                >
                  <option value=">">Greater than (&gt;)</option>
                  <option value="<">Less than (&lt;)</option>
                  <option value="==">Equal to (==)</option>
                  <option value=">=">Greater than or equal (&gt;=)</option>
                  <option value="<=">Less than or equal (&lt;=)</option>
                </select>
              </label>

              <label>
                Threshold
                <input
                  type="number"
                  name="threshold"
                  value={formData.threshold}
                  onChange={handleChange}
                  placeholder="40"
                  required
                />
              </label>

              <label>
                Severity
                <select
                  name="severity"
                  value={formData.severity}
                  onChange={handleChange}
                >
                  <option value="Warning">Warning</option>
                  <option value="Critical">Critical</option>
                </select>
              </label>

              <label>
                Status
                <select
                  name="enabled"
                  value={String(formData.enabled)}
                  onChange={(event) =>
                    setFormData((previous) => ({
                      ...previous,
                      enabled: event.target.value === "true",
                    }))
                  }
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </select>
              </label>
            </div>

            <button type="submit" disabled={saving}>
              {saving ? "Creating..." : "Save Rule"}
            </button>
          </form>
        </div>
      )}

      <div className="rules-table-container">
        <h2>Configured Rules ({rules.length})</h2>

        {loading ? (
          <p className="rules-message">Loading rules...</p>
        ) : rules.length === 0 ? (
          <p className="rules-message">No rules found. Create your first rule.</p>
        ) : (
          <div className="rules-table-wrapper">
            <table className="rules-table">
              <thead>
                <tr>
                  <th>Rule ID</th>
                  <th>Rule Name</th>
                  <th>Device ID</th>
                  <th>Condition</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {rules.map((rule) => (
                  <tr key={rule._id}>
                    <td>{rule.ruleId}</td>
                    <td>{rule.ruleName}</td>
                    <td>{rule.deviceId}</td>
                    <td>
                      {rule.metric} {rule.operator} {rule.threshold}
                    </td>
                    <td>{rule.severity}</td>
                    <td>{rule.enabled ? "Enabled" : "Disabled"}</td>
                    <td>
                      <button
                        className="rule-delete-button"
                        onClick={() => handleDelete(rule.ruleId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rules;