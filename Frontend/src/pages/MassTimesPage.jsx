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
            />

            <div className="container">
                {/* Mass Times Section */}
                <section className="section">
                    <h2 className="section-title">Mass Times</h2>
                    <p className="section-subtitle">Join us for the celebration of the Eucharist</p>

                    <div className="grid-3 mass-times-grid">
                        {/* Sunday Mass Card */}
                        <div className="card mass-time-card">
                            <div className="mt-icon-box">
                                <span className="mt-icon-large">🕒</span>
                            </div>
                            <h3 className="mt-card-title">Sunday Mass Times</h3>
                            <div className="mt-card-details">
                                <p><strong>9:00 AM</strong></p>
                                <p><strong>11:00 AM (Family Mass)</strong></p>
                                <p><strong>6:30 PM</strong></p>
                            </div>
                            <p className="mt-card-note">All Masses held at St Mary's Cathedral</p>
                        </div>

                        {/* Weekday Mass Card */}
                        <div className="card mass-time-card">
                            <div className="mt-icon-box">
                                <span className="mt-icon-large">🕒</span>
                            </div>
                            <h3 className="mt-card-title">Weekday Mass Times</h3>
                            <div className="mt-card-details">
                                <p><strong>Monday - Saturday</strong></p>
                                <p>10:00 AM</p>
                            </div>
                            <p className="mt-card-note">Confessions available 30 minutes before Mass</p>
                        </div>

                        {/* Holy Days Card */}
                        <div className="card mass-time-card">
                            <div className="mt-icon-box">
                                <span className="mt-icon-large">🕒</span>
                            </div>
                            <h3 className="mt-card-title">Holy Days of Obligation</h3>
                            <div className="mt-card-details">
                                <p><strong>9:00 AM</strong></p>
                                <p><strong>7:00 PM</strong></p>
                            </div>
                            <p className="mt-card-note">Please check the newsletter for specific dates</p>
                        </div>
                    </div>

                    <div className="text-center mt-32">
                        <button className="btn-primary">View Full Mass Times & Schedule</button>
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
                        <button className="btn-primary">
                            <span>📞</span> Contact the Parish Office
                        </button>
                        <button className="btn-outline-navy">
                            <span>✉️</span> Sacramental Enquiry
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
