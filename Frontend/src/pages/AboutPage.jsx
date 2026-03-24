import PageHero from '../components/PageHero'
import './AboutPage.css'

const values = [
    { icon: 'F', title: 'Faith', desc: 'Rooted in worship, prayer, the sacraments, and devotion.' },
    { icon: 'C', title: 'Community', desc: 'A welcoming Cathedral parish serving Wrexham and Coedpoeth.' },
    { icon: 'S', title: 'Service', desc: 'Committed to pastoral care, home visits, safeguarding, and volunteering.' },
    { icon: 'G', title: 'Growth', desc: 'Growing through formation, schools, RCIA, and parish life.' },
]

const staff = [
    { role: 'Bishop of Wrexham', name: 'Bishop Peter Brignall', title: 'Diocesan Bishop' },
    { role: 'Cathedral Dean', name: 'Fr Nicolas Enzama', title: 'Cathedral Dean and Parish Priest' },
    { role: 'Permanent Deacons', name: 'Deacon Michael Schoonjans and Deacon Steve Davies', title: 'Serving Cathedral parish life and ministry' },
    { role: 'Religious Sisters', name: 'Sisters of the Holy Family and the Evangelising Sisters of Mary', title: 'Part of Cathedral parish life' },
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
                        <h2 className="about-heading">Croeso / Welcome</h2>
                        <p>
                            Welcome to the Wrexham Diocese Cathedral Church of Our Lady of Sorrows, St Mary&apos;s Cathedral, home to St Mary&apos;s Cathedral Parish and the Church of the Holy Family, Coedpoeth.
                        </p>
                        <p>
                            St Mary&apos;s Cathedral is on Regent Street, Wrexham, LL11 1RB. Telephone: 01978 263943. Email: secretarywrexhamcathedral@rcdwxm.org.uk. Office hours are Tuesday, Wednesday, and Friday from 9.30am to 2.30pm.
                        </p>
                        <p>
                            The Cathedral is both the mother church of the Diocese of Wrexham and a living parish community serving worship, formation, pastoral care, and outreach.
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
                    <h2 className="section-title">Cathedral Leadership</h2>
                    <div className="grid-4" style={{ marginTop: '40px' }}>
                        {staff.map((person) => (
                            <div key={person.role} className="card staff-card">
                                <div className="staff-avatar">SM</div>
                                <h3 className="staff-role">{person.role}</h3>
                                <p className="staff-name">{person.name}</p>
                                <p className="staff-title">{person.title}</p>
                            </div>
                        ))}
                    </div>
                    <div className="content-grid" style={{ marginTop: '24px' }}>
                        <div className="content-card">
                            <h3>Religious Communities</h3>
                            <p>
                                The Sisters of the Holy Family Convent have been part of Cathedral parish life for more than 75 years. The PowerPoint also notes the 2025 welcome to the Missionary Congregation of the Evangelising Sisters of Mary.
                            </p>
                            <p>
                                Named sisters in the presentation include Sr Maria, Sr Celine, Sr Sheila, Sr Triphosa, Sr Jacqueline, and Sr Annlydia.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>People Of The Cathedral</h3>
                            <p>
                                Cathedral life has been shaped by clergy, deacons, religious sisters, schools, volunteers, and families from many backgrounds, including Polish, Italian, Filipino, and other international communities who have enriched the parish over time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">History of the Cathedral</h2>
                    <div className="content-stack" style={{ marginTop: '40px' }}>
                        <div className="content-card">
                            <h3>Before the Cathedral</h3>
                            <p>
                                After the Reformation, Catholics in Wrexham were left without a church of their own and often gathered for Mass in private homes or hidden chapels. Saint Richard Gwyn, a local schoolmaster, was executed in 1584 for his Catholic faith and became a martyr and inspiration for later generations.
                            </p>
                            <p>
                                As restrictions gradually eased, Saint David&apos;s Chapel was built on King Street in 1828 on land purchased by John Thompson. The growing Catholic population eventually needed a larger church.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>The Construction of St Mary&apos;s</h3>
                            <p>
                                In 1856, Richard Thompson commissioned the church on Regent Street in memory of his wife Ellen. Edward Welby Pugin designed it in the Decorated Gothic style, and it opened on 19 November 1857 dedicated to Our Lady of Sorrows.
                            </p>
                            <p>
                                Over time the church gained stained glass, a new altar, family tombs, a rebuilt and enlarged spire, a parish hall in 1911, and later a cloister and side chapel. It became the pro-cathedral in 1907 and was elevated to cathedral status in 1987 when the Diocese of Wrexham was created.
                            </p>
                        </div>
                        <div className="quote-panel">
                            “This beautiful structure, which has attracted so much attention and caused so much admiration in the town, is one of the most beautiful specimens of church architecture in the Principality.”
                        </div>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <h2 className="section-title">Art And Artefacts</h2>
                    <div className="content-grid" style={{ marginTop: '40px' }}>
                        <div className="content-card">
                            <h3>Stained Glass</h3>
                            <p>
                                The Cathedral&apos;s stained glass is one of its most striking artistic features, much of it produced by Hardman &amp; Co. in the late nineteenth century. The rose window portrays the sorrow of the Virgin Mary at the death of Jesus, and a more recent window by students from Wrexham Art College depicts Saint Richard Gwyn.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>Memorials And Sacred Objects</h3>
                            <p>
                                Highlights mentioned in the PowerPoint include the tomb of Ellen Thompson, a relic shrine of Saint Richard Gwyn, a memorial to Flight Lieutenant David Lord VC, the Polish icon of Our Lady of Czestochowa, a statue of Santo Nino, and the Baptismal font.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Saint Richard Gwyn</h2>
                    <div className="content-card" style={{ marginTop: '40px' }}>
                        <h3>Wrexham&apos;s Martyr</h3>
                        <p>
                            Richard Gwyn was a Welsh schoolteacher known for his learning, poetry, wit, and steadfast Catholic faith during the upheaval of the Reformation. He was imprisoned several times and eventually executed in Wrexham in 1584 for remaining loyal to the Catholic Church and supporting missionary priests.
                        </p>
                        <p>
                            Witnesses remembered his calmness, forgiveness, and courage. He was canonised by Pope Paul VI in 1970 and remains a powerful example of conscience, integrity, and faith. The parish notes a commemorative Mass each year near 15 October.
                        </p>
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <h2 className="section-title">Our Values</h2>
                    <div className="grid-4" style={{ marginTop: '40px' }}>
                        {values.map((value) => (
                            <div key={value.title} className="card value-card">
                                <div className="value-icon">{value.icon}</div>
                                <h3 className="value-title">{value.title}</h3>
                                <p className="value-desc">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mission-banner">
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="mission-title">Our Mission</h2>
                    <p className="mission-quote">
                        To be a welcoming Cathedral parish, centred on Christ and the Eucharist, helping people grow in faith, prayer, service, and fellowship.
                    </p>
                </div>
            </section>
        </div>
    )
}
