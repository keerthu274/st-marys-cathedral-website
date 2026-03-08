import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const heroSlides = [
    {
        image: '/image 01.jpg',
        label: 'WELCOME TO ST MARY\'S',
        title: 'Loving God, Loving Others',
        desc: 'A historic place of worship, community, and faith in the Diocese of Wrexham. Join our welcoming family as we grow together.',
        btnText: 'View Mass Times',
        link: '/mass-times'
    },
    {
        image: '/image 02.jpg',
        label: 'WORSHIP WITH US',
        title: 'Centred in Prayer & Praise',
        desc: 'Join us for our daily and weekend services. Experience the peace and beauty of our sacred space.',
        btnText: 'Full Mass Schedule',
        link: '/mass-times'
    },
    {
        image: '/image 03.jpg',
        label: 'PARISH COMMUNITY',
        title: 'A Vibrant & Growing Family',
        desc: 'Discover our upcoming events, social groups, and ways to get involved in the life of the Cathedral.',
        btnText: 'Explore Events',
        link: '#upcoming-events'
    },
    {
        image: '/image 04.jpg',
        label: 'JOIN OUR PARISH',
        title: 'Become Part of St Mary\'s',
        desc: 'We are always happy to welcome new parishioners. Register today and stay connected with our community.',
        btnText: 'Register Now',
        link: '/registration'
    },
]

const galleryImages = [
    'https://images.unsplash.com/photo-1548625149-720754951eca?w=300&q=80',
    'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=300&q=80',
    'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=300&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
]

const services = [
    {
        icon: '🙏',
        title: 'Prayer & Worship',
        desc: 'Our cathedral is open and friendly with warm worship and wonderful community. We are an ever-growing parish family at St Mary\'s.',
    },
    {
        icon: '💬',
        title: 'Counseling',
        desc: 'We exist to empower lives to be community fully and so we can help open new doors and live life to its fullest potential.',
    },
    {
        icon: '📖',
        title: 'Exhortation',
        desc: 'We exist to help you live life freely, guided by faith and so we help you discover the fullness of life through growth.',
    },
]

const quickLinks = [
    { icon: '🕐', label: 'Mass Times', path: '/mass-times' },
    { icon: '📅', label: 'Events', path: '/news-events' },
    { icon: '📰', label: 'News & Newsletter', path: '/news-events' },
    { icon: '♡', label: 'Donate', path: '/donate' },
]

const events = [
    { day: '09', month: 'Feb', title: 'Lenten Prayer Service', desc: 'Join us for a special evening of prayer as we begin the Lenten season.' },
    { day: '14', month: 'Feb', title: 'Ash Wednesday', desc: 'Mass times: 9:00 AM and 7:00 PM. Ashes will be distributed at all services.' },
    { day: '15', month: 'Mar', title: 'Parish Retreat Weekend', desc: 'A weekend of reflection, prayer, and community. All parishioners welcome.' },
]

const news = [
    {
        date: 'January 20, 2026',
        title: 'Cathedral Building Project Update',
        desc: 'We are pleased to share the latest progress on our restoration project. The roof repairs are now complete.',
    },
    {
        date: 'January 10, 2026',
        title: 'Lenten Season Schedule',
        desc: 'Join us for special services and activities throughout the Lenten season, including Stations of the Cross.',
    },
]

