import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './OurParishPage.css'

const sections = [
    { icon: '⛪', title: 'About the Cathedral', desc: 'Discover the rich history and heritage of St Mary\'s Cathedral, serving Wrexham for over 150 years.', bg: '#EBF4FF' },
    { icon: '👥', title: 'Parish Council', desc: 'Meet the dedicated members who assist in the pastoral care and administration of our parish.', bg: '#F3E8FF' },
    { icon: '♡', title: 'Parish Groups', desc: 'Join one of our vibrant parish groups and become an active part of our community.', bg: '#FCE7F3' },
    { icon: '👤+', title: 'Get Involved', desc: 'Discover the many ways you can serve and contribute to our parish community.', bg: '#D1FAE5' },
    { icon: '🏢', title: 'Building Project', desc: 'Learn about our cathedral restoration project to preserve this historic building.', bg: '#FEF3C7' },
    { icon: '$', title: 'Fundraising', desc: 'Support our parish through various fundraising initiatives and events.', bg: '#FFEDD5' },
    { icon: '🛡', title: 'Policies & Safeguarding', desc: 'View our parish policies, safeguarding information, and child protection guidelines.', bg: '#FFE4E6' },
]

export default function OurParishPage() {
    return (
        <div>
            <PageHero
                icon="⛪"
                title="Our Parish"
                subtitle="St Mary's Cathedral is more than a building – it's a vibrant community of faith. Explore our parish life, get involved, and become part of our family."
                centered={true}
            />

            <section className="section">
                <div className="container">
                    <div className="parish-grid">
                        {sections.map(s => (
                            <div key={s.title} className="card parish-card">
                                <div className="parish-icon-strip" style={{ background: s.bg }}>{s.icon}</div>
                                <div className="parish-card-content">
                                    <h3 className="parish-card-title">{s.title}</h3>
                                    <p className="parish-card-desc">{s.desc}</p>
                                    <span className="read-more">Learn More →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* New to Parish CTA */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">New to Our Parish?</h2>
                    <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto 28px' }}>
                        We warmly welcome you to St Mary's Cathedral. Whether you're new to the area or seeking a spiritual home, we invite you to join our community. Register as a parishioner and discover the many ways to get involved.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <Link to="/registration" className="btn-primary">Register as Parishioner</Link>
                        <Link to="/contact" className="btn-outline">Contact Us</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
