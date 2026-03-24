import PageHero from '../components/PageHero'
import './AboutPage.css'

const values = [
    { icon: 'F', title: 'Faith', desc: 'Rooted in Catholic worship, prayer, and the sacraments at the heart of parish life.' },
    { icon: 'C', title: 'Community', desc: 'A welcoming Cathedral parish made up of families and individuals from many backgrounds and nations.' },
    { icon: 'S', title: 'Service', desc: 'Committed to pastoral care, home visits, safeguarding, volunteering, and support for those in need.' },
    { icon: 'G', title: 'Growth', desc: 'Growing in faith through sacramental preparation, RCIA, prayer groups, schools, and parish learning.' },
]

const staff = [
    { role: 'Bishop of Wrexham', name: 'Bishop Peter Brignall', title: 'Diocesan Bishop' },
    { role: 'Cathedral Dean', name: 'Fr Nicolas Enzama', title: 'Cathedral Dean and Parish Priest' },
    { role: 'Permanent Deacons', name: 'Michael Schoonjans and Steve Davies', title: 'Serving Cathedral parish life and ministry' },
]

export default function AboutPage() {
    return (
        <div>
            <PageHero
                title="About St Mary's Cathedral"
                subtitle="Mother church of the Diocese of Wrexham and home to a welcoming parish community"
            />

            <section className="section">
                <div className="container about-history">
                    <div className="history-text">
                        <h2 className="about-heading">Our History</h2>
                        <p>
                            After the Reformation, Catholics in Wrexham continued to practise their faith in difficult circumstances, often gathering for Mass in private homes and hidden chapels. Saint Richard Gwyn, the local schoolmaster and martyr, remains one of the great witnesses from that period.
                        </p>
                        <p>
                            As legal restrictions eased, Saint David's Chapel was built in 1828, but the growing Catholic population soon required a larger church. In 1856 Richard Thompson commissioned the present church on Regent Street in memory of his wife Ellen, and the building opened on 19 November 1857.
                        </p>
                        <p>
                            Designed by Edward Welby Pugin in the Decorated Gothic style, the church later became the pro-cathedral of Menevia in 1907 and was elevated to cathedral status when the Diocese of Wrexham was created in 1987. Its stained glass, cloister, shrine of St Richard Gwyn, and memorials continue to tell the story of faith in North Wales.
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

            <section className="section">
                <div className="container about-diocese">
                    <div className="diocese-text">
                        <h2 className="about-heading">Our Diocese</h2>
                        <p>
                            The Diocese of Wrexham was created in 1987 and serves Catholic communities across North Wales. St Mary's Cathedral is its episcopal seat and the focal point for major diocesan liturgies and celebrations.
                        </p>
                        <p>
                            Cathedral life is shaped by clergy, deacons, religious sisters, schools, volunteers, and parish families. The community has been enriched over time by people from many national and cultural backgrounds, including Polish, Italian, Filipino, and other international communities.
                        </p>
                        <p>
                            Today the Cathedral continues to support worship, education, sacramental preparation, pastoral care, and outreach as part of the wider life of the Diocese of Wrexham.
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

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <h2 className="section-title">Cathedral Leadership</h2>
                    <div className="grid-3" style={{ marginTop: '40px' }}>
                        {staff.map(s => (
                            <div key={s.role} className="card staff-card">
                                <div className="staff-avatar">SM</div>
                                <h3 className="staff-role">{s.role}</h3>
                                <p className="staff-name">{s.name}</p>
                                <p className="staff-title">{s.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mission-banner">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="mission-title">Our Mission</h2>
                    <p className="mission-quote">
                        "To be a welcoming Cathedral parish, centred on Christ and the Eucharist, helping people grow in faith, prayer, service, and fellowship."
                    </p>
                </div>
            </section>
        </div>
    )
}
