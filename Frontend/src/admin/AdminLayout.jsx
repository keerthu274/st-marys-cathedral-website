import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAdminSession } from './useAdminSession'
import './admin.css'

const navItems = [
  { to: '/dashboard', end: true, label: 'Overview', meta: 'Summary and quick access' },
  { to: '/dashboard/events', label: 'Events', meta: 'Schedule and publish events' },
  { to: '/dashboard/mass-times', label: 'Mass Times', meta: 'Manage weekly worship times', mainAdminOnly: true },
  { to: '/dashboard/newsletters', label: 'Newsletters', meta: 'Upload weekly PDFs', mainAdminOnly: true },
  { to: '/dashboard/registrations', label: 'Registrations', meta: 'Review parish records', mainAdminOnly: true },
  { to: '/dashboard/contact-messages', label: 'Contact', meta: 'Read website enquiries' },
  { to: '/dashboard/groups', label: 'Groups', meta: 'Manage groups and admins' },
  { to: '/dashboard/parish-council', label: 'Parish Council', meta: 'Manage council members', mainAdminOnly: true },
]

export default function AdminLayout() {
  const location = useLocation()
  const { user, isLoading, isLoggingOut, refreshUser, handleLogout } = useAdminSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setIsMenuOpen(false)
  }, [location.pathname])

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

          <button
            className="admin-menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="admin-mobile-menu"
            onClick={() => setIsMenuOpen(current => !current)}
          >
            <span className="admin-menu-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
          </button>

          <div id="admin-mobile-menu" className={`admin-topbar-right ${isMenuOpen ? 'is-open' : ''}`}>
            <nav className="admin-topnav">
              {navItems.map(item => (
                item.mainAdminOnly && !user?.is_main_admin ? null : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `admin-topnav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
                )
              ))}
            </nav>

            <div className="admin-user-inline">
              <div className="admin-user-meta">
                <span>{user?.name}</span>
                <small>{user?.email}</small>
              </div>
              <NavLink className={({ isActive }) => `btn-outline admin-profile-link ${isActive ? 'active' : ''}`} to="/dashboard/profile">
                Profile
              </NavLink>
              <button className="btn-outline admin-logout-inline" type="button" onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Signing Out...' : 'Logout'}
              </button>
            </div>
          </div>
        </header>

        <main className="admin-main">
          <Outlet context={{ user, refreshUser }} />
        </main>
      </div>
    </section>
  )
}
