import PageHero from '../components/PageHero'
import './NewsEventsPage.css'

const categories = [
    { icon: '📅', title: 'Events Calendar', desc: 'Stay up to date with upcoming events, services, and activities at the cathedral.', bg: '#f0f4ff' },
    { icon: '📋', title: 'News & Announcements', desc: 'Read the latest news and important announcements from St Mary\'s Cathedral.', bg: '#f0f4ff' },
    { icon: '📄', title: 'Weekly Newsletter', desc: 'Our weekly newsletter keeps you informed about parish life, Mass times, and upcoming events.', bg: '#f0fff4' },
    { icon: '🗄', title: 'Newsletter Archive', desc: 'Access previous editions of our parish newsletter and browse past announcements.', bg: '#fffbf0' },
]

const events = [
    { date: 'Feb 9', title: 'Lenten Prayer Service', time: '7:00 PM' },
    { date: 'Feb 14', title: 'Ash Wednesday Services', time: '9:00 AM & 7:00 PM' },
    { date: 'Mar 15-17', title: 'Parish Retreat', time: 'All Weekend' },
    { date: 'Apr 5', title: 'Easter Vigil', time: '8:00 PM' },
]

export default function NewsEventsPage() {
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
                            {events.map(e => (
                                <div key={e.title} className="ne-event-row">
                                    <span className="ne-event-date">{e.date}</span>
                                    <div className="ne-event-info">
                                        <span className="ne-event-name">{e.title}</span>
                                        <span className="ne-event-time">{e.time}</span>
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
