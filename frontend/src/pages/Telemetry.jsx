import { useCallback, useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { getTelemetryHistory } from "../services/telemetryService";
import "./Telemetry.css";

const formatDate = (timestamp) =>
  new Date(timestamp).toLocaleString();

const formatChartDate = (timestamp) =>
  new Date(timestamp).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
  });

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="telemetry-chart-tooltip">
      <span>{label}</span>
      <strong>
        {payload[0].value} {unit}
      </strong>
    </div>
  );
};

const TelemetryChart = ({ title, description, data, dataKey, color, unit }) => (
  <article className="telemetry-chart-card">
    <div className="telemetry-chart-heading">
      <div>
        <span className="telemetry-eyebrow">SENSOR ANALYTICS</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <span
        className="telemetry-chart-indicator"
        style={{ "--chart-accent": color }}
      >
        {unit}
      </span>
    </div>

    {data.length === 0 ? (
      <div className="telemetry-chart-empty">
        No valid readings available for this chart.
      </div>
    ) : (
      <div className="telemetry-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 12, right: 12, left: -18, bottom: 5 }}
          >
            <CartesianGrid
              stroke="rgba(139, 164, 200, 0.12)"
              strokeDasharray="4 5"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#8498b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              minTickGap={20}
            />

            <YAxis
              tick={{ fill: "#8498b8", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              width={45}
            />

            <Tooltip
              content={<CustomTooltip unit={unit} />}
              cursor={{ stroke: color, strokeDasharray: "4 4" }}
            />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color, strokeWidth: 2, stroke: "#142239" }}
              activeDot={{ r: 7, strokeWidth: 0 }}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    )}

    <div className="telemetry-chart-footer">
      <span>{data.length} valid readings</span>
      <span>{unit === "°C" ? "Temperature" : "Relative humidity"}</span>
    </div>
  </article>
);

const Telemetry = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTelemetry = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getTelemetryHistory();
      setRecords(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Failed to fetch telemetry data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadTelemetry = async () => {
      try {
        const data = await getTelemetryHistory();

        if (!cancelled) {
          setRecords(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Failed to fetch telemetry data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTelemetry();

    return () => {
      cancelled = true;
    };
  }, []);

  const validTemperatures = records
    .filter(
      (record) =>
        record.temperature !== null &&
        record.temperature !== undefined &&
        record.temperature !== ""
    )
    .map((record) => Number(record.temperature))
    .filter(Number.isFinite);

  const validHumidity = records
    .filter(
      (record) =>
        record.humidity !== null &&
        record.humidity !== undefined &&
        record.humidity !== ""
    )
    .map((record) => Number(record.humidity))
    .filter(Number.isFinite);

  const average = (values) =>
    values.length
      ? (
          values.reduce((sum, value) => sum + value, 0) / values.length
        ).toFixed(1)
      : "—";

  const sortedRecords = [...records].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const temperatureData = sortedRecords
    .filter(
      (record) =>
        record.temperature !== null &&
        record.temperature !== undefined &&
        record.temperature !== "" &&
        Number.isFinite(Number(record.temperature)) &&
        !Number.isNaN(new Date(record.timestamp).getTime())
    )
    .map((record) => ({
      date: formatChartDate(record.timestamp),
      temperature: Number(record.temperature),
      timestamp: record.timestamp,
    }));

  const humidityData = sortedRecords
    .filter(
      (record) =>
        record.humidity !== null &&
        record.humidity !== undefined &&
        record.humidity !== "" &&
        Number.isFinite(Number(record.humidity)) &&
        !Number.isNaN(new Date(record.timestamp).getTime())
    )
    .map((record) => ({
      date: formatChartDate(record.timestamp),
      humidity: Number(record.humidity),
      timestamp: record.timestamp,
    }));

  return (
    <main className="telemetry-page">
      <header className="telemetry-header">
        <div>
          <span className="telemetry-eyebrow">
            DATA INTELLIGENCE / MONITORING
          </span>
          <h1>Telemetry Monitoring</h1>
          <p>
            Explore device readings, environmental metrics and telemetry history.
          </p>
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
          <strong>
            {loading ? "—" : average(validTemperatures)}
            <small>{validTemperatures.length ? " °C" : ""}</small>
          </strong>
          <span className="metric-caption">Based on available readings</span>
          <span className="metric-symbol">℃</span>
        </article>

        <article className="telemetry-metric metric-blue">
          <span className="metric-label">AVG HUMIDITY</span>
          <strong>
            {loading ? "—" : average(validHumidity)}
            <small>{validHumidity.length ? " %" : ""}</small>
          </strong>
          <span className="metric-caption">Based on available readings</span>
          <span className="metric-symbol">％</span>
        </article>
      </section>

      <section className="telemetry-charts-section">
        <div className="telemetry-charts-intro">
          <div>
            <span className="telemetry-eyebrow">VISUAL ANALYTICS</span>
            <h2>Environmental Trends</h2>
            <p>Track temperature and humidity changes across recorded readings.</p>
          </div>

          <span className="telemetry-live-badge">
            <span />
            API DATA
          </span>
        </div>

        {loading ? (
          <div className="telemetry-chart-loading">
            Loading sensor analytics...
          </div>
        ) : (
          <div className="telemetry-charts-grid">
            <TelemetryChart
              title="Temperature Trend"
              description="Historical temperature readings"
              data={temperatureData}
              dataKey="temperature"
              color="#fb923c"
              unit="°C"
            />

            <TelemetryChart
              title="Humidity Trend"
              description="Historical humidity readings"
              data={humidityData}
              dataKey="humidity"
              color="#38d9ed"
              unit="%"
            />
          </div>
        )}
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
            <p>
              Device readings will appear here when telemetry data is available.
            </p>
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
                    <td>
                      <span className="telemetry-device-id">
                        {record.deviceId}
                      </span>
                    </td>

                    <td>
                      <span className="telemetry-reading temperature-reading">
                        {record.temperature ?? "—"}
                        {record.temperature != null ? " °C" : ""}
                      </span>
                    </td>

                    <td>
                      <span className="telemetry-reading humidity-reading">
                        {record.humidity ?? "—"}
                        {record.humidity != null ? " %" : ""}
                      </span>
                    </td>

                    <td className="telemetry-timestamp">
                      {formatDate(record.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <footer className="telemetry-footer">
        <span>NEXUSFLOW / TELEMETRY INTELLIGENCE</span>
        <span>Historical data view · Manual refresh</span>
      </footer>
    </main>
  );
};

export default Telemetry;