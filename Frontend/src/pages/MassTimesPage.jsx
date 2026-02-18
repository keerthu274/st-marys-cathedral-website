import PageHero from '../components/PageHero'
import './MassTimesPage.css'

const sundayMasses = [
    { time: '9:00 AM', name: 'Sunday Mass', lang: 'English' },
    { time: '11:00 AM', name: 'Sunday Mass (Family)', lang: 'English' },
    { time: '6:30 PM', name: 'Sunday Evening Mass', lang: 'English' },
]

const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const holyDays = [
    'Ash Wednesday – February 14, 2026',
    'Easter Sunday – April 5, 2026',
    'Ascension Thursday – May 14, 2026',
]

export default function MassTimesPage() {
    return (
        <div>
            <PageHero
                title="Mass Times"
                subtitle="Join us for worship and celebration of the Eucharist"
            />

            <div className="container">
                {/* Sunday Masses */}
                <section className="section-sm">
                    <h2 className="mt-section-title">
                        <span className="mt-icon">📅</span> Sunday Masses
                    </h2>
                    <div className="grid-3 sunday-cards">
                        {sundayMasses.map(m => (
                            <div key={m.time} className="card sunday-card">
                                <div className="sunday-time-box">
                                    <span className="sunday-icon">🕐</span>
                                    <span className="sunday-time">{m.time}</span>
                                </div>
                                <h3 className="sunday-name">{m.name}</h3>
                                <p className="sunday-lang">{m.lang}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Weekday Masses */}
                <section className="section-sm">
                    <h2 className="mt-section-title">
                        <span className="mt-icon">🕐</span> Weekday Masses
                    </h2>
                    <div className="card weekday-grid">
                        {weekdays.map(day => (
                            <div key={day} className="weekday-row">
                                <span className={`weekday-name ${['Wednesday', 'Saturday'].includes(day) ? 'bold' : ''}`}>{day}</span>
                                <span className="weekday-time">10:00 AM</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Holy Days */}
                <section className="section-sm">
                    <h2 className="mt-section-title">
                        <span className="mt-icon">🔔</span> Holy Days of Obligation
                    </h2>
                    <div className="card">
                        <p style={{ color: 'var(--text-mid)', marginBottom: '20px', lineHeight: '1.7', fontSize: '0.9rem' }}>
                            Mass times for Holy Days of Obligation are announced in advance through our weekly newsletter and bulletin. Typically, we offer multiple masses throughout the day to accommodate everyone's schedule.
                        </p>
                        <div className="holy-days-box">
                            <p className="holy-days-label">Upcoming Holy Days:</p>
                            <ul className="holy-days-list">
                                {holyDays.map(d => <li key={d}>• {d}</li>)}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Additional Info */}
                <section className="section-sm">
                    <h2 className="mt-section-title" style={{ marginBottom: '24px' }}>Additional Information</h2>
                    <div className="grid-2">
                        <div className="card">
                            <h3 className="add-info-title">Confessions</h3>
                            <p className="add-info-sub">The Sacrament of Reconciliation is available:</p>
                            <ul className="add-info-list">
                                <li>• Saturday: 9:30 AM – 10:00 AM</li>
                                <li>• Saturday: 5:00 PM – 6:00 PM</li>
                                <li>• By appointment: Contact the parish office</li>
                            </ul>
                        </div>
                        <div className="card">
                            <h3 className="add-info-title">Cathedral Information</h3>
                            <div className="add-info-row">
                                <span>📍</span>
                                <span>St Mary's Cathedral<br />Regent Street, Wrexham<br />LL11 1RR</span>
                            </div>
                            <div className="add-info-row">
                                <span>🕐</span>
                                <span>Cathedral open for private prayer<br />Daily: 8:00 AM – 6:00 PM</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Full-width image */}
            <div className="mt-image-banner">
                <img
                    src="https://images.unsplash.com/photo-1548625149-720754951eca?w=1200&q=80"
                    alt="Mass celebration"
                />
            </div>
        </div>
    )
}
