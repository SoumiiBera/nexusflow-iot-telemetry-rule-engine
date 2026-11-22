import { useEffect, useState } from 'react'
import { getDevices, createDevice } from '../services/deviceService'
import './Devices.css'

function Devices() {
  const [devices, setDevices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')

  const [formData, setFormData] = useState({
    deviceId: '',
    name: '',
    deviceType: 'Sensor',
    location: '',
    status: 'Active',
  })

  const fetchDevices = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await getDevices()
      setDevices(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDevices()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      setSaving(true)
      setError('')
      setSuccess('')

      await createDevice(formData)

      setSuccess('Device registered successfully!')

      setFormData({
        deviceId: '',
        name: '',
        deviceType: 'Sensor',
        location: '',
        status: 'Active',
      })

      setShowForm(false)
      await fetchDevices()
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="devices-content" id="devices">
      <div className="devices-header">
        <div>
          <h1>Device Management</h1>
          <p>Manage and monitor your registered IoT devices.</p>
        </div>

        <button
          className="add-device-btn"
          type="button"
          onClick={() => {
            setShowForm(!showForm)
            setError('')
            setSuccess('')
          }}
        >
          {showForm ? 'Cancel' : '+ Add Device'}
        </button>
      </div>

      {success && (
        <p className="devices-success" role="status">{success}</p>
      )}

      {error && (
        <p className="devices-error" role="alert">{error}</p>
      )}

      {showForm && (
        <section className="devices-panel device-form-panel">
          <div className="devices-panel-header">
            <div>
              <h2>Register New Device</h2>
              <p>Enter the IoT device information below.</p>
            </div>
          </div>

          <form className="device-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="deviceId">Device ID *</label>
              <input
                id="deviceId"
                name="deviceId"
                value={formData.deviceId}
                onChange={handleChange}
                placeholder="e.g. DEVICE-001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Device Name *</label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Room Temperature Sensor"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deviceType">Device Type</label>
              <input
                id="deviceType"
                name="deviceType"
                value={formData.deviceType}
                onChange={handleChange}
                placeholder="e.g. Sensor"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Server Room"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="add-device-btn"
                disabled={saving}
              >
                {saving ? 'Registering...' : 'Register Device'}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="devices-panel">
        <div className="devices-panel-header">
          <div>
            <h2>Registered Devices</h2>
            <p>{devices.length} devices found</p>
          </div>

          <button
            className="refresh-btn"
            type="button"
            onClick={fetchDevices}
            disabled={loading}
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="devices-message">Loading devices...</p>
        ) : devices.length === 0 ? (
          <div className="devices-empty">
            <h3>No devices registered yet</h3>
            <p>Register your first IoT device to get started.</p>
          </div>
        ) : (
          <div className="devices-table-wrapper">
            <table className="devices-table">
              <thead>
                <tr>
                  <th>Device ID</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {devices.map((device) => (
                  <tr key={device._id}>
                    <td>{device.deviceId}</td>
                    <td>{device.name}</td>
                    <td>{device.deviceType}</td>
                    <td>{device.location || 'Not specified'}</td>
                    <td>
                      <span className={`device-status ${device.status?.toLowerCase()}`}>
                        {device.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}

export default Devices
