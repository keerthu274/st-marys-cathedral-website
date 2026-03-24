import { NewsHero, NewsIntro, NewsCTA, SubscribeSection } from '../components/news/NewsEventsSections'
import { Link } from 'react-router-dom'

export default function WeeklyNewsletterPage() {
    return (
        <div className="news-events-page">
            <NewsHero title="Weekly Newsletter" subtitle="Stay informed about parish life, Mass times, and upcoming events." image="https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=1600" breadcrumb="Weekly Newsletter" />
            <NewsIntro title="Digital Cathedral Bulletin" text="The weekly newsletter is the main place to check weekday Mass times, extra services of Reconciliation during Lent, annual commemorations, pilgrimages, social events, and parish notices. The Clarion diocesan newsletter is also part of the parish's communications." />

            <div className="container" style={{ padding: '40px 0' }}>
                <div className="newsletter-preview-card">
                    <div style={{ textAlign: 'center', borderBottom: '2px solid var(--gold)', paddingBottom: '20px', marginBottom: '30px' }}>
                        <h2 className="text-navy" style={{ fontFamily: 'Playfair Display' }}>Parish Newsletter</h2>
                        <p style={{ color: 'var(--gold)', fontWeight: 700 }}>Weekly parish notices and liturgical updates</p>
                    </div>

                    <div className="newsletter-inner-section">
                        <h4>What You&apos;ll Usually Find</h4>
                        <p className="text-mid" style={{ lineHeight: '1.6' }}>
                            • Weekday Mass times and confession updates<br />
                            • Seasonal services such as Lent and Holy Week<br />
                            • Feast days, annual commemorative Masses, and diocesan celebrations<br />
                            • Social events, fundraising, pilgrimages, and parish activities
                        </p>
                    </div>

                    <div className="newsletter-inner-section">
                        <h4>Liturgical Calendar And Annual Celebrations</h4>
                        <ul className="text-mid" style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                            <li>Marriage Mass</li>
                            <li>Legal Mass</li>
                            <li>Medical Mass</li>
                            <li>Makhel Mass and feast days</li>
                            <li>Annual Mass near the feast of Saint Richard Gwyn</li>
                        </ul>
                    </div>

                    <div className="newsletter-inner-section" style={{ borderBottom: 'none' }}>
                        <h4>Clarion Diocesan Newsletter</h4>
                        <p className="text-mid" style={{ fontStyle: 'italic' }}>
                            The parish also highlights the Clarion diocesan newsletter so parishioners can stay connected with wider diocesan news and events.
                        </p>
                    </div>

                    <div style={{ marginTop: '30px', textAlign: 'center' }}>
                        <button className="btn-gold">Download Full PDF Bulletin</button>
                    </div>
                </div>
            </div>

            <SubscribeSection />

            <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <h3 className="text-navy" style={{ fontFamily: 'Playfair Display', marginBottom: '20px' }}>Looking for Past Editions?</h3>
                <Link to="/newsletter-archive" className="btn-gold-outline">Browse Newsletter Archive</Link>
            </div>

            <NewsCTA title="Church Life in Your Inbox" description="Subscribe to receive weekly updates from St Mary's Cathedral directly to your device." buttonText="Subscribe Now" buttonLink="/contact" />
        </div>
    )
}
