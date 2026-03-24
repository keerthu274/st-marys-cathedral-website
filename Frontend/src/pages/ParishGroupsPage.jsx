import { ParishHero, ParishIntro, ParishInfoCards, ParishCTA, RelatedParishLinks } from '../components/parish/ParishSections'

const groupCards = [
    { icon: '🎵', title: 'Choir And Musicians', content: 'The parish includes a Folk Group, Cathedral Choir, and Diocesan Choir. Contact details and rehearsal times are available from the parish office.' },
    { icon: '🙏', title: 'Prayer Groups', content: 'Parish prayer includes the Ignatian prayer group, Rosary, Exposition and Rosary, and seasonal Stations of the Cross.' },
    { icon: '🌟', title: 'Youth Group', content: 'Children and young people aged 5 to 18 meet monthly after the 10.30am Mass for teaching, games, crafts, food, and fellowship.' },
    { icon: '🕊', title: '18-35 Group', content: 'A group for anyone aged 18 to 35 seeking deeper faith, friendship, and participation in the life and mission of the Church.' },
    { icon: '🤝', title: 'SVP', content: 'The St Vincent de Paul Society provides befriending, care-home visits, prison support, and international twinning.' },
    { icon: '🙌', title: 'Altar Servers And Volunteers', content: 'There are opportunities to serve in liturgy, practical maintenance, pastoral care, youth work, fundraising, and hospitality.' },
]

export default function ParishGroupsPage() {
    return (
        <div className="parish-page">
            <ParishHero title="Parish Groups" subtitle="Join a group and become part of our vibrant cathedral community" image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600" breadcrumb="Parish Groups" />
            <ParishIntro title="Faith in Fellowship" text="Parish life at St Mary's Cathedral is vibrant, welcoming, supportive, and full of life. The parish brings together Catholics from many countries and cultures, and there are many ways to pray, serve, learn, and build friendship." />
            <ParishInfoCards cards={groupCards} columns={3} />

            <section className="section" style={{ background: '#fcfaf6' }}>
                <div className="container">
                    <h2 className="section-title">Group Highlights</h2>
                    <div className="content-grid" style={{ marginTop: '40px' }}>
                        <div className="content-card">
                            <h3>Youth Group</h3>
                            <p>The youth group meets once a month on the second Sunday after the 10.30am Mass, with games before a 12.15pm session. It includes teaching, guest speakers, arts and crafts, community-building, and a hot meal.</p>
                        </div>
                        <div className="content-card">
                            <h3>18-35 Group</h3>
                            <p>The group meets fortnightly on Tuesdays at 7.00pm at Holy Family Convent and focuses on deepening faith, friendship, and participation in the Church.</p>
                            <p>The PowerPoint contact is Philip Thomas on 07802 853284 or thomas.philipl@sky.com.</p>
                        </div>
                        <div className="content-card">
                            <h3>SVP</h3>
                            <p>The St Vincent de Paul Society visits people in homes, care homes, and nursing homes, supports Mass at Berwyn prison, and participates in international twinning.</p>
                        </div>
                        <div className="content-card">
                            <h3>How You Can Help</h3>
                            <p>Parish volunteers support altar serving, reading, sacristy work, extraordinary ministry, singing, music, stewardship, collections, welcoming, flowers, cleaning, maintenance, youth work, prayer groups, and fundraising.</p>
                        </div>
                    </div>
                </div>
            </section>

            <ParishCTA title="Want to Join a Group?" description="We would love to help you find the right group for your interests and schedule. Reach out to us today to get connected." buttons={[{ text: 'Join a Parish Group', link: '/contact?subject=Joining a Group', primary: true }, { text: 'Enquire Online', link: '/contact' }]} />
            <RelatedParishLinks current="Parish Groups" />
        </div>
    )
}
