// added hooks to load mass times from backend
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './MassTimesPage.css'

// removed hardcoded regularMasses because mass times will now come from the backend API

const confessionTimes = [
    'Saturday: 10.30am to 11.30am',
    'Saturday: 5.00pm to 6.00pm',
    'Extra services of Reconciliation during Lent are announced in the newsletter',
]

const sacramentCards = [
    { title: 'Baptism', description: 'Preparation and reception for infants, children, and adults entering the Church.', link: '/baptism' },
    { title: 'First Holy Communion', description: 'Preparation for baptised Catholic children in school year 3 and above.', link: '/first-holy-communion' },
    { title: 'Confirmation', description: 'Preparation for young people from school year 8 who have received Holy Communion.', link: '/confirmation' },
    { title: 'Marriage', description: 'Preparation, meetings with clergy, and practical guidance for weddings in the parish.', link: '/marriage' },
    { title: 'Reconciliation', description: 'Regular confession times and guidance for the Sacrament of Reconciliation.', link: '/reconciliation' },
    { title: 'Becoming a Catholic', description: 'RCIA for those exploring the Catholic faith or seeking full communion with the Church.', link: '/becoming-catholic' },
]

const prayerSchedule = [
    { title: 'Ignatian Prayer Group', schedule: 'Fortnightly during term time, 7.00pm to 8.30pm', description: 'Praying with the Sunday Mass readings in person or online.' },
    { title: 'Rosary', schedule: 'Fridays at 6.00pm in Malayali and Saturdays after 9.00am Mass', description: 'All are welcome to join this regular parish devotion.' },
    { title: 'Exposition and Rosary', schedule: 'Every second Friday, 4.00pm to 5.45pm', description: 'Prayer and reflection before the Blessed Sacrament.' },
    { title: 'Stations of the Cross', schedule: 'During Lent at the Cathedral and Coedpoeth', description: 'See the weekly newsletter for published seasonal times.' },
]

export default function MassTimesPage() {
    // store mass times coming from Laravel backend
    const [massTimes, setMassTimes] = useState([])

    // when page loads, request mass times from the backend API
    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/v1/mass-times")
            .then(res => res.json())
            .then(data => setMassTimes(data.data))
            .catch(err => console.log("Error loading mass times:", err))
    }, [])

    return (
        <div className="mass-sac-page">
            <PageHero
                title="Mass & Sacraments"
                subtitle="Regular worship, confession, sacramental preparation, and prayer at St Mary's Cathedral"
                centered={true}
            />

            <div className="container">
                <section className="section">
                    <h2 className="section-title">Mass Times</h2>
                    <p className="section-subtitle">Please check the weekly newsletter for weekday updates and seasonal notices</p>

                    <div className="grid-2 mass-times-grid">
                        {/* using backend mass times instead of hardcoded data */}
                        {massTimes.map((mass, index) => (
                            <div key={mass.id} className="card mass-time-card">
                                <div className="mt-card-header">
                                    <div className={`mt-icon-box mt-icon-variant-${(index % 2) + 1}`}>
                                        <span className={`mt-clock mt-clock-${(index % 2) + 1}`} aria-hidden="true"></span>
                                    </div>
                                    <div className="mt-card-heading">
                                        <h3 className="mt-card-title">{mass.location}</h3>
                                        <div className="mt-card-day">Regular schedule</div>
                                    </div>
                                </div>

                                <div className="mt-card-details" style={{ marginTop: '20px' }}>
                                    {/* showing day and time from backend */}
                                    <p className="mt-time-chip">
                                        <strong>{mass.day}: {mass.start_time}</strong>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="contact-strip" style={{ marginTop: '32px' }}>
                        <h3 style={{ marginBottom: '12px', fontFamily: 'Playfair Display, serif' }}>Confession Times</h3>
                        <ul className="bullet-list" style={{ color: 'var(--white)' }}>
                            {confessionTimes.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-center mt-48 newsletter-cta">
                        <Link to="/newsletter" className="newsletter-link-full">
                            See the weekly newsletter for the latest liturgical schedule and parish notices <span>→</span>
                        </Link>
                    </div>
                </section>

                <section className="section bg-light-full-width">
                    <div className="container">
                        <h2 className="section-title">Sacramental Life</h2>
                        <p className="section-subtitle">Preparation and guidance for the sacraments celebrated in Cathedral parish</p>

                        <div className="grid-3 sacrament-grid">
                            {sacramentCards.map((sac) => (
                                <div key={sac.title} className="card sacrament-card">
                                    <div className="sac-icon-box">
                                        <span className="sac-icon">{sac.title.slice(0, 2).toUpperCase()}</span>
                                    </div>
                                    <h3 className="sac-title">{sac.title}</h3>
                                    <p className="sac-desc">{sac.description}</p>
                                    <Link to={sac.link} className="btn-outline-sm">Learn More</Link>
                                </div>
                            ))}
                        </div>

                        <div className="info-banner">
                            <div className="info-banner-icon">i</div>
                            <div className="info-banner-content">
                                <h3>Other Sacramental Support</h3>
                                <p>
                                    Funerals, the Sacrament of the Sick, home Communion visits, vocations, and diaconate enquiries should begin with the parish office or clergy team.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title">Prayer And Devotion</h2>

                    <div className="grid-2 other-services-grid">
                        {prayerSchedule.map((service) => (
                            <div key={service.title} className="card service-card">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-schedule">{service.schedule}</p>
                                <p className="service-desc">{service.description}</p>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '28px' }}>
                        <Link to="/prayer-devotions" className="btn-primary">Prayer & Devotions Page</Link>
                    </div>
                </section>
            </div>
        </div>
    )
}