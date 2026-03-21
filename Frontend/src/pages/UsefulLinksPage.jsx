import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './UsefulLinksPage.css'

const categories = [
    {
        title: "Diocese & Local",
        icon: "📍",
        links: [
            { 
                title: "Diocese of Wrexham", 
                desc: "Official website for the Catholic Diocese of Wrexham.", 
                url: "https://www.wrexhamdiocese.org.uk/" 
            },
            { 
                title: "Catholic Church in Wales", 
                desc: "Information and resources for the Catholic community across Wales.", 
                url: "https://www.catholicchurch.org.uk/catholic-church/wales/" 
            },
            { 
                title: "Nearby Parishes", 
                desc: "Find Mass times and information for other parishes within the local deanery.", 
                url: "/events" 
            }
        ]
    },
    {
        title: "Catholic Church",
        icon: "⛪",
        links: [
            { 
                title: "The Holy See (Vatican)", 
                desc: "Official website of the Vatican and Pope Francis.", 
                url: "https://www.vatican.va/content/vatican/en.html" 
            },
            { 
                title: "Catholic Bishops' Conference of England & Wales", 
                desc: "Official organisation representing Catholic bishops across England and Wales.", 
                url: "https://www.cbcew.org.uk/" 
            },
            { 
                title: "Catholic News Service", 
                desc: "Global Catholic news and reporting from a Catholic perspective.", 
                url: "https://www.catholicnews.com/" 
            }
        ]
    },
    {
        title: "Prayer & Formation",
        icon: "🙏",
        links: [
            { 
                title: "Universalis", 
                desc: "Daily Mass readings, Liturgy of the Hours, and spiritual resources.", 
                url: "https://universalis.com/" 
            },
            { 
                title: "EWTN", 
                desc: "Global Catholic television, radio, and news network.", 
                url: "https://www.ewtn.com/" 
            },
            { 
                title: "CatholicCulture.org", 
                desc: "Resources for liturgy, Church history, saints, and Catholic life.", 
                url: "https://www.catholicculture.org/" 
            }
        ]
    },
    {
        title: "Charities & Organisations",
        icon: "🤝",
        links: [
            { 
                title: "CAFOD", 
                desc: "Catholic Agency for Overseas Development supporting global relief and development.", 
                url: "https://cafod.org.uk/" 
            },
            { 
                title: "Catholic Children's Society", 
                desc: "Supporting disadvantaged children and families.", 
                url: "https://www.cathchild.org.uk/" 
            },
            { 
                title: "St Vincent de Paul Society", 
                desc: "Voluntary organisation dedicated to tackling poverty and supporting those in need.", 
                url: "https://www.svp.org.uk/" 
            }
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
                image="https://images.unsplash.com/photo-1548625313-0404975d49bb?q=80&w=1600"
            />

            <section className="section">
                <div className="container">

                    {/* Featured Resource Cards */}
                    <div className="links-summary-grid">
                        <div className="links-feature-card">
                            <div className="links-feature-icon">⛪</div>
                            <h2 className="links-feature-title">Diocese of Wrexham</h2>
                            <p className="links-feature-desc">Access news, pastoral letters, diocesan announcements, and official information from the Diocese of Wrexham.</p>
                            <a href="https://www.wrexhamdiocese.org.uk/" target="_blank" rel="noopener noreferrer" className="links-feature-btn">View Links →</a>
                        </div>
                        <div className="links-feature-card" style={{ background: 'var(--navy-light)' }}>
                            <div className="links-feature-icon">📖</div>
                            <h2 className="links-feature-title">Catholic Resources</h2>
                            <p className="links-feature-desc">Explore spiritual resources, Catholic media, daily readings, and faith formation materials.</p>
                            <a href="https://universalis.com/" target="_blank" rel="noopener noreferrer" className="links-feature-btn">View Links →</a>
                        </div>
                    </div>

                    {/* Link Categories */}
                    <div className="links-categories-container">
                        {categories.map(cat => (
                            <div key={cat.title} className="links-category-card">
                                <h2 className="links-category-title">
                                    <span style={{ fontSize: '1.2em' }}>{cat.icon}</span>
                                    {cat.title}
                                </h2>
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

                    {/* Suggest a Link Section */}
                    <div className="suggestion-section">
                        <h2 className="suggestion-title">Have a Suggestion?</h2>
                        <p className="suggestion-desc">If you know of a valuable Catholic resource that should be added to our Useful Links page, please let us know.</p>
                        <Link to="/contact" className="btn-primary" style={{ padding: '14px 40px', borderRadius: '30px' }}>Contact Us</Link>
                    </div>

                </div>
            </section>
        </div>
    )
}
