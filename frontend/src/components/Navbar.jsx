import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">
          <span>N</span>
        </span>

        <div className="brand-copy">
          <span className="brand-name">NEXUS<span>FLOW</span></span>
          <span className="brand-caption">INTELLIGENT IOT PLATFORM</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="system-status">
          <span className="status-dot"></span>
          <span>System Online</span>
        </div>

        <div className="navbar-divider"></div>

        <div className="profile">
          <span className="profile-avatar">S</span>
          <div className="profile-details">
            <span className="profile-name">Admin</span>
            <span className="profile-role">Administrator</span>
          </div>
          <span className="profile-chevron">⌄</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
