import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listContactMessages, listEvents, listMassTimes, listRegistrations } from '../../lib/admin'

function formatDate(value) {
  if (!value) {
    return 'Not set'
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(value) {
  if (!value) {
    return 'Not set'
  }

  return value.slice(0, 5)
}

function formatDateTime(date, time) {
  if (!date) {
    return 'Not scheduled'
  }

  return `${formatDate(date)}${time ? ` at ${formatTime(time)}` : ''}`
}

export default function AdminOverviewPage() {
  const [events, setEvents] = useState([])
  const [massTimes, setMassTimes] = useState([])
  const [massTimeMeta, setMassTimeMeta] = useState({ total: 0 })
  const [registrations, setRegistrations] = useState([])
  const [registrationMeta, setRegistrationMeta] = useState({ total: 0 })
  const [contactMessages, setContactMessages] = useState([])
  const [contactMeta, setContactMeta] = useState({ total: 0 })

  useEffect(() => {
    let ignore = false

    async function loadData() {
      const [eventPayload, massPayload, registrationPayload, contactPayload] = await Promise.all([
        listEvents(),
        listMassTimes(1),
        listRegistrations(1),
        listContactMessages(1),
      ])

      if (ignore) {
        return
      }

      setEvents(eventPayload.events || [])
      setMassTimes(massPayload.mass_times || [])
      setMassTimeMeta(massPayload.meta || { total: 0 })
      setRegistrations(registrationPayload.registrations || [])
      setRegistrationMeta(registrationPayload.meta || { total: 0 })
      setContactMessages(contactPayload.messages || [])
      setContactMeta(contactPayload.meta || { total: 0 })
    }

    loadData()

    return () => {
      ignore = true
    }
  }, [])

  const publishedEvents = events.filter(item => item.status === 'published').length
  const publishedMassTimes = massTimes.filter(item => item.status === 'published').length

  return (
    <div className="admin-page-grid">
      <div className="admin-overview-grid">
        <article className="admin-surface admin-stat-card">
          <span>Events</span>
          <strong>{events.length}</strong>
          <small>{publishedEvents} published right now</small>
        </article>
        <article className="admin-surface admin-stat-card">
          <span>Mass Times</span>
          <strong>{massTimeMeta.total || 0}</strong>
          <small>{publishedMassTimes} published on the current page</small>
        </article>
        <article className="admin-surface admin-stat-card">
          <span>Registrations</span>
          <strong>{registrationMeta.total || 0}</strong>
          <small>Parish records available for review</small>
        </article>
        <article className="admin-surface admin-stat-card">
          <span>Contact</span>
          <strong>{contactMeta.total || 0}</strong>
          <small>Messages received through the website</small>
        </article>
      </div>

      <div className="admin-overview-grid">
        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Recent Events</h2>
              <p>Quick access to the latest scheduled items.</p>
            </div>
            <Link className="btn-outline" to="/dashboard/events">Open Events</Link>
          </div>
          <div className="admin-list">
            {events.slice(0, 4).map(item => (
              <Link key={item.id} className="admin-list-row" to={`/dashboard/events?edit=${item.id}`}>
                <strong>{item.title}</strong>
                <span>{formatDateTime(item.start_date, item.start_time)}</span>
              </Link>
            ))}
            {!events.length ? <p className="admin-empty">No events have been created yet.</p> : null}
          </div>
        </article>

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Mass Schedule</h2>
              <p>See the most recent timetable entries.</p>
            </div>
            <Link className="btn-outline" to="/dashboard/mass-times">Open Mass Times</Link>
          </div>
          <div className="admin-list">
            {massTimes.slice(0, 4).map(item => (
              <Link key={item.id} className="admin-list-row" to={`/dashboard/mass-times?edit=${item.id}`}>
                <strong>{item.day}</strong>
                <span>{formatTime(item.start_time)}{item.location ? ` • ${item.location}` : ''}</span>
              </Link>
            ))}
            {!massTimes.length ? <p className="admin-empty">No Mass times available yet.</p> : null}
          </div>
        </article>

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Latest Registrations</h2>
              <p>Move straight into member record review.</p>
            </div>
            <Link className="btn-outline" to="/dashboard/registrations">Open Records</Link>
          </div>
          <div className="admin-list">
            {registrations.slice(0, 4).map(item => (
              <Link key={item.id} className="admin-list-row" to={`/dashboard/registrations?selected=${item.id}`}>
                <strong>{item.full_name}</strong>
                <span>{item.member_id} • {formatDate(item.signed_date)}</span>
              </Link>
            ))}
            {!registrations.length ? <p className="admin-empty">No registrations available yet.</p> : null}
          </div>
        </article>

        <article className="admin-surface">
          <div className="admin-section-head">
            <div>
              <h2>Recent Enquiries</h2>
              <p>Open recent messages from the Contact Us page.</p>
            </div>
            <Link className="btn-outline" to="/dashboard/contact-messages">Open Contact</Link>
          </div>
          <div className="admin-list">
            {contactMessages.slice(0, 4).map(item => (
              <Link key={item.id} className="admin-list-row" to={`/dashboard/contact-messages?message=${item.id}`}>
                <strong>{item.subject}</strong>
                <span>{item.name} • {item.email}</span>
              </Link>
            ))}
            {!contactMessages.length ? <p className="admin-empty">No contact messages available yet.</p> : null}
          </div>
        </article>
      </div>
    </div>
  )
}
