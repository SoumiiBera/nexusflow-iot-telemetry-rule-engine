import { useEffect, useState } from "react";
import {
  getAlerts,
  updateAlertStatus
} from "../services/alertService";
import "./Alerts.css";

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAlerts();
      setAlerts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (alertId, status) => {
  try {
    setError("");

    await updateAlertStatus(alertId, status);

    await fetchAlerts();
  } catch (err) {
    setError(err.message);
  }
};

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <main className="alerts-page">
      <div className="alerts-header">
        <div>
          <h1>Alerts Management</h1>
          <p>Monitor and manage automated IoT alerts.</p>
        </div>

        <button onClick={fetchAlerts} className="refresh-btn">
          Refresh Alerts
        </button>
      </div>

      <section className="alerts-container">
        <h2>Generated Alerts ({alerts.length})</h2>

        {loading && <p>Loading alerts...</p>}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && alerts.length === 0 && (
          <p className="empty-message">No alerts found.</p>
        )}

        {!loading && !error && alerts.length > 0 && (
          <div className="alerts-table-wrapper">
            <table className="alerts-table">
              <thead>
                <tr>
                  <th>Alert ID</th>
                  <th>Device ID</th>
                  <th>Rule Name</th>
                  <th>Condition</th>
                  <th>Severity</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {alerts.map((alert) => (
                  <tr key={alert.alertId}>
                    <td>{alert.alertId}</td>
                    <td>{alert.deviceId}</td>
                    <td>{alert.ruleName}</td>
                    <td>
                      {alert.metric}: {alert.value} / {alert.threshold}
                    </td>
                    <td>{alert.severity}</td>
                    <td>{alert.status}</td>
                    <td>
                      {new Date(alert.timestamp).toLocaleString()}
                    </td>
                    <td>
                      {alert.status === "Active" && (
                        <button
                          className="acknowledge-btn"
                          onClick={() =>
                           handleStatusUpdate(alert.alertId, "Acknowledged")
                          }
                         >
                           Acknowledge
                         </button>
                        )}

                        {alert.status !== "Resolved" && (
                          <button
                            className="resolve-btn"
                            onClick={() =>
                              handleStatusUpdate(alert.alertId, "Resolved")
                            }
                          >
                            Resolve
                         </button>
                        )}

                        {alert.status === "Resolved" && "Completed"}
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default Alerts;