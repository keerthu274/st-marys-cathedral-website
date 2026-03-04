import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './HomePage.css'

const heroImages = [
    '/image 01.jpg',
    '/image 02.jpg',
    '/image 03.jpg',
    '/image 04.jpg',
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
        const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 4000)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="home">
            {/* ── HERO ── */}
            <section className="hero">
                <div className="container hero-inner">
                    <div className="hero-text">
                        <p className="hero-label">WELCOME TO ST MARY'S CATHEDRAL</p>
                        <h1 className="hero-title">
                            Loving God, Loving Others, Serving World &amp; Believe in the God Grace
                        </h1>
                        <p className="hero-desc">
                            A place of worship, community, and faith in the Diocese of Wrexham. Join our welcoming family as we grow together in faith and service.
                        </p>
                        <div className="hero-btns">
                            <Link to="/mass-times" className="btn-primary">View Mass Times</Link>
                            <Link to="/about" className="btn-outline">Learn More</Link>
                        </div>
                    </div>
                    <div className="hero-image-wrap">
                        <div className="hero-circle">
                            {heroImages.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt="St Mary's Cathedral"
                                    className={`hero-img ${i === heroIdx ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        <div className="hero-dots">
                            {heroImages.map((_, i) => (
                                <button
                                    key={i}
                                    className={`hero-dot ${i === heroIdx ? 'active' : ''}`}
                                    onClick={() => setHeroIdx(i)}
                                    aria-label={`Slide ${i + 1}`}
                                />
                            ))}
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
                    <div className="quick-links-row">
                        {quickLinks.map(q => (
                            <Link key={q.label} to={q.path} className="quick-link-card">
                                <div className="quick-link-icon">{q.icon}</div>
                                <span className="quick-link-label">{q.label}</span>
                                <p className="quick-link-desc">
                                    {q.label === 'Mass Times' && 'View our schedule of all services and worship times.'}
                                    {q.label === 'Events' && 'Upcoming events and parish activities.'}
                                    {q.label === 'News & Newsletter' && 'Latest announcements and weekly bulletin.'}
                                    {q.label === 'Donate' && 'Support our cathedral and ministries.'}
                                </p>
                            </Link>
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
                            <div className="mass-icon">🕐</div>
                            <div className="mass-day">Weekdays</div>
                            <div className="mass-sub">Monday – Saturday</div>
                            <div className="mass-times-list"><span className="mass-highlight">10:00 AM</span></div>
                        </div>
                        <div className="mass-card">
                            <div className="mass-icon">🕐</div>
                            <div className="mass-day">Holy Days</div>
                            <div className="mass-sub">Times announced in weekly newsletter</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '32px' }}>
                        <Link to="/mass-times" className="btn-outline">View Full Mass Schedule</Link>
                    </div>
                </div>
            </section>

            {/* ── UPCOMING EVENTS ── */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
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
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Visit Us</h2>
                    <div className="visit-grid">
                        <div className="visit-info">
                            <div className="visit-item">
                                <div className="visit-icon">📍</div>
                                <div>
                                    <h4>Address</h4>
                                    <p>St Mary's Cathedral<br />Regent Street<br />Wrexham<br />LL11 1RR</p>
                                </div>
                            </div>
                            <div className="visit-item">
                                <div className="visit-icon">🕐</div>
                                <div>
                                    <h4>Office Hours</h4>
                                    <p>Monday – Friday: 9:00 AM – 4:00 PM<br />Saturday: 9:00 AM – 12:00 PM<br />Sunday: Closed</p>
                                </div>
                            </div>
                            <div className="visit-item">
                                <div className="visit-icon">📞</div>
                                <div>
                                    <h4>Contact</h4>
                                    <p>Phone: 01978 262 826<br />Email: info@stmaryscathedral.org.uk</p>
                                </div>
                            </div>
                            <div className="visit-btns">
                                <Link to="/contact" className="btn-primary">Contact Us</Link>
                                <Link to="/registration" className="btn-outline">Parish Registration</Link>
                            </div>
                        </div>
                        <div className="visit-map">
                            <div className="map-placeholder">
                                <span>📍</span>
                                <p>Interactive Map</p>
                                <small>St Mary's Cathedral, Regent Street, Wrexham</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
