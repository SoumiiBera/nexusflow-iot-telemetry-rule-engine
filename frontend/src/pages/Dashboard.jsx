import { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import { getDashboardSummary } from '../services/dashboardService'
import './Dashboard.css'

function Dashboard() {
  const [summary, setSummary] = useState({
    totalDevices: '--',
    activeDevices: '--',
    totalAlerts: '--',
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const data = await getDashboardSummary()
        setSummary(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  return (
    <main className="dashboard-content" id="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Monitor your IoT devices and system activities.</p>
        </div>
        <span className="dashboard-date">NexusFlow Monitoring</span>
      </div>

      {error && (
        <p role="alert" className="dashboard-error">
          {error}
        </p>
      )}

      <section className="dashboard-cards">
        <DashboardCard
          title="Total Devices"
          value={loading ? '...' : summary.totalDevices}
          icon="▣"
          description="Registered IoT devices"
        />

        <DashboardCard
          title="Active Devices"
          value={loading ? '...' : summary.activeDevices}
          icon="◉"
          description="Devices with Active status"
        />

        <DashboardCard
          title="Total Alerts"
          value={loading ? '...' : summary.totalAlerts}
          icon="⚠"
          description="All generated system alerts"
        />
      </section>

      <section className="dashboard-welcome">
        <h2>Welcome to NexusFlow</h2>
        <p>
          Your centralized platform for IoT device management,
          telemetry monitoring and rule-based alert generation.
        </p>
      </section>
    </main>
  )
}

export default Dashboard