export default function HomePage() {
    const [heroIdx, setHeroIdx] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setHeroIdx(i => (i + 1) % heroSlides.length), 5000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="home">
            {/* ── HERO ── */}
            <section className="hero full-width-hero">
                {/* Background Slider */}
                <div className="hero-bg-slider">
                    {heroSlides.map((s, i) => (
                        <div
                            key={i}
                            className={`hero-bg-slide ${i === heroIdx ? 'active' : ''}`}
                            style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${s.image}')` }}
                        />
                    ))}
                </div>

                <div className="container hero-content-centered">
                    {heroSlides.map((s, i) => (
                        <div key={i} className={`hero-text-layer ${i === heroIdx ? 'active' : ''}`}>
                            <p className="hero-label-stately">{s.label} • EST. 1857</p>
                            <h1 className="hero-title-grand">
                                {s.title}
                            </h1>
                            <p className="hero-desc">
                                {s.desc}
                            </p>
                            <div className="hero-btns">
                                <Link to={s.link} className="btn-primary-grand">{s.btnText}</Link>
                            </div>
                        </div>
                    ))}

                    <div className="hero-dots">
                        {heroSlides.map((_, i) => (
                            <button
                                key={i}
                                className={`hero-dot-stately ${i === heroIdx ? 'active' : ''}`}
                                onClick={() => setHeroIdx(i)}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Architectural Accent Shape */}
                <div className="hero-accent-shape"></div>
            </section>

            {/* ── INFO BAR ── */}
            <section className="info-bar">
                <div className="container info-bar-grid">
                    <div className="info-bar-item">
                        <span className="info-bar-icon">🏛️</span>
                        <div className="info-bar-text">
                            <h3>Est. 1857</h3>
                            <p>A Rich History</p>
                        </div>
                    </div>
                    <div className="info-bar-divider"></div>
                    <div className="info-bar-item">
                        <span className="info-bar-icon">🕊️</span>
                        <div className="info-bar-text">
                            <h3>Parish Family</h3>
                            <p>Growing Together</p>
                        </div>
                    </div>
                    <div className="info-bar-divider"></div>
                    <div className="info-bar-item">
                        <span className="info-bar-icon">🤝</span>
                        <div className="info-bar-text">
                            <h3>100% Welcome</h3>
                            <p>Open To Everyone</p>
                        </div>
                    </div>
                    <div className="info-bar-divider"></div>
                    <div className="info-bar-item">
                        <span className="info-bar-icon">📍</span>
                        <div className="info-bar-text">
                            <h3>Wrexham</h3>
                            <p>Diocese Seat</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ABOUT SNIPPET ── */}
            <section className="section about-snippet">
                <div className="container about-inner">
                    <div className="about-video-wrapper">
                        <video
                            className="about-video"
                            controls
                            autoPlay
                            muted
                            loop
                        >
                            <source src="/video.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className="about-text">
                        <p className="section-label">ABOUT US</p>
                        <h2 className="section-title" style={{ textAlign: 'left' }}>A church that loves God and people</h2>
                        <p style={{ color: 'var(--text-mid)', marginBottom: '16px', lineHeight: '1.7' }}>
                            We are people of deep faith who are brought to our Savior. We are a family. People who are passionate to see the kingdom of God advance. We love people. We are people who are open to growth as we strive to always honor God and humbly view other people as better than ourselves.
                        </p>
                        <Link to="/about" className="btn-gold">MORE ABOUT US</Link>
                    </div>
                </div>
            </section>

            {/* ── SERVICES ── */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <p className="section-label">OUR SERVICES</p>
                    <h2 className="section-title">Keeping our church running smoothly</h2>
                    <div className="grid-3" style={{ marginBottom: '48px' }}>
                        {services.map(s => (
                            <div key={s.title} className="card service-card">
                                <div className="service-icon">{s.icon}</div>
                                <h3 className="service-title">{s.title}</h3>
                                <p className="service-desc">{s.desc}</p>
                                <span className="read-more">+ READ MORE</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── MASS TIMES ── */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Mass Times</h2>
                    <p className="section-subtitle">Join us for worship</p>
                    <div className="grid-3 mass-cards">
                        <div className="mass-card">
                            <div className="mass-icon">🕐</div>
                            <div className="mass-day">Sunday</div>
                            <div className="mass-times-list">
                                <span>9:00 AM</span>
                                <span>11:00 AM</span>
                                <span>6:30 PM</span>
                            </div>
                        </div>
                        <div className="mass-card">
                            <div className="mass-icon">📍</div>
                            <div className="mass-day">Wrexham</div>
                            <div className="mass-sub">St Mary's Cathedral</div>
                            <div className="mass-times-list"><Link to="/mass-times" className="mass-highlight" style={{ textDecoration: 'underline', cursor: 'pointer' }}>See Schedule</Link></div>
                        </div>
                        <div className="mass-card">
                            <div className="mass-icon">📍</div>
                            <div className="mass-day">Coedpoeth</div>
                            <div className="mass-sub">St David's Church</div>
                            <div className="mass-times-list"><Link to="/mass-times" className="mass-highlight" style={{ textDecoration: 'underline', cursor: 'pointer' }}>See Schedule</Link></div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                        <Link to="/mass-times" className="btn-outline">View Full Mass Schedule</Link>
                    </div>
                </div>
            </section>

            {/* ── UPCOMING EVENTS ── */}
            <section id="upcoming-events" className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <h2 className="section-title">Upcoming Events</h2>
                    <p className="section-subtitle">Join us for these special occasions</p>
                    <div className="grid-3">
                        {events.map(e => (
                            <div key={e.title} className="card event-card">
                                <div className="event-date">
                                    <span className="event-day">{e.day}</span>
                                    <span className="event-month">{e.month}</span>
                                </div>
                                <div className="event-info">
                                    <h3 className="event-title">{e.title}</h3>
                                    <p className="event-desc">{e.desc}</p>
                                    <span className="read-more">View Details →</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── LATEST NEWS + NEWSLETTER ── */}
            <section className="section">
                <div className="container news-newsletter-grid">
                    <div className="news-col">
                        <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>Latest News</h2>
                        {news.map(n => (
                            <div key={n.title} className="news-item">
                                <p className="news-date">{n.date}</p>
                                <h3 className="news-title">{n.title}</h3>
                                <p className="news-desc">{n.desc}</p>
                                <span className="read-more">Read More →</span>
                            </div>
                        ))}
                    </div>
                    <div className="newsletter-box">
                        <div className="newsletter-icon">📰</div>
                        <h3 className="newsletter-title">Weekly Newsletter</h3>
                        <p className="newsletter-desc">
                            Stay informed about Mass times, events, and parish news delivered to your inbox each week.
                        </p>
                        <button className="btn-gold" style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}>
                            Subscribe
                        </button>
                        <p className="newsletter-note">
                            We respect your privacy. You may unsubscribe at any time. View our privacy policy.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── DONATE CTA ── */}
            <section className="donate-cta">
                <div className="container" style={{ textAlign: 'center' }}>
                    <div className="donate-heart">♡</div>
                    <h2 className="donate-title">Support Our Cathedral</h2>
                    <p className="donate-desc">
                        Your generous donations help us maintain our historic cathedral, support our ministries, and serve our community. Every contribution, large or small, makes a meaningful difference.
                    </p>
                    <Link to="/donate" className="btn-gold">♡ Donate to Support the Cathedral</Link>
                </div>
            </section>

            {/* ── VISIT US ── */}
            <section className="visit-us-section">
                <div className="container">
                    <p className="section-label" style={{ textAlign: 'center' }}>FIND US</p>
                    <h2 className="section-title">Visit St Mary's Cathedral</h2>
                    <div className="visit-cards-row">
                        <div className="visit-card">
                            <div className="visit-card-icon">📍</div>
                            <h4>Address</h4>
                            <p>St Mary's Cathedral<br />Regent Street<br />Wrexham, LL11 1RR</p>
                        </div>
                        <div className="visit-card">
                            <div className="visit-card-icon">🕐</div>
                            <h4>Office Hours</h4>
                            <p>Mon – Fri: 9:00 AM – 4:00 PM<br />Saturday: 9:00 AM – 12:00 PM<br />Sunday: Closed</p>
                        </div>
                        <div className="visit-card">
                            <div className="visit-card-icon">📞</div>
                            <h4>Contact</h4>
                            <p>01978 262 826<br />info@stmaryscathedral.org.uk</p>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '28px' }}>
                        <Link to="/contact" className="btn-primary">Get in Touch</Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
