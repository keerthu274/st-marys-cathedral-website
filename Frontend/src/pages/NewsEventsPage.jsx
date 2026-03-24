// added useState and useEffect so we can load events from the Laravel API
import { useState, useEffect } from 'react'

import PageHero from '../components/PageHero'
import './NewsEventsPage.css'

const newsFeatures = [
    {
        icon: '📅',
        title: 'Events Calendar',
        description: 'Stay updated with upcoming services, events, and community activities at the Cathedral.',
        link: '/events'
    },
    {
        icon: '📰',
        title: 'News & Announcements',
        description: 'Read the latest updates, parish news, and important announcements from our community.',
        link: '/news'
    },
    {
        icon: '📧',
        title: 'Weekly Newsletter',
        description: 'Access the current week’s digital newsletter with Mass times and parish updates.',
        link: '/newsletter'
    },
    {
        icon: '🗄️',
        title: 'Newsletter Archive',
        description: 'Browse and download past editions of the parish newsletter from our digital archive.',
        link: '/newsletter-archive'
    }
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
            .then(data => setEvents(data.data))

            .catch(error => console.log("Error loading events:", error))
    }, [])

    return (
        <div className="news-events-page">
            <PageHero 
                title="News & Events"
                subtitle="Stay connected with the life of our parish. Discover upcoming events, read the latest news, and never miss what’s happening at St Mary’s Cathedral."
                centered={true}
            />

            {/* removed EventsList because it was using old dummy data */}

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

                                    {/* changed this to show event date on the left side */}
                                    <span className="ne-event-date">{e.start_date}</span>

                                    <div className="ne-event-info">

                                        <span className="ne-event-name">{e.title}</span>

                                        {/* changed this to show start time and end time under the event title */}
                                        <span className="ne-event-time">
                                            {e.start_time} - {e.end_time}
                                        </span>

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
        </div>
    )
}