import './Sidebar.css'

function Sidebar({ activePage, onNavigate }) {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: '◫' },
    { id: 'Devices', label: 'Devices', icon: '▣' },
    { id: 'Telemetry', label: 'Telemetry', icon: '⌁' },
    { id: 'Rules', label: 'Rules', icon: '⚙' },
    { id: 'Alerts', label: 'Alerts', icon: '♧' },
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <p className="sidebar-heading">WORKSPACE</p>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id.toLowerCase()}`}
              className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
              aria-current={activePage === item.id ? 'page' : undefined}
              onClick={(event) => {
                event.preventDefault()
                onNavigate(item.id)
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
              {activePage === item.id && (
                <span className="active-indicator"></span>
              )}
            </a>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-system-card">
          <div className="sidebar-system-top">
            <span className="footer-indicator"></span>
            <span>System Operational</span>
          </div>
          <p>Monitoring your IoT ecosystem</p>
          <span className="sidebar-version">NEXUSFLOW · V1.0</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
