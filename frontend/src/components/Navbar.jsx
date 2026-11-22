import './Navbar.css'

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">N</span>
        <span>NexusFlow</span>
      </div>

      <div className="navbar-right">
        <span className="system-status">
          <span className="status-dot"></span>
          System Online
        </span>

        <div className="profile">
          <span className="profile-avatar">S</span>
          <span>Admin</span>
        </div>
      </div>
    </header>
  )
}

export default Navbar
