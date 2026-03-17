import { Link } from 'react-router-dom'
import { ParishHero, ParishIntro, ParishInfoCards, ParishCTA } from '../components/parish/ParishSections'
import './DiocesePage.css'

export default function DiocesePage() {
    const resourceCards = [
        {
            icon: '📰',
            title: 'Diocesan News',
            content: 'Stay updated with the latest announcements, events, and news from across the Diocese of Wrexham.',
            link: '#'
        },
        {
            icon: '📝',
            title: 'Pastoral Letters',
            content: 'Read official guidance and reflections shared by the Bishop with the faithful of the diocese.',
            link: '#'
        },
        {
            icon: '🎓',
            title: 'Catholic Education',
            content: 'Information regarding Catholic schools, religious education, and lifelong faith formation ministries.',
            link: '#'
        },
        {
            icon: '🛡️',
            title: 'Safeguarding',
            content: 'Our commitment to the safety and well-being of all children and vulnerable adults in our care.',
            link: '/safeguarding'
        }
    ]

    const parishDirectoryCards = [
        {
            icon: '📍',
            title: 'Find Nearby Parishes',
            content: 'Locate other Catholic parishes and churches within the Diocese of Wrexham.',
            link: '#'
        },
        {
            icon: '📂',
            title: 'Deanery Information',
            content: 'Explore the different deaneries that make up our diocesan structure.',
            link: '#'
        },
        {
            icon: '📖',
            title: 'Parish Directory',
            content: 'A comprehensive list of parishes, clergy contact information, and Mass times.',
            link: '#'
        }
    ]

    return (
        <div className="diocese-page">
            <ParishHero
                title="Diocese of Wrexham"
                subtitle="Information, resources, and news from the Catholic Diocese of Wrexham."
                image="https://images.unsplash.com/photo-1548625313-0404975d49bb?q=80&w=1600"
                breadcrumb="Diocese"
            />

            <ParishIntro
                title="About the Diocese"
                text="The Diocese of Wrexham serves Catholic communities across North Wales, covering the counties of Wrexham, Flintshire, Denbighshire, Conwy, Gwynedd, and Anglesey. As the Mother Church of the Diocese, St Mary's Cathedral stands as a symbol of unity and faith for all our parishioners. The Diocese supports our numerous parishes, clergy, Catholic schools, and various ministries, providing essential pastoral care, guidance, and spiritual leadership to thousands of faithful across the region."
            />

            {/* Bishop Section */}
            <section className="bishop-section">
                <div className="container bishop-container">
                    <div className="bishop-card">
                        <div className="bishop-image-placeholder">👤</div>
                        <h3 className="bishop-name">The Bishop of Wrexham</h3>
                        <div className="bishop-title">Spiritual Shepherd</div>
                    </div>
                    <div className="bishop-content">
                        <h2>Bishop of Wrexham</h2>
                        <p>
                            The Bishop yields spiritual leadership and pastoral care for the entire Diocese. His role is central to the life of the Church in North Wales, providing a vital link to the wider Catholic community and the Holy See.
                        </p>
                        <ul className="bishop-list">
                            <li>Providing spiritual leadership and guidance</li>
                            <li>Offering pastoral care for clergy and the faithful</li>
                            <li>Supporting diocesan schools and ministries</li>
                            <li>Leading major diocesan initiatives and celebrations</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Diocesan Resources</h2>
                    <p className="section-subtitle">Access important information and official documents</p>
                    <ParishInfoCards cards={resourceCards} columns={2} />
                </div>
            </section>

            <section className="section" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="container">
                    <h2 className="section-title">Parishes in the Diocese</h2>
                    <p className="section-subtitle">The Diocese of Wrexham encompasses a diverse range of parishes across North Wales</p>
                    <ParishInfoCards cards={parishDirectoryCards} columns={3} />
                </div>
            </section>

            <ParishCTA
                title="Stay Connected with the Diocese"
                description="For more detailed information, official diocesan news, and to keep informed about pastoral letters and important announcements, please visit the official website or contact us."
                buttons={[
                    { text: 'Visit Diocese Website', link: 'https://www.wrexhamdiocese.org.uk/', primary: true },
                    { text: 'Contact Parish Office', link: '/contact', primary: false }
                ]}
            />
        </div>
    )
}
