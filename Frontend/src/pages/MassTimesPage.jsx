import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './MassTimesPage.css'

const sundayMasses = [
    { time: '9:00 AM', name: 'Sunday Mass' },
    { time: '11:00 AM', name: 'Sunday Mass (Family)' },
    { time: '6:30 PM', name: 'Sunday Evening Mass' },
]

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

                    <div className="grid-3 mass-times-grid">
                        {/* Sunday Mass Wrexham */}
                        <div className="card mass-time-card">
                            <div className="mt-icon-box">
                                <span className="mt-icon-large">🕒</span>
                            </div>
                            <h3 className="mt-card-title">Sunday Mass Times Wrexham</h3>
                            <div className="mt-card-details">
                                <p><strong>10:30 AM</strong></p>
                                <p><strong>7:00 PM</strong></p>
                            </div>
                            <p className="mt-card-note">St Mary's Cathedral</p>
                        </div>

                        {/* Sunday Mass Coedpoeth */}
                        <div className="card mass-time-card">
                            <div className="mt-icon-box">
                                <span className="mt-icon-large">🏠</span>
                            </div>
                            <h3 className="mt-card-title">Sunday Mass Time Coedpoeth</h3>
                            <div className="mt-card-details">
                                <p><strong>9:00 AM</strong></p>
                            </div>
                            <p className="mt-card-note">Holy Family Church</p>
                        </div>

                        {/* Weekday Mass Card */}
                        <div className="card mass-time-card">
                            <div className="mt-icon-box">
                                <span className="mt-icon-large">📅</span>
                            </div>
                            <h3 className="mt-card-title">Weekdays Mass Times</h3>
                            <div className="mt-card-details">
                                <p><strong>Please see newsletter</strong></p>
                                <p>for latest schedule</p>
                            </div>
                            <p className="mt-card-note">Includes Holy Days</p>
                        </div>
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

                        {/* Important Info Banner */}
                        <div className="info-banner">
                            <div className="info-banner-icon">ℹ️</div>
                            <div className="info-banner-content">
                                <h3>Important Information</h3>
                                <p>Each sacrament has specific preparation and requirements. Please read the relevant page before making an enquiry. If you have any questions, our parish office is here to help guide you through the process.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Other Services Section */}
                <section className="section">
                    <h2 className="section-title">Other Liturgical Services</h2>
                    <p className="section-subtitle">Additional opportunities for prayer and worship</p>

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

            {/* Questions Section */}
            <section className="questions-section">
                <div className="container">
                    <h2 className="section-title">Have questions about Mass or Sacraments?</h2>
                    <p className="section-subtitle">Our parish office is here to help. Whether you're enquiring about Mass times, preparing for a sacrament, or have any questions about the liturgical life of the Cathedral, please don't hesitate to get in touch.</p>
                    <div className="questions-actions">
                        <Link to="/contact" className="btn-primary">
                            <span>📞</span> Contact the Parish Office
                        </Link>
                        <Link to="/contact?subject=Sacramental Enquiry" className="btn-outline-navy">
                            <span>✉️</span> Sacramental Enquiry
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
