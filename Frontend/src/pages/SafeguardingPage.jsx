import { ParishHero, ParishIntro, ParishInfoCards, ParishCTA, RelatedParishLinks } from '../components/parish/ParishSections'

const policyCards = [
    {
        title: 'Safeguarding Policy',
        content: 'Our comprehensive guidelines for ensuring the safety of children and vulnerable adults in all parish activities.'
    },
    {
        title: 'Privacy Policy',
        content: 'Information on how we collect, use, and protect your personal data in accordance with GDPR.'
    },
    {
        title: 'Accessibility Statement',
        content: 'Our commitment to making the Cathedral and its digital services accessible to everyone.'
    },
    {
        title: 'Child Protection',
        content: 'Specific guidance and reporting procedures for the protection of minors involved in our ministries.'
    }
]

export default function SafeguardingPage() {
    return (
        <div className="parish-page">
            <ParishHero 
                title="Policies & Safeguarding"
                subtitle="Protecting the wellbeing and safety of our entire parish community"
                image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600"
                breadcrumb="Safeguarding"
            />
            
            <ParishIntro 
                title="Our Commitment to Safety"
                text="St Mary's Cathedral is committed to the safeguarding of all children, young people, and vulnerable adults. We believe that everyone has a right to feel safe and respected within our church community. Our policies are regularly reviewed to ensure the highest standards of protection and care."
            />

            <ParishInfoCards cards={policyCards} columns={2} />

            <section className="section" style={{ background: '#fcfaf6' }}>
                <div className="container">
                    <div className="card" style={{ maxWidth: '800px', margin: '0 auto', borderLeft: '5px solid var(--gold)' }}>
                        <h2 className="text-navy" style={{ marginBottom: '24px' }}>Contact Our Safeguarding Officer</h2>
                        <p style={{ marginBottom: '24px' }}>If you have any concerns regarding the safety or wellbeing of a child or adult in the parish, please contact us immediately.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <h4 style={{ color: 'var(--gold)', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase' }}>Name</h4>
                                <p style={{ fontWeight: 700, fontSize: '1.2rem', margin: '4px 0 0' }}>Parish Safeguarding Lead</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--gold)', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase' }}>Email</h4>
                                <p style={{ fontWeight: 700, fontSize: '1.2rem', margin: '4px 0 0' }}>safeguarding@stmarys.org</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--gold)', margin: 0, fontSize: '0.8rem', textTransform: 'uppercase' }}>Phone</h4>
                                <p style={{ fontWeight: 700, fontSize: '1.2rem', margin: '4px 0 0' }}>01234 567890</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ParishCTA 
                title="Need More Information?"
                description="Additional resources and guidance from the Diocese of Wrexham are also available."
                buttons={[
                    { text: 'Contact Safeguarding Officer', link: '/contact?subject=Safeguarding Enquiry', primary: true }
                ]}
            />

            <RelatedParishLinks current="Safeguarding" />
        </div>
    )
}
