import { ParishHero, ParishIntro, ParishInfoCards, ParishCTA, RelatedParishLinks } from '../components/parish/ParishSections'

const groupCards = [
    {
        icon: '🎶',
        title: 'Choir Group',
        content: 'Enhance our liturgical celebrations through sacred music. New voices are always welcome in our adult and youth choirs.'
    },
    {
        icon: '🙏',
        title: 'Prayer Group',
        content: 'Join us for weekly Rosary circles, Adoration, and spiritual reflection to deepen your relationship with God.'
    },
    {
        icon: '🌟',
        title: 'Youth Group',
        content: 'Connecting young people through faith, friendship, and fun. Activities for Year 7 and above.'
    },
    {
        icon: '👪',
        title: 'Family Group',
        content: 'Supporting families in their journey of faith. Regular gatherings, picnics, and shared family milestones.'
    },
    {
        icon: '🍃',
        title: 'Senior Group',
        content: 'Fellowship and support for our older parishioners, featuring afternoon tea, social outings, and guest speakers.'
    },
    {
        icon: '🤝',
        title: 'Volunteer Group',
        content: 'Serve our community through hospitality, flower arranging, cleaning, or assisting with parish events.'
    }
]

export default function ParishGroupsPage() {
    return (
        <div className="parish-page">
            <ParishHero 
                title="Parish Groups"
                subtitle="Join a group and become part of our vibrant cathedral community"
                image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600"
                breadcrumb="Parish Groups"
            />
            
            <ParishIntro 
                title="Faith in Fellowship"
                text="Being part of a parish is about more than just attending Mass. Our various groups provide wonderful opportunities to grow in your faith, share your talents, and build lasting friendships with fellow parishioners. Whether you are musical, prayerful, or simply want to help out, there is a place for you here."
            />

            <ParishInfoCards cards={groupCards} columns={3} />

            <ParishCTA 
                title="Want to Join a Group?"
                description="We would love to help you find the right group for your interests and schedule. Reach out to us today to get connected."
                buttons={[
                    { text: 'Join a Parish Group', link: '/contact?subject=Joining a Group', primary: true },
                    { text: 'Enquire Online', link: '/contact' }
                ]}
            />

            <RelatedParishLinks current="Parish Groups" />
        </div>
    )
}
