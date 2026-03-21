import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { useEffect, useState } from 'react' // added for API
import './MassTimesPage.css'

// keep existing arrays
const sacraments = [
    { id: 'baptism', title: 'Baptism', description: 'The first sacrament welcoming new members into the Catholic faith', icon: '💧' },
    { id: 'communion', title: 'First Holy Communion', description: 'Receiving the Body and Christ for the first time', icon: '🤝' },
    { id: 'confirmation', title: 'Confirmation', description: 'Completing Christian initiation through the gifts of the Holy Spirit', icon: '✨' },
    { id: 'marriage', title: 'Marriage', description: 'The sacred union of a man and woman in the presence of God', icon: '❤️' },
    { id: 'reconciliation', title: 'Reconciliation', description: 'The sacrament of healing and forgiveness', icon: '🙌' },
    { id: 'anointing', title: 'Anointing of the Sick', description: 'Spiritual comfort and strength for those who are ill', icon: '🙏' },
]

const otherServices = [
    { title: 'Adoration of the Blessed Sacrament', schedule: 'Every Friday following 10:00 AM Mass until 12:00 PM', description: 'A beautiful opportunity to spend time in silent prayer before the Blessed Sacrament.' },
    { title: 'Stations of the Cross', schedule: 'Every Friday during Lent at 7:00 PM', description: 'Join us in meditating on the Passion of Christ during the Lenten season.' },
    { title: 'The Rosary', schedule: 'Saturdays at 9:30 AM before Mass', description: 'Praying the Rosary together as a community before Saturday morning Mass.' },
    { title: 'Divine Mercy Chaplet', schedule: 'Daily at 3:00 PM', description: 'The Cathedral is open for private prayer and the Divine Mercy Chaplet at the hour of mercy.' },
]

export default function MassTimesPage() {

    // store mass times from backend
    const [massTimes, setMassTimes] = useState([])

    // loading state
    const [loading, setLoading] = useState(true)

    // error state
    const [error, setError] = useState(null)

    useEffect(() => {
        // fetch data from API when page loads
        const fetchMassTimes = async () => {
            try {
                setLoading(true)

                const response = await fetch('http://127.0.0.1:8000/api/v1/mass-times')

                if (!response.ok) {
                    throw new Error('Failed to fetch mass times')
                }

                const data = await response.json()

                // handle both response formats (array or data inside object)
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

    // format time from 24hr to AM/PM
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

    return (
        <div className="mass-sac-page">
            <PageHero
                title="Mass & Sacraments"
                subtitle="Information about Mass times and sacramental life at St Mary's Cathedral"
                centered={true}
            />

            <div className="container">

                {/* Mass Times Section */}
                <section className="section">
                    <h2 className="section-title">Mass Times</h2>
                    <p className="section-subtitle">Join us for the celebration of the Eucharist</p>

                    {/* loading state */}
                    {loading && <p>Loading mass times...</p>}

                    {/* error state */}
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    {/* dynamic data from API */}
                    <div className="grid-3 mass-times-grid">

                        {Array.isArray(massTimes) && massTimes.map((mass) => (
                            <div key={mass.id} className="card mass-time-card">

                                {/* keep icon */}
                                <div className="mt-icon-box">
                                    <span className="mt-icon-large">🕒</span>
                                </div>

                                {/* day first */}
                                <h3 className="mt-card-title">{mass.day}</h3>

                                {/* time underneath (using single time field now) */}
                                <div className="mt-card-details">
                                    <p>
                                        <strong>
                                            {formatTime(mass.start_time)} {/* using start_time from API */}
                                        </strong>
                                    </p>
                                </div>

                                {/* optional details */}
                                {mass.location && (
                                    <p className="mt-card-note">{mass.location}</p>
                                )}
                            </div>
                        ))}

                    </div>

                    <div className="text-center mt-48 newsletter-cta">
                        <Link to="/newsletter" className="newsletter-link-full">
                            For more details, please see our latest weekly newsletter <span>→</span>
                        </Link>
                    </div>
                </section>

                {/* Sacraments Section */}
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
                            <div className="info-banner-icon">ℹ️</div>
                            <div className="info-banner-content">
                                <h3>Important Information</h3>
                                <p>Each sacrament has specific preparation and requirements.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Services Section */}
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