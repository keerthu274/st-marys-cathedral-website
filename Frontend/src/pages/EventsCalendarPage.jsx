import { NewsHero, NewsIntro, EventsList, NewsCTA } from '../components/news/NewsEventsSections'
import { Link } from 'react-router-dom'

const allEvents = [
    { day: '05', month: 'MAR', time: '18:00', title: 'Ash Wednesday Services', description: 'Mass and distribution of ashes at 8:00 AM, 12:00 PM, and 7:00 PM.' },
    { day: '12', month: 'MAR', time: '19:30', title: 'Lenten Prayer Service', description: 'Weekly prayer and meditation sessions throughout the Lenten season.' },
    { day: '19', month: 'MAR', time: '09:00', title: 'Parish Retreat', description: 'A day of spiritual renewal and reflection led by guest speakers from the Diocese.' },
    { day: '28', month: 'MAR', time: '20:00', title: 'Easter Vigil', description: 'The most beautiful liturgy of the year. Join us for the celebration of Christ\'s resurrection.' },
    { day: '05', month: 'APR', time: '11:00', title: 'Youth Group Gathering', description: 'Monthly meeting for our young parishioners to explore faith through fellowship and activities.' },
    { day: '12', month: 'APR', time: '14:00', title: 'Senior Citizens Tea', description: 'An afternoon of hospitality and social connection for our older community members.' }
]

export default function EventsCalendarPage() {
    return (
        <div className="news-events-page">
            <NewsHero 
                title="Events Calendar"
                subtitle="Stay updated with upcoming services, events, and community activities at St Mary’s Cathedral."
                image="https://images.unsplash.com/photo-1510925758641-869d353cecc7?q=80&w=1600"
                breadcrumb="Events Calendar"
            />
            
            <NewsIntro 
                title="Join Our Community"
                text="Below is a list of upcoming liturgical and social events. We welcome everyone to participate and grow together in faith and friendship. Please note that some events may require registration."
            />

            <section className="section" style={{ background: '#fcfaf6' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <div style={{ background: 'var(--white)', padding: '30px', borderRadius: '16px', display: 'inline-block', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        <h3 className="text-navy" style={{ marginBottom: '10px', fontSize: '1.2rem' }}>Featured Event</h3>
                        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '1.5rem', marginBottom: '8px' }}>Easter Sunday Mass</div>
                        <p className="text-mid" style={{ marginBottom: '0' }}>April 20th | 8:30 AM & 11:00 AM</p>
                    </div>
                </div>
            </section>

            <EventsList events={allEvents} />

            <div style={{ textAlign: 'center', padding: '40px 0' }}>
                 <p className="text-mid" style={{ marginBottom: '24px' }}>Looking for regular Mass & Confession times?</p>
                 <Link to="/mass-sacraments" className="btn-gold">View Liturgical Schedule</Link>
            </div>

            <NewsCTA 
                title="Organizing an Event?"
                description="If you are a member of a parish group or council and would like to list an event on the calendar, please get in touch with our office."
                buttonText="Submit Event Request"
                buttonLink="/contact"
            />
        </div>
    )
}
