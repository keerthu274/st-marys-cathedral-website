import { Link } from 'react-router-dom'
import { ParishHero, ParishIntro, ParishInfoCards, ParishCTA, RelatedParishLinks } from '../components/parish/ParishSections'

const fundraisingActivities = [
    {
        icon: '🎫',
        title: 'Charity Events',
        content: 'From parish fayres and concerts to trivia nights, our events bring the community together for a good cause.'
    },
    {
        icon: '📢',
        title: 'Community Appeals',
        content: 'Targeted appeals for specific needs, such as the Cathedral Building Project or local poverty relief programs.'
    },
    {
        icon: '🤲',
        title: 'Donation Campaigns',
        content: 'Regular giving programs that allow us to maintain our services and reach out to those in need throughout Wrexham.'
    },
    {
        icon: '🌟',
        title: 'Volunteer Support',
        content: 'Fundraising isn\'t just about money—your time and skills in organizing and supporting events are invaluable.'
    }
]

export default function FundraisingPage() {
    return (
        <div className="parish-page">
            <ParishHero 
                title="Fundraising"
                subtitle="Supporting our parish mission and outreach together"
                image="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600"
                breadcrumb="Fundraising"
            />
            
            <ParishIntro 
                title="Building a Legacy of Care"
                text="The mission of St Mary's Cathedral depends on the generosity and collaborative spirit of our parishioners. Every pound raised through our various initiatives helps us provide spiritual care, maintain our historic cathedral, and support the vulnerable in our wider community."
            />

            <ParishInfoCards cards={fundraisingActivities} columns={2} />

            <section className="section" style={{ background: '#fcfaf6', padding: '60px 0' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '40px' }}>
                        <div>
                            <h2 className="text-navy" style={{ fontFamily: 'Playfair Display', fontSize: '1.8rem', marginBottom: '20px' }}>How Your Funds are Used</h2>
                            <p className="text-mid" style={{ marginBottom: '16px', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                We are committed to complete transparency in our financial management. Your contributions support:
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {['Daily Parish Operations & Liturgy', 'Maintenance of Historic Cathedral Buildings', 'Cathedral Outreach & Food Support Programs', 'Youth & Family Formation Ministries'].map((item, i) => (
                                    <li key={i} style={{ marginBottom: '10px', display: 'flex', gap: '10px', alignItems: 'center', fontWeight: 600, color: 'var(--navy)', fontSize: '0.9rem' }}>
                                        <span style={{ color: 'var(--gold)' }}>✔</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: 'var(--white)', padding: '30px', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                            <h3 className="text-navy" style={{ marginBottom: '16px', fontSize: '1.3rem' }}>Make a Difference Today</h3>
                            <p style={{ marginBottom: '20px', fontSize: '0.95rem' }}>Choose a way to support that works for you, from one-off donations to regular monthly giving.</p>
                            <Link to="/donate" className="btn-gold" style={{ width: '100%', textAlign: 'center', display: 'block' }}>Go to Donation Page</Link>
                        </div>
                    </div>
                </div>
            </section>

            <ParishCTA 
                title="Get Involved in Fundraising"
                description="Have an idea for an event or want to volunteer your time? We would love to hear from you."
                buttons={[
                    { text: 'Donate Now', link: '/donate', primary: true },
                    { text: 'Get Involved', link: '/contact' }
                ]}
            />

            <RelatedParishLinks current="Fundraising" />
        </div>
    )
}
