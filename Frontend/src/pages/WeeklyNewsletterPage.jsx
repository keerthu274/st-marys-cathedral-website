import { NewsHero, NewsIntro, NewsCTA, SubscribeSection } from '../components/news/NewsEventsSections'
import { Link } from 'react-router-dom'

export default function WeeklyNewsletterPage() {
    return (
        <div className="news-events-page">
            <NewsHero 
                title="Weekly Newsletter"
                subtitle="Stay informed about parish life, Mass times, and upcoming events."
                image="https://images.unsplash.com/photo-1504173010664-32509aeebb62?q=80&w=1600"
                breadcrumb="Weekly Newsletter"
            />
            
            <NewsIntro 
                title="Digital Cathedral Bulletin"
                text="The weekly newsletter is our primary way of sharing liturgical updates and community news. Below you'll find the highlights for the current week. To receive the full PDF version, please subscribe below."
            />

            <div className="container" style={{ padding: '40px 0' }}>
                <div className="newsletter-preview-card">
                    <div style={{ textAlign: 'center', borderBottom: '2px solid var(--gold)', paddingBottom: '20px', marginBottom: '30px' }}>
                        <h2 className="text-navy" style={{ fontFamily: 'Playfair Display' }}>Parish Newsletter</h2>
                        <p style={{ color: 'var(--gold)', fontWeight: 700 }}>Sunday, March 16, 2026 | Third Sunday of Lent</p>
                    </div>

                    <div className="newsletter-inner-section">
                        <h4>Parish Announcements</h4>
                        <p className="text-mid" style={{ lineHeight: '1.6' }}>
                             • <strong>Lent Almsgiving:</strong> This year, our collections will support a local youth charity. Special envelopes are available at the back of the Cathedral.<br/>
                             • <strong>St. Joseph's Feast Day:</strong> Mass on Wednesday at 10:00 AM will be followed by refreshments in the Parish Hall.
                        </p>
                    </div>

                    <div className="newsletter-inner-section">
                        <h4>Upcoming Events This Week</h4>
                        <ul className="text-mid" style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                            <li>Monday 19:00 - Rosary Circle (Blessed Sacrament Chapel)</li>
                            <li>Tuesday 10:30 - Mother and Toddler Group (Hall)</li>
                            <li>Friday 18:00 - Stations of the Cross (Main Cathedral)</li>
                        </ul>
                    </div>

                    <div className="newsletter-inner-section" style={{ borderBottom: 'none' }}>
                        <h4>Mass Schedule Changes</h4>
                        <p className="text-mid" style={{ fontStyle: 'italic' }}>
                            Please note that due to the Diocesan Clergy Meeting, morning Mass on Thursday will be at 8:00 AM instead of 10:00 AM.
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

            <NewsCTA 
                title="Church Life in Your Inbox"
                description="Subscribe to receive weekly updates from St Mary's Cathedral directly to your device."
                buttonText="Subscribe Now"
                buttonLink="/contact"
            />
        </div>
    )
}
