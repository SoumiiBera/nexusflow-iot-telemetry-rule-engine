import { useEffect, useState } from "react";
import { getTelemetryHistory } from "../services/telemetryService";
import "./Telemetry.css";

const Telemetry = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTelemetry = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTelemetryHistory();
      setRecords(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="telemetry-page">
      <div className="telemetry-header">
        <div>
          <h1>Telemetry Monitoring</h1>
          <p>Monitor real-time IoT device readings and activity.</p>
        </div>

        <button onClick={fetchTelemetry} disabled={loading}>
          {loading ? "Loading..." : "Refresh Data"}
        </button>
      </div>

      {error && <div className="telemetry-error">{error}</div>}

      <div className="telemetry-table-container">
        <h2>Telemetry History</h2>

        {loading ? (
          <p className="telemetry-message">Loading telemetry data...</p>
        ) : records.length === 0 ? (
          <p className="telemetry-message">
            No telemetry records found.
          </p>
        ) : (
          <div className="telemetry-table-wrapper">
            <table className="telemetry-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Timestamp</th>
                </tr>
              </thead>

              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td>{record.deviceId}</td>
                    <td>{record.temperature ?? "—"} °C</td>
                    <td>{record.humidity ?? "—"} %</td>
                    <td>{formatDate(record.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Telemetry;