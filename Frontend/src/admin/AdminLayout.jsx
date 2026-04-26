import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import FeedbackDialog from '../components/FeedbackDialog'
import { titleCaseWords } from '../lib/textFormat'
import { useAdminSession } from './useAdminSession'
import './admin.css'

const navItems = [
  { to: '/dashboard', end: true, label: 'Overview', meta: 'Summary and quick access' },
  { to: '/dashboard/events', label: 'Events', meta: 'Schedule and publish events' },
  { to: '/dashboard/my-group', label: 'My Group', meta: 'Group admin workspace', groupAdminOnly: true },
  { to: '/dashboard/mass-times', label: 'Mass Times', meta: 'Manage weekly worship times', mainAdminOnly: true },
  { to: '/dashboard/news', label: 'News', meta: 'Publish news and announcements', mainAdminOnly: true },
  { to: '/dashboard/newsletters', label: 'Newsletters', meta: 'Upload weekly PDFs', mainAdminOnly: true },
  { to: '/dashboard/registrations', label: 'Registrations', meta: 'Review parish records', mainAdminOnly: true },
  { to: '/dashboard/contact-messages', label: 'Contact', meta: 'Read website enquiries' },
  { to: '/dashboard/groups', label: 'Groups', meta: 'Manage groups and admins' },
  { to: '/dashboard/accounts', label: 'Admins', meta: 'Review admin account assignments', mainAdminOnly: true },
  { to: '/dashboard/parish-council', label: 'Parish Council', meta: 'Manage council members', mainAdminOnly: true },
]

export default function AdminLayout() {
  const { user, isLoading, isLoggingOut, refreshUser, handleLogout } = useAdminSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false)

  function requestLogout() {
    setIsMenuOpen(false)
    setIsLogoutConfirmOpen(true)
  }

  function confirmLogout() {
    setIsLogoutConfirmOpen(false)
    handleLogout()
  }

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
          <div className="admin-topbar-head">
            <div className="admin-brand">
              <p className="admin-kicker">Cathedral Admin</p>
              <h1>Website Management</h1>
            </div>

            <div className="admin-user-inline">
              <div className="admin-user-meta">
                <span>{user?.name ? titleCaseWords(user.name) : 'Admin User'}</span>
                <small>{user?.email || 'No email available'}</small>
              </div>
              <NavLink className={({ isActive }) => `btn-outline admin-profile-link ${isActive ? 'active' : ''}`} to="/dashboard/profile" onClick={() => setIsMenuOpen(false)}>
                Profile
              </NavLink>
              <button className="btn-outline admin-logout-inline" type="button" onClick={requestLogout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Signing Out...' : 'Logout'}
              </button>
            </div>
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
                item.mainAdminOnly && !user?.is_main_admin ? null : item.groupAdminOnly && user?.is_main_admin ? null : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) => `admin-topnav-link ${isActive ? 'active' : ''}`}
                >
                  {item.label}
                </NavLink>
                )
              ))}
            </nav>
          </div>
        </header>

        <main className="admin-main">
          <Outlet context={{ user, refreshUser, isLoggingOut, requestLogout }} />
        </main>

        <FeedbackDialog
          open={isLogoutConfirmOpen}
          tone="neutral"
          variant="confirm"
          title="Logout of admin?"
          message="You will need to sign in again before making more website changes."
          confirmLabel={isLoggingOut ? 'Signing Out...' : 'Logout'}
          cancelLabel="Stay signed in"
          onClose={() => setIsLogoutConfirmOpen(false)}
          onConfirm={confirmLogout}
        />
      </div>
    </section>
  )
}
