import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getBackendUrl } from '../lib/auth'
import './HomePage.css'

import churchIcon from '../assets/icons/church_sketch.png'
import bibleIcon from '../assets/icons/bible_sketch.png'
import doveIcon from '../assets/icons/dove_sketch.png'

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`

const heroSlides = [
  {
    image: publicAsset('image 01.jpg'),
    label: "WELCOME TO ST MARY'S",
    title: 'Loving God, Loving Others',
    desc: 'A historic place of worship, community, and faith in the Diocese of Wrexham. Join our welcoming family as we grow together.',
    btnText: 'View Mass Times',
    link: '/mass-times',
  },
  {
    image: publicAsset('image 02.jpg'),
    label: 'WORSHIP WITH US',
    title: 'Centred in Prayer and Praise',
    desc: 'Join us for our daily and weekend services. Experience the peace and beauty of our sacred space.',
    btnText: 'Full Mass Schedule',
    link: '/mass-times',
  },
  {
    image: publicAsset('image 03.jpg'),
    label: 'PARISH COMMUNITY',
    title: 'A Vibrant and Growing Family',
    desc: 'Discover our upcoming events, social groups, and ways to get involved in the life of the Cathedral.',
    btnText: 'Explore Events',
    link: '#upcoming-events',
  },
  {
    image: publicAsset('image 04.jpg'),
    label: 'JOIN OUR PARISH',
    title: "Become Part of St Mary's",
    desc: 'We are always happy to welcome new parishioners. Register today and stay connected with our community.',
    btnText: 'Register Now',
    link: '/registration',
  },
]

const services = [
  {
    icon: churchIcon,
    title: 'Church Ministry',
    desc: 'Massa eget egestas purus viverra accumsan malesuada in nisl nisi scelerisque.',
  },
  {
    icon: bibleIcon,
    title: 'Reading a Prayer',
    desc: 'Venenatis urna cursus eget nunc scelerisque sapien viverra mauris in aliquam.',
  },
  {
    icon: doveIcon,
    title: 'Praise and Worship',
    desc: 'Faucibus interdum posuere lorem ipsum dolor commodo sit amet consectetur.',
  },
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

function formatTime(timeString) {
  if (!timeString) {
    return ''
  }

  const [hours, minutes] = timeString.split(':')
  const date = new Date()
  date.setHours(Number(hours), Number(minutes))

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

function formatEventDate(dateString) {
  if (!dateString) {
    return { day: '--', month: '--' }
  }

  const date = new Date(`${dateString}T00:00:00`)

  return {
    day: date.toLocaleDateString('en-GB', { day: '2-digit' }),
    month: date.toLocaleDateString('en-GB', { month: 'short' }),
  }
}

export default function HomePage() {
  const [heroIdx, setHeroIdx] = useState(0)
  const [homeEvents, setHomeEvents] = useState([])
  const [homeMassTimes, setHomeMassTimes] = useState([])

  useEffect(() => {
    const timer = setInterval(() => setHeroIdx((i) => (i + 1) % heroSlides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    let ignore = false

    async function loadHomeData() {
      try {
        const [eventsResponse, massTimesResponse] = await Promise.all([
          fetch(getBackendUrl('/api/v1/events')),
          fetch(getBackendUrl('/api/v1/mass-times')),
        ])

        const [eventsPayload, massTimesPayload] = await Promise.all([
          eventsResponse.json(),
          massTimesResponse.json(),
        ])

        if (ignore) {
          return
        }

        if (eventsResponse.ok && Array.isArray(eventsPayload.data)) {
          setHomeEvents(eventsPayload.data.slice(0, 3))
        }

        if (massTimesResponse.ok && Array.isArray(massTimesPayload.data)) {
          setHomeMassTimes(massTimesPayload.data.slice(0, 6))
        }
      } catch {
        if (!ignore) {
          setHomeEvents([])
          setHomeMassTimes([])
        }
      }
    }

    loadHomeData()

    return () => {
      ignore = true
    }
  }, [])

  const groupedMassTimes = homeMassTimes
    .reduce((groups, item) => {
      const existing = groups.find((group) => group.day === item.day)

      if (existing) {
        existing.times.push(formatTime(item.start_time))
        return groups
      }

      groups.push({
        day: item.day,
        location: item.location || "St Mary's Cathedral",
        times: [formatTime(item.start_time)],
      })

      return groups
    }, [])
    .slice(0, 3)

  return (
    <div className="home">
      <section className="hero full-width-hero">
        <div className="hero-bg-slider">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`hero-bg-slide ${index === heroIdx ? 'active' : ''}`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${slide.image}')`,
              }}
            />
          ))}
        </div>

        <div className="container hero-content-centered">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`hero-text-layer ${index === heroIdx ? 'active' : ''}`}>
              <p className="hero-label-stately">{slide.label} • EST. 1857</p>
              <h1 className="hero-title-grand">{slide.title}</h1>
              <p className="hero-desc">{slide.desc}</p>
              <div className="hero-btns">
                <Link to={slide.link} className="btn-primary-grand">{slide.btnText}</Link>
              </div>
            </div>
          ))}

          <div className="hero-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`hero-dot-stately ${index === heroIdx ? 'active' : ''}`}
                onClick={() => setHeroIdx(index)}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="hero-accent-shape"></div>
      </section>

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

      <section className="section about-snippet">
        <div className="container about-inner">
          <div className="about-video-wrapper">
            <video className="about-video" controls autoPlay muted loop>
              <source src={publicAsset('video.mp4')} type="video/mp4" />
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

      <section className="section-sm" style={{ background: 'var(--white)' }}>
        <div className="container">
          <p className="section-label">OUR SERVICES</p>
          <h2 className="section-title">Keeping our church running smoothly</h2>
          <div className="grid-3 services-redesign" style={{ marginBottom: '24px' }}>
            {services.map((service) => (
              <div key={service.title} className="card service-card redesigned">
                <div className="service-icon-img-wrapper">
                  <img src={service.icon} alt={service.title} className="service-icon-img" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Mass Times</h2>
          <p className="section-subtitle">Join us for worship</p>
          <div className="grid-3 mass-cards">
            {groupedMassTimes.length ? (
              groupedMassTimes.map((mass, index) => (
                <div key={`${mass.day}-${index}`} className="mass-card">
                  <div className="mass-icon">{index === 0 ? '🕐' : '📍'}</div>
                  <div className="mass-day">{mass.day}</div>
                  <div className="mass-sub">{mass.location}</div>
                  <div className="mass-times-list">
                    {mass.times.map((time) => (
                      <span key={`${mass.day}-${time}`}>{time}</span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="mass-card">
                <div className="mass-icon">🕐</div>
                <div className="mass-day">Mass Times</div>
                <div className="mass-sub">Published schedule updates will appear here automatically.</div>
                <div className="mass-times-list">
                  <Link to="/mass-times" className="mass-highlight" style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                    See Schedule
                  </Link>
                </div>
              </div>
            )}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link to="/mass-times" className="btn-outline">View Full Mass Schedule</Link>
          </div>
        </div>
      </section>

      <section id="upcoming-events" className="section" style={{ background: 'var(--off-white)' }}>
        <div className="container">
          <h2 className="section-title">Upcoming Events</h2>
          <p className="section-subtitle">Join us for these special occasions</p>
          <div className="grid-3">
            {homeEvents.length ? (
              homeEvents.map((event) => {
                const { day, month } = formatEventDate(event.start_date)

                return (
                  <div key={event.id} className="card event-card">
                    <div className="event-date">
                      <span className="event-day">{day}</span>
                      <span className="event-month">{month}</span>
                    </div>
                    <div className="event-info">
                      <h3 className="event-title">{event.title}</h3>
                      <p className="event-desc">
                        {event.description || `${formatTime(event.start_time)}${event.location ? ` • ${event.location}` : ''}`}
                      </p>
                      <Link to={`/events/${event.id}`} className="read-more">View Details →</Link>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="card event-card">
                <div className="event-date">
                  <span className="event-day">--</span>
                  <span className="event-month">---</span>
                </div>
                <div className="event-info">
                  <h3 className="event-title">Upcoming events will appear here</h3>
                  <p className="event-desc">As parish events are published, the home page will update automatically.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container news-newsletter-grid">
          <div className="news-col">
            <h2 className="section-title" style={{ textAlign: 'left', marginBottom: '24px' }}>Latest News</h2>
            {news.map((item) => (
              <div key={item.title} className="news-item">
                <p className="news-date">{item.date}</p>
                <h3 className="news-title">{item.title}</h3>
                <p className="news-desc">{item.desc}</p>
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
              <p>Mon - Fri: 9:00 AM - 4:00 PM<br />Saturday: 9:00 AM - 12:00 PM<br />Sunday: Closed</p>
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
