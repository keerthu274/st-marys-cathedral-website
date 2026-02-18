import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './AboutPage.css'

const values = [
    { icon: '⛪', title: 'Faith', desc: 'Rooted in Catholic tradition and guided by the teachings of Christ' },
    { icon: '👥', title: 'Community', desc: 'A welcoming family united in worship and service' },
    { icon: '♡', title: 'Service', desc: 'Committed to serving those in need with compassion' },
    { icon: '📖', title: 'Formation', desc: 'Growing in faith through learning and spiritual development' },
]

const staff = [
    { role: 'Bishop of Wrexham', name: 'Most Rev. Peter Brignall', title: 'Diocesan Bishop' },
    { role: 'Cathedral Dean', name: 'Very Rev. James Smith', title: 'Parish Priest' },
    { role: 'Associate Priest', name: 'Rev. Michael Jones', title: 'Assistant Priest' },
]

export default function AboutPage() {
    return (
        <div>
            <PageHero
                title="About St Mary's Cathedral"
                subtitle="Mother Church of the Diocese of Wrexham"
            />

            {/* History */}
            <section className="section">
                <div className="container about-history">
                    <div className="history-text">
                        <h2 className="about-heading">Our History</h2>
                        <p>
                            St Mary's Cathedral has been the spiritual heart of Catholic life in North Wales for over 150 years. Built in 1857, the cathedral stands as a testament to the faith and dedication of generations of Catholics in the Wrexham area.
                        </p>
                        <p>
                            As the Mother Church of the Diocese of Wrexham, established in 1987, St Mary's holds a special place in the life of the Catholic community across North Wales. The cathedral serves not only as a place of worship but also as a center for diocesan celebrations and important Church events.
                        </p>
                        <p>
                            Throughout its history, the cathedral has been lovingly maintained and enhanced by successive generations. The beautiful architecture, stained glass windows, and sacred art create a space that inspires prayer and devotion.
                        </p>
                    </div>
                    <div className="history-image">
                        <img
                            src="https://images.unsplash.com/photo-1548625149-720754951eca?w=600&q=80"
                            alt="Cathedral exterior"
                        />
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <h2 className="section-title">Our Values</h2>
                    <div className="grid-4" style={{ marginTop: '40px' }}>
                        {values.map(v => (
                            <div key={v.title} className="card value-card">
                                <div className="value-icon">{v.icon}</div>
                                <h3 className="value-title">{v.title}</h3>
                                <p className="value-desc">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Diocese */}
            <section className="section">
                <div className="container about-diocese">
                    <div className="diocese-text">
                        <h2 className="about-heading">Our Diocese</h2>
                        <p>
                            The Diocese of Wrexham was established in 1987, covering the historic counties of Anglesey, Caernarfonshire, Denbighshire, Flintshire, Merionethshire, and Montgomeryshire in North Wales.
                        </p>
                        <p>
                            St Mary's Cathedral serves as the seat of the Bishop of Wrexham and is the focal point for diocesan celebrations, ordinations, and major liturgical events.
                        </p>
                        <p>
                            The diocese is home to a diverse Catholic community, serving English and Welsh-speaking Catholics as well as many ethnic communities who have made North Wales their home.
                        </p>
                    </div>
                    <div className="diocese-image">
                        <img
                            src="https://images.unsplash.com/photo-1519817650390-64a93db51149?w=600&q=80"
                            alt="Cathedral stained glass"
                        />
                    </div>
                </div>
            </section>

            {/* Staff */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <h2 className="section-title">Cathedral Staff</h2>
                    <div className="grid-3" style={{ marginTop: '40px' }}>
                        {staff.map(s => (
                            <div key={s.role} className="card staff-card">
                                <div className="staff-avatar">👤</div>
                                <h3 className="staff-role">{s.role}</h3>
                                <p className="staff-name">{s.name}</p>
                                <p className="staff-title">{s.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="mission-banner">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="mission-title">Our Mission</h2>
                    <p className="mission-quote">
                        "To be a vibrant Catholic community, centered on Christ and the Eucharist, welcoming all people to encounter God's love, grow in faith, and serve one another with joy and compassion."
                    </p>
                </div>
            </section>
        </div>
    )
}
