import './DashboardCard.css'

function DashboardCard({ title, value, icon, description, accent = 'cyan' }) {
  return (
    <article className={`dashboard-card card-${accent}`}>
      <div className="card-top">
        <span className="card-title">{title}</span>
        <span className="card-icon">{icon}</span>
      </div>

      <h2 className="card-value">{value}</h2>

      <p className="card-description">{description}</p>

      <div className="card-decoration" aria-hidden="true"></div>
    </article>
  )
}

export default DashboardCard
