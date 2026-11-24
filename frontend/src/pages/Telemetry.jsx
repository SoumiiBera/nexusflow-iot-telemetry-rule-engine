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
    let cancelled = false;

    const loadTelemetry = async () => {
      try {
        const data = await getTelemetryHistory();
        if (!cancelled) setRecords(data);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadTelemetry();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (timestamp) =>
    new Date(timestamp).toLocaleString();

  const validTemperatures = records
    .filter((record) =>
      record.temperature !== null &&
      record.temperature !== undefined &&
      record.temperature !== ""
    )
    .map((record) => Number(record.temperature))
    .filter(Number.isFinite);

  const validHumidity = records
    .filter((record) =>
      record.humidity !== null &&
      record.humidity !== undefined &&
      record.humidity !== ""
    )
    .map((record) => Number(record.humidity))
    .filter(Number.isFinite);

  const average = (values) =>
    values.length
      ? (values.reduce((sum, value) => sum + value, 0) / values.length).toFixed(1)
      : "—";

  return (
    <main className="telemetry-page">
      <header className="telemetry-header">
        <div>
          <span className="telemetry-eyebrow">DATA INTELLIGENCE / MONITORING</span>
          <h1>Telemetry Monitoring</h1>
          <p>Explore device readings, environmental metrics and telemetry history.</p>
        </div>

        <button
          className="telemetry-refresh"
          onClick={fetchTelemetry}
          disabled={loading}
          type="button"
        >
          <span className="refresh-icon">↻</span>
          {loading ? "Loading..." : "Refresh Data"}
        </button>
      </header>

      {error && (
        <div className="telemetry-error" role="alert">
          {error}
        </div>
      )}

      <section className="telemetry-metrics">
        <article className="telemetry-metric metric-cyan">
          <span className="metric-label">TOTAL RECORDS</span>
          <strong>{loading ? "—" : records.length}</strong>
          <span className="metric-caption">Stored telemetry entries</span>
          <span className="metric-symbol">▤</span>
        </article>

        <article className="telemetry-metric metric-violet">
          <span className="metric-label">AVG TEMPERATURE</span>
          <strong>{loading ? "—" : average(validTemperatures)}<small>{validTemperatures.length ? " °C" : ""}</small></strong>
          <span className="metric-caption">Based on available readings</span>
          <span className="metric-symbol">℃</span>
        </article>

        <article className="telemetry-metric metric-blue">
          <span className="metric-label">AVG HUMIDITY</span>
          <strong>{loading ? "—" : average(validHumidity)}<small>{validHumidity.length ? " %" : ""}</small></strong>
          <span className="metric-caption">Based on available readings</span>
          <span className="metric-symbol">％</span>
        </article>
      </section>

      <section className="telemetry-table-container">
        <div className="telemetry-section-heading">
          <div>
            <span className="telemetry-eyebrow">DEVICE DATA</span>
            <h2>Telemetry History</h2>
            <p>Recorded sensor readings from registered devices.</p>
          </div>
          <span className="telemetry-record-count">
            {records.length} RECORDS
          </span>
        </div>

        {loading ? (
          <p className="telemetry-message">Loading telemetry data...</p>
        ) : records.length === 0 ? (
          <div className="telemetry-empty">
            <span className="telemetry-empty-icon">⌁</span>
            <h3>No telemetry records found</h3>
            <p>Device readings will appear here when telemetry data is available.</p>
          </div>
        ) : (
          <div className="telemetry-table-wrapper">
            <table className="telemetry-table">
              <thead>
                <tr>
                  <th>DEVICE ID</th>
                  <th>TEMPERATURE</th>
                  <th>HUMIDITY</th>
                  <th>TIMESTAMP</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record._id}>
                    <td><span className="telemetry-device-id">{record.deviceId}</span></td>
                    <td>
                      <span className="telemetry-reading temperature-reading">
                        {record.temperature ?? "—"}{record.temperature != null ? " °C" : ""}
                      </span>
                    </td>
                    <td>
                      <span className="telemetry-reading humidity-reading">
                        {record.humidity ?? "—"}{record.humidity != null ? " %" : ""}
                      </span>
                    </td>
                    <td className="telemetry-timestamp">{formatDate(record.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="telemetry-footer">
        <span> NEXUSFLOW / TELEMETRY INTELLIGENCE</span>
        <span>Historical data view · Manual refresh</span>
      </footer>
    </main>
  );
};

export default Telemetry;
