// added useState and useEffect so we can load events from the Laravel API
import { useState, useEffect } from 'react'

import PageHero from '../components/PageHero'
import './NewsEventsPage.css'

const categories = [
    { icon: '📅', title: 'Events Calendar', desc: 'Stay up to date with upcoming events, services, and activities at the cathedral.', bg: '#f0f4ff' },
    { icon: '📋', title: 'News & Announcements', desc: 'Read the latest news and important announcements from St Mary\'s Cathedral.', bg: '#f0f4ff' },
    { icon: '📄', title: 'Weekly Newsletter', desc: 'Our weekly newsletter keeps you informed about parish life, Mass times, and upcoming events.', bg: '#f0fff4' },
    { icon: '🗄', title: 'Newsletter Archive', desc: 'Access previous editions of our parish newsletter and browse past announcements.', bg: '#fffbf0' },
]

// removed hardcoded events because events will now come from the backend API

export default function NewsEventsPage() {

    // created state to store events coming from Laravel backend
    const [events, setEvents] = useState([])

    // when page loads, request events from the backend API
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/events")
            .then(res => res.json())

            // API returns { success:true, data:[...] } so we take the data array
            .then(data => {
                console.log("Events from API:", data) // added this to check if frontend is receiving events
                setEvents(data.data) // store events from backend in React state
            })

            .catch(error => console.log("Error loading events:", error))
    }, [])

    return (
        <div>
            <PageHero
                icon="📅"
                title="News & Events"
                subtitle="Stay connected with the life of our parish. Discover upcoming events, read the latest news, and never miss what's happening at St Mary's Cathedral."
                centered={true}
            />
            <div className="ne-hero-centered" />

            <section className="section">
                <div className="container">
                    <div className="grid-2">
                        {categories.map(c => (
                            <div key={c.title} className="ne-cat-card">
                                <div className="ne-cat-icon" style={{ background: c.bg }}>{c.icon}</div>
                                <h3 className="ne-cat-title">{c.title}</h3>
                                <p className="ne-cat-desc">{c.desc}</p>
                                <span className="read-more">View More →</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="card">
                        <h2 className="ne-events-title">Upcoming Events</h2>

                        <div className="ne-events-list">

                            {/* events now come from backend instead of hardcoded list */}
                            {events.map(e => (

                                // using event id from database instead of title
                                <div key={e.id} className="ne-event-row">

                                    {/* using start_date from backend API */}
                                    <span className="ne-event-date">{e.start_date}</span>

                                    <div className="ne-event-info">
                                        <span className="ne-event-name">{e.title}</span>

                                        {/* showing start_time from Laravel events table */}
                                        <span className="ne-event-time">{e.start_time}</span>
                                    </div>

                                    <span className="ne-event-details">Details</span>
                                </div>
                            ))}

                        </div>

                        <div style={{ textAlign: 'center', marginTop: '24px' }}>
                            <button className="btn-primary">View Full Calendar</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stay Informed */}
            <section className="ne-stay-informed">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="ne-stay-title">Stay Informed</h2>
                    <p className="ne-stay-desc">
                        Subscribe to our weekly newsletter to receive updates about Mass times, events, and parish news directly to your inbox.
                    </p>
                    <button className="btn-gold">Subscribe to Newsletter</button>
                </div>
            </section>
        </div>
    )
}