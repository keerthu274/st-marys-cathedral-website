import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './UsefulLinksPage.css'

const categories = [
    {
        title: "Diocese & Local",
        links: [
            { title: "Diocese of Wrexham", desc: "Official website for the Catholic Diocese of Wrexham.", url: "#" },
            { title: "Catholic Church in Wales", desc: "Information and resources for the Catholic community across Wales.", url: "#" },
            { title: "Nearby Parishes", desc: "Find mass times and information for other parishes in our deanery.", url: "#" }
        ]
    },
    {
        title: "Catholic Church",
        links: [
            { title: "The Holy See (Vatican)", desc: "Official website of the Vatican and Pope Francis.", url: "#" },
            { title: "Catholic Bishops' Conference of England & Wales", desc: "Official organisation of the Catholic Episcopate.", url: "#" },
            { title: "Catholic News Service", desc: "Global news and reporting from a Catholic perspective.", url: "#" }
        ]
    },
    {
        title: "Prayer & Formation",
        links: [
            { title: "Universalis", desc: "Daily Mass readings, Liturgy of the Hours, and spiritual resources.", url: "#" },
            { title: "EWTN", desc: "Global Catholic Television, Radio, and News Network.", url: "#" },
            { title: "CatholicCulture.org", desc: "Resources for liturgy, Church history, and Catholic living.", url: "#" }
        ]
    },
    {
        title: "Charities & Organizations",
        links: [
            { title: "CAFOD", desc: "Catholic Agency for Overseas Development.", url: "#" },
            { title: "Catholic Children's Society", desc: "Supporting disadvantaged children and families.", url: "#" },
            { title: "St Vincent de Paul Society", desc: "Voluntary organisation dedicated to tackling poverty and disadvantage.", url: "#" }
        ]
    }
]

export default function UsefulLinksPage() {
    return (
        <div className="links-page">
            <PageHero
                icon="🌐"
                title="Useful Links"
                subtitle="A curated collection of resources, organisations, and information for our Catholic community."
                centered={true}
            />

            <section className="section">
                <div className="container">

                    {/* Top Summary Cards */}
                    <div className="links-summary-grid">
                        <div className="links-feature-card">
                            <div className="links-feature-icon">⛪</div>
                            <h2 className="links-feature-title">Diocese of Wrexham</h2>
                            <p className="links-feature-desc">Access news, spiritual resources, and official information from our Diocesan office.</p>
                            <a href="#" className="links-feature-btn">View Links →</a>
                        </div>
                        <div className="links-feature-card">
                            <div className="links-feature-icon">📖</div>
                            <h2 className="links-feature-title">Catholic Resources</h2>
                            <p className="links-feature-desc">Deepen your faith with daily readings, prayers, and reliable Catholic media.</p>
                            <a href="#" className="links-feature-btn">View Links →</a>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="links-categories-container">
                        {categories.map(cat => (
                            <div key={cat.title} className="links-category-card">
                                <h2 className="links-category-title">{cat.title}</h2>
                                <ul className="links-list">
                                    {cat.links.map(link => (
                                        <li key={link.title} className="links-item">
                                            <a href={link.url} className="links-link" target="_blank" rel="noopener noreferrer">
                                                <div className="link-external-icon">↗</div>
                                                <div className="link-content">
                                                    <h3 className="link-title">{link.title}</h3>
                                                    <p className="link-desc">{link.desc}</p>
                                                </div>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Suggestion CTA */}
                    <div className="suggestion-section">
                        <h2 className="suggestion-title">Have a Suggestion?</h2>
                        <p className="suggestion-desc">If you know of a valuable Catholic resource that should be added to our useful links page, please let us know.</p>
                        <Link to="/contact" className="btn-primary" style={{ padding: '12px 32px' }}>Contact Us</Link>
                    </div>

                </div>
            </section>
        </div>
    )
}
