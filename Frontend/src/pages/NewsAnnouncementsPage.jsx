import { Link } from 'react-router-dom'
import { NewsHero, NewsIntro, NewsGrid, NewsCTA, SubscribeSection } from '../components/news/NewsEventsSections'

const newsArticles = [
    {
        date: 'March 15, 2026',
        title: 'Parish Community Day Success',
        summary: 'Thank you to everyone who joined us for our community day! It was a beautiful afternoon of faith, food, and friendship.',
        image: 'https://images.unsplash.com/photo-1530023367847-a683933f4172?q=80&w=800'
    },
    {
        date: 'March 10, 2026',
        title: 'Christmas Mass Schedule Announced',
        summary: 'Plan ahead for the festive season. View our full liturgical schedule for Christmas Eve and Christmas Day services.',
        image: 'https://images.unsplash.com/photo-1513297845732-457147495634?q=80&w=800'
    },
    {
        date: 'March 05, 2026',
        title: 'New Youth Ministry Programme',
        summary: 'We are excited to launch our new youth activities focusing on social action and community service. Registration is now open.',
        image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=800'
    },
    {
        date: 'February 28, 2026',
        title: 'Parish Charity Initiative: Food Bank Drive',
        summary: 'Join us in supporting our local food bank this Lent. We are collecting non-perishable items at all weekend Masses.',
        image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800'
    }
]

export default function NewsAnnouncementsPage() {
    return (
        <div className="news-events-page">
            <NewsHero 
                title="News & Announcements"
                subtitle="Read the latest updates and announcements from St Mary’s Cathedral."
                image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600"
                breadcrumb="News & Announcements"
            />
            
            <NewsIntro 
                title="Latest from the Cathedral"
                text="Stay up to date with the stories that shape our parish life. From major announcements to community highlights, this is your source for what's happening at St Mary's."
            />

            <NewsGrid articles={newsArticles} />

            <section className="section" style={{ background: '#fcfaf6', padding: '60px 0' }}>
                <div className="container">
                    <div className="grid-2" style={{ gap: '60px', alignItems: 'center' }}>
                        <div>
                            <h2 className="text-navy" style={{ fontFamily: 'Playfair Display', marginBottom: '20px' }}>Recent Posts</h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
                                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>MAR 12</span>
                                    <h4 style={{ color: 'var(--navy)', marginTop: '5px' }}>Lent Reflection: A Journey of Faith</h4>
                                </li>
                                <li style={{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
                                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>MAR 08</span>
                                    <h4 style={{ color: 'var(--navy)', marginTop: '5px' }}>Cathedral Organ Restoration Update</h4>
                                </li>
                                <li style={{ padding: '15px 0' }}>
                                    <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>MAR 02</span>
                                    <h4 style={{ color: 'var(--navy)', marginTop: '5px' }}>Invitation to Adult Confirmation Classes</h4>
                                </li>
                            </ul>
                        </div>
                        <SubscribeSection />
                    </div>
                </div>
            </section>

            <NewsCTA 
                title="Want to Stay Notified?"
                description="Sign up for our digital alerts to receive the latest announcements directly in your inbox as they happen."
                buttonText="Sign Up for Digital Alerts"
                buttonLink="/contact"
            />
        </div>
    )
}
