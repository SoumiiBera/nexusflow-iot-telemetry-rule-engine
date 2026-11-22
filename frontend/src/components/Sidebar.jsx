import './Sidebar.css'

function Sidebar({ activePage, onNavigate }) {
  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: '▦' },
    { id: 'Devices', label: 'Devices', icon: '▣' },
    { id: 'Telemetry', label: 'Telemetry', icon: '⌁' },
    { id: 'Rules', label: 'Rules', icon: '⚙' },
    { id: 'Alerts', label: 'Alerts', icon: '♧' },
  ]

  return (
    <aside className="sidebar">
      <p className="sidebar-heading">MAIN MENU</p>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id.toLowerCase()}`}
            className={`sidebar-link ${activePage === item.id ? 'active' : ''}`}
            onClick={(event) => {
              event.preventDefault()

              if (['Dashboard', 'Devices', 'Telemetry', 'Rules', 'Alerts'].includes(item.id)) {
                onNavigate(item.id)
              }
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <span className="footer-indicator"></span>
        NexusFlow v1.0
      </div>
    </aside>
  )
}

export default Sidebar