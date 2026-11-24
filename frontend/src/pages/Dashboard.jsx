import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import { getDashboardSummary } from '../services/dashboardService'
import './Dashboard.css'

function Dashboard() {
  const [summary, setSummary] = useState({
    totalDevices: 0,
    activeDevices: 0,
    totalAlerts: 0,
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary()

        setSummary({
          totalDevices: Number(data.totalDevices) || 0,
          activeDevices: Number(data.activeDevices) || 0,
          totalAlerts: Number(data.totalAlerts) || 0,
        })
      } catch (err) {
        setError(err.message || 'Unable to load dashboard data.')
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  const inactiveDevices = Math.max(
    summary.totalDevices - summary.activeDevices,
    0
  )

  const activePercentage = summary.totalDevices > 0
    ? Math.min(
        Math.round((summary.activeDevices / summary.totalDevices) * 100),
        100
      )
    : 0

  return (
    <main className="dashboard-content" id="dashboard">

      <div className="dashboard-header">
        <div>
          <div className="dashboard-eyebrow">
            <span className="eyebrow-line"></span>
            COMMAND CENTER
          </div>

          <h1>Dashboard <span>Overview</span></h1>

          <p>Your IoT ecosystem, brought into focus.</p>
        </div>

        <div className={`dashboard-live-badge ${error ? 'connection-error' : ''}`}>
          <span className="live-badge-dot"></span>
          {loading ? 'CONNECTING...' : error ? 'CONNECTION ISSUE' : 'DATABASE CONNECTED'}
       </div>
      </div>

      {error && (
        <div role="alert" className="dashboard-error">
          <span>!</span>
          {error}
        </div>
      )}

      <section className="dashboard-hero">
        <div className="hero-content">
          <div className="hero-tag">
            <span>✦</span> INTELLIGENT MONITORING
          </div>

          <h2>
            See Every Signal.<br />
            <span>Understand Every Change.</span>
          </h2>

          <p>
            A centralized view of your connected devices,
            telemetry infrastructure and rule-based alert system.
          </p>

          <div className="hero-bottom">
            <span className="hero-indicator"></span>
            Your monitoring workspace
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="visual-orbit orbit-one"></div>
          <div className="visual-orbit orbit-two"></div>
          <div className="visual-orbit orbit-three"></div>
          <div className="visual-core">
            <span>NF</span>
            <small>CORE</small>
          </div>
          <span className="orbit-node node-one"></span>
          <span className="orbit-node node-two"></span>
          <span className="orbit-node node-three"></span>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">AT A GLANCE</span>
            <h2>System Statistics</h2>
          </div>
          <span className="section-caption">DATABASE SUMMARY</span>
        </div>

        <div className="dashboard-cards">
          <DashboardCard
            title="Total Devices"
            value={loading ? '...' : summary.totalDevices}
            icon="▣"
            description="Registered IoT devices"
            accent="cyan"
          />

          <DashboardCard
            title="Active Devices"
            value={loading ? '...' : summary.activeDevices}
            icon="◉"
            description="Devices with Active status"
            accent="violet"
          />

          <DashboardCard
            title="Total Alerts"
            value={loading ? '...' : summary.totalAlerts}
            icon="⚠"
            description="All generated system alerts"
            accent="amber"
          />
        </div>
      </section>

      <section className="dashboard-bottom-grid">

        <div className="dashboard-panel health-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">DEVICE STATUS</span>
              <h2>Device Health</h2>
            </div>
            <span className="panel-icon">◉</span>
          </div>

          {loading ? (
            <div className="panel-loading">Loading device information...</div>
          ) : (
            <>
              <div className="health-summary">
                <div>
                  <strong>{activePercentage}%</strong>
                  <span>Active device ratio</span>
                </div>
                <div className="health-total">
                  <strong>{summary.totalDevices}</strong>
                  <span>Total devices</span>
                </div>
              </div>

              <div
                className="health-progress"
                role="progressbar"
                aria-label="Active device percentage"
                aria-valuenow={activePercentage}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="health-progress-fill"
                  style={{ width: `${activePercentage}%` }}
                ></div>
              </div>

              <div className="health-legend">
                <div>
                  <span className="legend-dot active-dot"></span>
                  <span>Active</span>
                  <strong>{summary.activeDevices}</strong>
                </div>

                <div>
                  <span className="legend-dot inactive-dot"></span>
                  <span>Inactive</span>
                  <strong>{inactiveDevices}</strong>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-panel alerts-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">RULE ENGINE</span>
              <h2>Alert Overview</h2>
            </div>
            <span className="panel-icon alert-panel-icon">⚠</span>
          </div>

          <div className="alert-overview-number">
            {loading ? '...' : summary.totalAlerts}
          </div>

          <p className="alert-overview-label">Total generated alerts</p>

          <div className="alert-panel-footer">
            <span className="alert-footer-icon">↗</span>
            <span>Rule-based alert generation</span>
          </div>
        </div>

      </section>

      <section className="dashboard-footer-banner">
        <div className="footer-banner-icon">✦</div>
        <div>
          <h3>One ecosystem. Complete visibility.</h3>
          <p>
            Manage devices, inspect telemetry records,
            configure rules and review generated alerts.
          </p>
        </div>
        <span className="footer-banner-mark">NEXUSFLOW</span>
      </section>

    </main>
  )
}

export default Dashboard
