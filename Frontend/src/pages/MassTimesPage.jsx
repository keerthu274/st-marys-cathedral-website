import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useEffect, useState } from 'react'
import { getBackendUrl } from '../lib/auth'
import './MassTimesPage.css'

const sacraments = [
    { id: 'baptism', title: 'Baptism', description: 'The first sacrament welcoming new members into the Catholic faith', icon: 'B' },
    { id: 'communion', title: 'First Holy Communion', description: 'Receiving the Body and Christ for the first time', icon: 'HC' },
    { id: 'confirmation', title: 'Confirmation', description: 'Completing Christian initiation through the gifts of the Holy Spirit', icon: 'C' },
    { id: 'marriage', title: 'Marriage', description: 'The sacred union of a man and woman in the presence of God', icon: 'M' },
    { id: 'reconciliation', title: 'Reconciliation', description: 'The sacrament of healing and forgiveness', icon: 'R' },
    { id: 'anointing', title: 'Anointing of the Sick', description: 'Spiritual comfort and strength for those who are ill', icon: 'AS' },
]

const otherServices = [
    { title: 'Ignatian Prayer Group', schedule: 'Fortnightly during term time, 7:00 PM - 8:30 PM', description: 'Praying with the Sunday Mass readings in person or online.' },
    { title: 'Rosary', schedule: 'Fridays at 6:00 PM in Malayali and Saturdays after 9:00 AM Mass', description: 'All are welcome to join the parish in Marian prayer.' },
    { title: 'Exposition And Rosary', schedule: 'Every second Friday, 4:00 PM - 5:45 PM', description: 'Time for adoration, prayer, and reflection before the Blessed Sacrament.' },
    { title: 'Stations Of The Cross', schedule: 'During Lent at the Cathedral and Coedpoeth', description: 'Please check the weekly newsletter for seasonal times and additional services.' },
]

export default function MassTimesPage() {
    const [massTimes, setMassTimes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchMassTimes = async () => {
            try {
                setLoading(true)

                const response = await fetch(getBackendUrl('/api/v1/mass-times'))

                if (!response.ok) {
                    throw new Error('Failed to fetch mass times')
                }

                const data = await response.json()

                if (Array.isArray(data)) {
                    setMassTimes(data)
                } else if (Array.isArray(data.data)) {
                    setMassTimes(data.data)
                } else {
                    setMassTimes([])
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchMassTimes()
    }, [])

    const formatTime = (time) => {
        if (!time) return ''

        const [hours, minutes] = time.split(':')
        const date = new Date()
        date.setHours(hours)
        date.setMinutes(minutes)

        return date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
    }

    const groupedMassTimes = massTimes.reduce((groups, mass) => {
        const location = mass.location || "St Mary's Cathedral"
        const existing = groups.find(group => group.day === mass.day && group.location === location)

        if (existing) {
            existing.times.push(formatTime(mass.start_time))
            return groups
        }

        groups.push({
            id: `${mass.day}-${location}`,
            day: mass.day,
            location,
            times: [formatTime(mass.start_time)],
        })

        return groups
    }, [])

    return (
        <div className="mass-sac-page">
            <PageHero
                title="Mass & Sacraments"
                subtitle="Information about Mass times and sacramental life at St Mary's Cathedral"
                centered={true}
            />

            <div className="container">
                <section className="section">
                    <h2 className="section-title">Mass Times</h2>
                    <p className="section-subtitle">Join us for the celebration of the Eucharist</p>

                    {loading && <p>Loading mass times...</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="grid-3 mass-times-grid">
                        {groupedMassTimes.map((mass, index) => (
                            <div key={mass.id} className="card mass-time-card">
                                <div className="mt-card-header">
                                    <div className={`mt-icon-box mt-icon-variant-${(index % 3) + 1}`}>
                                        <span className={`mt-clock mt-clock-${(index % 3) + 1}`} aria-hidden="true"></span>
                                    </div>
                                    <div className="mt-card-heading">
                                        <h3 className="mt-card-title">{mass.location}</h3>
                                        <div className="mt-card-day">{mass.day}</div>
                                    </div>
                                    <div className="mt-card-count">{mass.times.length} time{mass.times.length > 1 ? 's' : ''}</div>
                                </div>

                                <p className="mt-card-note">
                                    {mass.location === "St Mary's Cathedral"
                                        ? 'Cathedral celebration schedule'
                                        : 'Community worship location'}
                                </p>

                                <div className="mt-section-label">Service Times</div>

                                <div className="mt-card-details">
                                    {mass.times.map((time) => (
                                        <p key={`${mass.id}-${time}`} className="mt-time-chip">
                                            <strong>{time}</strong>
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-48 newsletter-cta">
                        <Link to="/newsletter" className="newsletter-link-full">
                            For more details, please see our latest weekly newsletter <span>→</span>
                        </Link>
                    </div>
                </section>

                <section className="section bg-light-full-width">
                    <div className="container">
                        <h2 className="section-title">Sacraments</h2>
                        <p className="section-subtitle">Receiving God's grace through the sacraments of the Church</p>

                        <div className="grid-3 sacrament-grid">
                            {sacraments.map(sac => (
                                <div key={sac.id} className="card sacrament-card">
                                    <div className="sac-icon-box">
                                        <span className="sac-icon">{sac.icon}</span>
                                    </div>
                                    <h3 className="sac-title">{sac.title}</h3>
                                    <p className="sac-desc">{sac.description}</p>
                                    <button className="btn-outline-sm">Learn More</button>
                                </div>
                            ))}
                        </div>

                        <div className="info-banner">
                            <div className="info-banner-icon">i</div>
                            <div className="info-banner-content">
                                <h3>Important Information</h3>
                                <p>Each sacrament has specific preparation and requirements.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="section-title">Other Liturgical Services</h2>

                    <div className="grid-2 other-services-grid">
                        {otherServices.map((service, index) => (
                            <div key={index} className="card service-card">
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-schedule">{service.schedule}</p>
                                <p className="service-desc">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
