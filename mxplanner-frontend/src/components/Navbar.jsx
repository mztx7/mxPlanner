export default function Navbar({ user, counts, onLogout }) {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <div>
          <p className="section-kicker">mxPlanner</p>
          <h1>Witaj, {user.name}</h1>
          <span className="topbar-subtitle">
            {user.email} | {counts.all} wszystkich zadań
          </span>
        </div>

        <div className="topbar-meta">
          <div className="summary-card">
            <strong>{counts.todo}</strong>
            <span>Do zrobienia</span>
          </div>
          <div className="summary-card">
            <strong>{counts.progress}</strong>
            <span>W trakcie</span>
          </div>
          <div className="summary-card">
            <strong>{counts.done}</strong>
            <span>Wykonane</span>
          </div>
          <button type="button" className="ghost-button" onClick={onLogout}>
            Wyloguj
          </button>
        </div>
      </div>
    </header>
  )
}
