import { useCallback, useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import { getDashboardSummary } from '../services/dashboardService'
import './Dashboard.css'

const initialSummary = {
  totalDevices: 0,
  activeDevices: 0,
  totalAlerts: 0,
  deviceHealth: {
    active: 0,
    inactive: 0,
    recentlySeen: 0,
  },
  alertIntelligence: {
    total: 0,
    active: 0,
    acknowledged: 0,
    resolved: 0,
    critical: 0,
    warning: 0,
  },
  telemetry: {
    totalReadings: 0,
    latest: null,
    recentReadings: [],
  },
  recentActivity: [],
}

function Dashboard() {
  const [summary, setSummary] = useState(initialSummary)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchSummary = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true)
    }

    setError('')

    try {
      const data = await getDashboardSummary()
      setError('')

      setSummary({
        ...initialSummary,
        ...data,
        deviceHealth: {
          ...initialSummary.deviceHealth,
          ...(data.deviceHealth || {}),
        },
        alertIntelligence: {
          ...initialSummary.alertIntelligence,
          ...(data.alertIntelligence || {}),
        },
        telemetry: {
          ...initialSummary.telemetry,
          ...(data.telemetry || {}),
        },
        recentActivity: Array.isArray(data.recentActivity)
          ? data.recentActivity
          : [],
      })

      setLastUpdated(new Date())
    } catch (err) {
      setError(err.message || 'Unable to load dashboard data.')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    Promise.resolve().then(() => {
      if (!cancelled) {
        fetchSummary()
      }
    })

    return () => {
      cancelled = true
    }
  }, [fetchSummary])

  const deviceHealth = summary.deviceHealth
  const alerts = summary.alertIntelligence
  const telemetry = summary.telemetry

  const totalDevices = Number(summary.totalDevices) || 0
  const activeDevices = Number(deviceHealth.active) || 0
  const inactiveDevices = Number(deviceHealth.inactive) || 0

  const activePercentage = totalDevices > 0
    ? Math.min(Math.round((activeDevices / totalDevices) * 100), 100)
    : 0

  const latestReadings = telemetry.latest?.readings || telemetry.latest || {}

  const formatDate = (value) => {
    if (!value) return 'Time unavailable'

    const date = new Date(value)

    if (Number.isNaN(date.getTime())) return 'Time unavailable'

    return date.toLocaleString()
  }

  const formatMetric = (value, unit = '') => {
    if (value === undefined || value === null) return '--'
    return `${value}${unit}`
  }

  const getActivityIcon = (type) => {
    if (type === 'alert') return '⚠'
    if (type === 'telemetry') return '⌁'
    return '◉'
  }

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

        <div className="dashboard-header-actions">
          <div className={`dashboard-live-badge ${error ? 'connection-error' : ''}`}>
            <span className="live-badge-dot"></span>
            {loading ? 'CONNECTING...' : error ? 'CONNECTION ISSUE' : 'DATA LOADED'}
          </div>

          <button
            type="button"
            className="dashboard-refresh-button"
            onClick={() => fetchSummary(true)}
            disabled={loading || refreshing}
          >
            <span className={refreshing ? 'refresh-spinning' : ''}>↻</span>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="dashboard-update-info">
        <span className="update-indicator"></span>
        {lastUpdated
          ? `Last updated: ${formatDate(lastUpdated)}`
          : 'Waiting for dashboard data...'}
      </div>

      {error && (
        <div role="alert" className="dashboard-error">
          <span>!</span>
          <div>
            <strong>Dashboard data unavailable</strong>
            <p>{error}</p>
          </div>
          <button
            type="button"
            onClick={() => fetchSummary(true)}
            disabled={refreshing}
          >
            Retry
          </button>
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
            value={loading ? '...' : totalDevices}
            icon="▣"
            description="Registered IoT devices"
            accent="cyan"
          />

          <DashboardCard
            title="Active Devices"
            value={loading ? '...' : activeDevices}
            icon="◉"
            description="Devices with Active status"
            accent="violet"
          />

          <DashboardCard
            title="Total Alerts"
            value={loading ? '...' : alerts.total}
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
                  <strong>{totalDevices}</strong>
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
                  <strong>{activeDevices}</strong>
                </div>

                <div>
                  <span className="legend-dot inactive-dot"></span>
                  <span>Inactive</span>
                  <strong>{inactiveDevices}</strong>
                </div>
              </div>

              <div className="recently-seen-row">
                <span>Recently seen (24h)</span>
                <strong>{Number(deviceHealth.recentlySeen) || 0}</strong>
              </div>
            </>
          )}
        </div>

        <div className="dashboard-panel alerts-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">RULE ENGINE</span>
              <h2>Alert Intelligence</h2>
            </div>
            <span className="panel-icon alert-panel-icon">⚠</span>
          </div>

          {loading ? (
            <div className="panel-loading">Loading alert information...</div>
          ) : (
            <>
              <div className="alert-overview-number">
                {alerts.total}
              </div>

              <p className="alert-overview-label">Total generated alerts</p>

              <div className="alert-breakdown">
                <div>
                  <span className="alert-status-dot critical-dot"></span>
                  <span>Critical</span>
                  <strong>{alerts.critical}</strong>
                </div>
                <div>
                  <span className="alert-status-dot warning-dot"></span>
                  <span>Warning</span>
                  <strong>{alerts.warning}</strong>
                </div>
                <div>
                  <span className="alert-status-dot active-dot"></span>
                  <span>Active</span>
                  <strong>{alerts.active}</strong>
                </div>
                <div>
                  <span className="alert-status-dot resolved-dot"></span>
                  <span>Resolved</span>
                  <strong>{alerts.resolved}</strong>
                </div>
                <div>
                  <span className="alert-status-dot acknowledged-dot"></span>
                  <span>Acknowledged</span>
                  <strong>{alerts.acknowledged}</strong>
                </div>
              </div>

              <div className="alert-panel-footer">
                <span className="alert-footer-icon">↗</span>
                <span>Rule-based alert generation</span>
              </div>
            </>
          )}
        </div>

      </section>

      <section className="dashboard-section telemetry-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">SENSOR INTELLIGENCE</span>
            <h2>Telemetry Overview</h2>
          </div>
          <span className="section-caption">LATEST DATA SNAPSHOT</span>
        </div>

        <div className="telemetry-overview-grid">
          <div className="dashboard-panel telemetry-stat">
            <span className="telemetry-stat-label">TOTAL READINGS</span>
            <strong>{loading ? '...' : Number(telemetry.totalReadings) || 0}</strong>
            <span className="telemetry-stat-caption">Recorded telemetry entries</span>
          </div>

          <div className="dashboard-panel telemetry-stat">
            <span className="telemetry-stat-label">LATEST TEMPERATURE</span>
            <strong>
              {loading ? '...' : formatMetric(latestReadings.temperature, '°C')}
            </strong>
            <span className="telemetry-stat-caption">Latest available sensor value</span>
          </div>

          <div className="dashboard-panel telemetry-stat">
            <span className="telemetry-stat-label">LATEST HUMIDITY</span>
            <strong>
              {loading ? '...' : formatMetric(latestReadings.humidity, '%')}
            </strong>
            <span className="telemetry-stat-caption">Latest available sensor value</span>
          </div>
        </div>
      </section>

      <section className="dashboard-panel activity-panel">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">SYSTEM MONITOR</span>
            <h2>Recent Activity</h2>
          </div>
          <span className="section-caption">LATEST EVENTS</span>
        </div>

        {loading ? (
          <div className="panel-loading">Loading recent activity...</div>
        ) : summary.recentActivity.length === 0 ? (
          <div className="activity-empty">
            <span>⌁</span>
            <strong>No recent activity</strong>
            <p>New alerts and telemetry events will appear here.</p>
          </div>
        ) : (
          <div className="activity-list">
            {summary.recentActivity.map((activity, index) => (
              <article
                className="activity-item"
                key={activity.id || `${activity.type}-${index}`}
              >
                <span className={`activity-icon activity-${activity.type || 'default'}`}>
                  {getActivityIcon(activity.type)}
                </span>

                <div className="activity-details">
                  <strong>{activity.title || 'System activity'}</strong>
                  <p>{activity.description || 'A new system event was recorded.'}</p>
                  {activity.deviceId && (
                    <span className="activity-device">
                      Device: {activity.deviceId}
                    </span>
                  )}
                </div>

                <div className="activity-meta">
                  {activity.severity && (
                    <span className={`activity-severity severity-${String(activity.severity).toLowerCase()}`}>
                      {activity.severity}
                    </span>
                  )}
                  <time>{formatDate(activity.timestamp)}</time>
                </div>
              </article>
            ))}
          </div>
        )}
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
