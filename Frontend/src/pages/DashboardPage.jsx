import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../lib/auth'
import './DashboardPage.css'

export default function DashboardPage() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function loadUser() {
      try {
        const currentUser = await getCurrentUser()

        if (!isMounted) {
          return
        }

        if (!currentUser) {
          navigate('/login', { replace: true })
          return
        }

        setUser(currentUser)
      } catch {
        if (isMounted) {
          navigate('/login', { replace: true })
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadUser()

    return () => {
      isMounted = false
    }
  }, [navigate])

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await logout()
    } finally {
      navigate('/login', { replace: true })
    }
  }

  if (isLoading) {
    return (
      <section className="dashboard-page">
        <div className="container dashboard-loading">Loading your dashboard...</div>
      </section>
    )
  }

  return (
    <section className="dashboard-page">
      <div className="container dashboard-shell">
        <div className="dashboard-hero">
          <div>
            <h1>Parish Dashboard</h1>
            <p>
              This is a sample dashboard for signed-in users. You can use it as the starting point for event management,
              content updates, announcements, and admin tools.
            </p>
          </div>

          <div className="dashboard-user">
            <span>Signed in as</span>
            <strong>{user?.name}</strong>
            <small>{user?.email}</small>
          </div>
        </div>

        <div className="dashboard-grid">
          <article className="dashboard-card">
            <h2>Quick Overview</h2>
            <p>A simple snapshot of what your parish team might want to check first each day.</p>
            <div className="dashboard-metric">12</div>
            <p>Upcoming items currently waiting for review in this sample dashboard.</p>
          </article>

          <article className="dashboard-card">
            <h2>Next Steps</h2>
            <p>Use these shortcuts to continue building out your admin experience.</p>
            <div className="dashboard-actions">
              <Link className="btn-primary" to="/news-events">View News</Link>
              <Link className="btn-outline" to="/events">Open Events</Link>
            </div>
          </article>

          <article className="dashboard-card">
            <h2>Account</h2>
            <p>Your session is active and tied to the backend login you just completed.</p>
            <div className="dashboard-actions">
              <button className="btn-primary" onClick={handleLogout} disabled={isLoggingOut}>
                {isLoggingOut ? 'Signing Out...' : 'Logout'}
              </button>
            </div>
          </article>
        </div>

        <article className="dashboard-card">
          <h2>Recent Activity</h2>
          <p>Example content blocks like this can later be replaced with live data from your backend.</p>
          <div className="dashboard-list">
            <div className="dashboard-list-item">
              <strong>Mass times updated</strong>
              <span>Review the latest schedule changes before they appear on the public site.</span>
            </div>
            <div className="dashboard-list-item">
              <strong>New contact submissions</strong>
              <span>Check recent enquiries and follow up with parishioners who need a response.</span>
            </div>
            <div className="dashboard-list-item">
              <strong>Upcoming events</strong>
              <span>Keep featured events current and prepare announcements for the week ahead.</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}
