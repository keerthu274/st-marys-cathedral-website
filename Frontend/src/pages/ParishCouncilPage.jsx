import { ParishHero, ParishIntro, ParishMembers, ParishCTA, RelatedParishLinks } from '../components/parish/ParishSections'

const councilMembers = [
    { name: 'Fr. Matthew', role: 'Parish Priest', photo: '⛪' },
    { name: 'John Smith', role: 'Chairperson', photo: '👤' },
    { name: 'Sarah Williams', role: 'Secretary', photo: '👤' },
    { name: 'Michael Brown', role: 'Treasurer', photo: '👤' },
    { name: 'Elena Garcia', role: 'Lead Volunteer', photo: '👤' },
    { name: 'David Jones', role: 'Parish Rep', photo: '👤' }
]

const responsibilities = [
    {
        title: 'Support Administration',
        content: 'Assisting the Parish Priest in the day-to-day management and spiritual direction of the cathedral.'
    },
    {
        title: 'Plan Activities',
        content: 'Designing and coordinating community events, liturgical celebrations, and outreach programs.'
    },
    {
        title: 'Represent Community',
        content: 'Ensuring that the voices and needs of all parishioners are heard and addressed in our decision-making.'
    }
]

export default function ParishCouncilPage() {
    return (
        <div className="parish-page">
            <ParishHero 
                title="Parish Council"
                subtitle="Supporting the pastoral and community life of the cathedral"
                image="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600"
                breadcrumb="Parish Council"
            />
            
            <ParishIntro 
                title="Leadership Through Service"
                text="The Parish Council is a group of dedicated parishioners who consult with the Parish Priest to promote the spiritual and practical growth of our community. Together, they work to implement the mission of the Church and ensure the cathedral remains a vibrant center of faith for Wrexham."
            />

            <ParishMembers members={councilMembers} />

            <section className="section" style={{ background: '#fcfaf6' }}>
                <div className="container">
                    <h2 className="section-title">Core Responsibilities</h2>
                    <div className="grid-3" style={{ marginTop: '48px' }}>
                        {responsibilities.map((res, index) => (
                            <div key={index} className="card" style={{ textAlign: 'center' }}>
                                <h3 className="text-navy" style={{ marginBottom: '16px', fontFamily: 'Playfair Display' }}>{res.title}</h3>
                                <p className="text-mid" style={{ lineHeight: '1.6' }}>{res.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ParishIntro 
                title="Meeting Information"
                text="The Council typically meets on the third Tuesday of every month. Minutes from recent meetings are available for review at the Parish Office. If you have a topic you would like to bring to the council's attention, please contact the secretary."
            />

            <ParishCTA 
                title="Get in Touch with the Council"
                description="Do you have suggestions or concerns regarding parish life? We are here to listen and serve our community."
                buttons={[
                    { text: 'Contact Parish Office', link: '/contact', primary: true }
                ]}
            />

            <RelatedParishLinks current="Parish Council" />
        </div>
    )
}
