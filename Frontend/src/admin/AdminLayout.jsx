import { NavLink, Outlet } from 'react-router-dom'
import { useAdminSession } from './useAdminSession'
import './admin.css'

const navItems = [
  { to: '/dashboard', end: true, label: 'Overview', meta: 'Summary and quick access' },
  { to: '/dashboard/events', label: 'Events', meta: 'Schedule and publish events' },
  { to: '/dashboard/mass-times', label: 'Mass Times', meta: 'Manage weekly worship times' },
  { to: '/dashboard/registrations', label: 'Registrations', meta: 'Review parish records' },
  { to: '/dashboard/contact-messages', label: 'Contact', meta: 'Read website enquiries' },
]

export default function AdminLayout() {
  const { user, isLoading, isLoggingOut, handleLogout } = useAdminSession()

  if (isLoading) {
    return (
      <section className="admin-page">
        <div className="container admin-loading">Loading the admin workspace...</div>
      </section>
    )
  }

  return (
    <section className="admin-page">
      <div className="container admin-shell">
        <header className="admin-topbar">
          <div className="admin-brand">
            <p className="admin-kicker">Cathedral Admin</p>
            <h1>Website Management</h1>
          </div>

          <div className="admin-topbar-right">
            <nav className="admin-topnav">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `admin-topnav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="admin-user-inline">
              <div className="admin-user-meta">
                <span>{user?.name}</span>
                <small>{user?.email}</small>
              </div>
              <button className="btn-outline admin-logout-inline" type="button" onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Signing Out...' : 'Logout'}
              </button>
            </div>
          </div>
        </header>

        <main className="admin-main">
          <Outlet context={{ user }} />
        </main>
      </div>
    </section>
  )
}
