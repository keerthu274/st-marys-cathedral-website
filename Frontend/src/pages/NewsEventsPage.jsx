import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { getBackendUrl } from '../lib/auth'
import './NewsEventsPage.css'

function formatDateLabel(dateString) {
  if (!dateString) {
    return 'Date TBC'
  }

  return new Date(`${dateString}T00:00:00`).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTimeLabel(startTime, endTime) {
  const formatTime = (timeString) => {
    if (!timeString) {
      return ''
    }

    const [hours, minutes] = timeString.split(':')
    const date = new Date()
    date.setHours(Number(hours), Number(minutes))

    return date.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  const from = formatTime(startTime)
  const to = formatTime(endTime)

  if (from && to) {
    return `${from} - ${to}`
  }

  return from || to || 'Time to be confirmed'
}

export default function NewsEventsPage() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    let ignore = false

    async function loadEvents() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/events')
        const payload = await response.json()
    
        if (!ignore && response.ok && Array.isArray(payload?.data)) {
          setEvents(payload.data)
        }
      } catch (error) {
        console.log('Error loading events:', error)
      }
    }

    loadEvents()

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="news-events-page">
      <PageHero
        title="News & Events"
        subtitle="Stay connected with the life of our parish. Discover upcoming events, read the latest news, and never miss what is happening at St Mary's Cathedral."
        centered={true}
      />

      <section className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <div className="card">
            <h2 className="ne-events-title">Upcoming Events</h2>

            <div className="ne-events-list">
              {events.map((event) => (
                <div key={event.id} className="ne-event-row">
                  <span className="ne-event-date">{formatDateLabel(event.start_date)}</span>

                  <div className="ne-event-info">
                    <span className="ne-event-name">{event.title}</span>
                    <span className="ne-event-time">{formatTimeLabel(event.start_time, event.end_time)}</span>
                  </div>

                  <Link to={`/events/${event.id}`} className="ne-event-details">Details</Link>
                </div>
              ))}

              {!events.length ? (
                <div className="ne-event-row">
                  <span className="ne-event-date">Soon</span>
                  <div className="ne-event-info">
                    <span className="ne-event-name">Upcoming parish events will appear here</span>
                    <span className="ne-event-time">Published events from the backend will show up automatically.</span>
                  </div>
                </div>
              ) : null}
            </div>

            <div style={{ textAlign: 'center', marginTop: '24px' }}>
              <Link to="/events" className="btn-primary">View Full Calendar</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
