import { Link } from 'react-router-dom'
import { NewsHero, NewsIntro, FeatureCards, EventsList, SubscribeSection, NewsCTA } from '../components/news/NewsEventsSections'

const newsFeatures = [
    {
        icon: '📅',
        title: 'Events Calendar',
        description: 'Stay updated with upcoming services, events, and community activities at the Cathedral.',
        link: '/events'
    },
    {
        icon: '📰',
        title: 'News & Announcements',
        description: 'Read the latest updates, parish news, and important announcements from our community.',
        link: '/news'
    },
    {
        icon: '📧',
        title: 'Weekly Newsletter',
        description: 'Access the current week’s digital newsletter with Mass times and parish updates.',
        link: '/newsletter'
    },
    {
        icon: '🗄️',
        title: 'Newsletter Archive',
        description: 'Browse and download past editions of the parish newsletter from our digital archive.',
        link: '/newsletter-archive'
    }
]

const upcomingEvents = [
    { day: '19', month: 'MAR', time: '19:00', title: 'Lenten Prayer Service', description: 'Join us for an evening of reflection, music, and prayer during this Lenten season.' },
    { day: '26', month: 'MAR', time: '10:00', title: 'Parish Community Day', description: 'A day of fellowship, activities, and a shared lunch for all members of our cathedral family.' },
    { day: '02', month: 'APR', time: '18:30', title: 'Choir Performance', description: 'Expect a beautiful evening of sacred music performed by our Cathedral Adult and Youth Choirs.' },
    { day: '12', month: 'APR', time: '11:00', title: 'Easter Vigil Preparation', description: 'Information session and rehearsal for those participating in the Easter Vigil liturgy.' }
]

export default function NewsEventsPage() {
    return (
        <div className="news-events-page">
            <NewsHero 
                title="News & Events"
                subtitle="Stay connected with the life of our parish. Discover upcoming events, read the latest news, and never miss what’s happening at St Mary’s Cathedral."
                image="https://images.unsplash.com/photo-1515162305285-0293e4767cc2?q=80&w=1600"
            />
            
            <NewsIntro 
                title="Faith in Motion"
                text="The Cathedral is a bustling center of spiritual and community life. Whether you're looking for liturgical schedules, social gatherings, or parish updates, you can find everything you need to stay engaged right here."
            />

            <FeatureCards cards={newsFeatures} />

            <section className="section" style={{ paddingBottom: 0 }}>
                <div className="container">
                    <h2 className="section-title">Upcoming Events</h2>
                </div>
            </section>
            
            <EventsList events={upcomingEvents} limit={4} />

            <div style={{ textAlign: 'center', padding: '0 0 60px' }}>
                <Link to="/events" className="btn-gold-outline">View Full Calendar</Link>
            </div>

            <NewsCTA 
                title="Have a Story to Share?"
                description="Do you have news or an event you'd like to include in our newsletter? We'd love to hear from you."
                buttonText="Contact Communications Team"
                buttonLink="/contact"
            />
        </div>
    )
}
