import { ParishHero, ParishIntro, ParishInfoCards, ParishTimeline, ParishCTA, RelatedParishLinks } from '../components/parish/ParishSections'

const projectCards = [
    {
        icon: '🧱',
        title: 'Restoration Work',
        content: 'Preserving the original stonework, stained glass, and historic features of our cathedral for future generations.'
    },
    {
        icon: '♿',
        title: 'Accessibility',
        content: 'Installing new ramps and specialized seating to ensure everyone can participate in our liturgy.'
    },
    {
        icon: '🏢',
        title: 'Community Facilities',
        content: 'Upgrading the Parish Center to provide better spaces for meetings, social events, and community support.'
    },
    {
        icon: '🗺️',
        title: 'Future Plans',
        content: 'Long-term sustainability projects including energy-efficient lighting and localized heritage education.'
    }
]

const projectTimeline = [
    {
        date: '2023',
        title: 'Initial Survey',
        content: 'Comprehensive structural assessment and heritage impact report completed by specialist architects.'
    },
    {
        date: '2024',
        title: 'Phase 1: Roof & Exterior',
        content: 'Critical repairs to the cathedral roof and stone conservation to prevent structural decay.'
    },
    {
        date: '2025',
        title: 'Phase 2: Interior & Accessibility',
        content: 'Restoration of the Nave, installation of the accessibility ramp, and upgrading lighting.'
    },
    {
        date: '2026',
        title: 'Completion & Dedication',
        content: 'Final aesthetic touches and a community celebration of the restored cathedral.'
    }
]

export default function BuildingProjectPage() {
    return (
        <div className="parish-page">
            <ParishHero 
                title="Building Project"
                subtitle="Preserving our magnificent cathedral for future generations"
                image="https://images.unsplash.com/photo-1548625361-195fe27741f2?q=80&w=1600"
                breadcrumb="Building Project"
            />
            
            <ParishIntro 
                title="A Vision for the Future"
                text="St Mary's Cathedral has been the heart of Wrexham for over 150 years. Our current building project is a vital undertaking to restore the historic beauty of the cathedral while ensuring it meets the needs of a modern parish."
            />

            <ParishInfoCards cards={projectCards} columns={2} />

            <ParishTimeline items={projectTimeline} />

            <ParishCTA 
                title="Support Our Heritage"
                description="Your contributions directly fund the specialist materials and skilled labor needed for this historic restoration project."
                buttons={[
                    { text: 'Learn More', link: '/about', primary: true },
                    { text: 'Support the Project', link: '/donate' }
                ]}
            />

            <RelatedParishLinks current="Building Project" />
        </div>
    )
}
