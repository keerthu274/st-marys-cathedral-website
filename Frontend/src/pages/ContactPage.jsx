import { useState } from 'react'
import PageHero from '../components/PageHero'
import './ContactPage.css'

const contactItems = [
    {
        icon: '📍',
        title: 'Address',
        content: 'St Mary\'s Cathedral\nRegent Street\nWrexham\nLL11 1RR\nUnited Kingdom',
    },
    {
        icon: '📞',
        title: 'Phone',
        content: '01978 262 826',
    },
    {
        icon: '✉',
        title: 'Email',
        content: 'info@stmaryscathedral.org.uk',
    },
    {
        icon: '🕐',
        title: 'Office Hours',
        content: 'Monday – Friday: 9:00 AM – 4:00 PM\nSaturday: 9:00 AM – 12:00 PM\nSunday: Closed',
    },
]

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
    const handleSubmit = e => { e.preventDefault(); alert('Thank you! We will be in touch soon.') }

    return (
        <div>
            <PageHero title="Contact Us" subtitle="We'd love to hear from you" />

            <section className="section">
                <div className="container contact-grid">
                    {/* Left: contact info */}
                    <div className="contact-info">
                        <h2 className="contact-heading">Get in Touch</h2>
                        {contactItems.map(c => (
                            <div key={c.title} className="card contact-item">
                                <div className="contact-icon">{c.icon}</div>
                                <div>
                                    <h4 className="contact-item-title">{c.title}</h4>
                                    <p className="contact-item-content">{c.content}</p>
                                </div>
                            </div>
                        ))}
                        <div className="map-placeholder-contact">
                            <span>📍</span>
                            <p>Interactive Map</p>
                        </div>
                    </div>

                    {/* Right: form */}
                    <div>
                        <div className="card contact-form-card">
                            <h2 className="contact-heading">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label>Name *</label>
                                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required />
                                </div>
                                <div className="form-group">
                                    <label>Email *</label>
                                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your.email@example.com" required />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="Your phone number" />
                                </div>
                                <div className="form-group">
                                    <label>Subject *</label>
                                    <input name="subject" value={form.subject} onChange={handleChange} placeholder="Message subject" required />
                                </div>
                                <div className="form-group">
                                    <label>Message *</label>
                                    <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your message..." rows={5} required />
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                    Send Message
                                </button>
                                <p className="form-note">* Required fields. We'll respond to your enquiry as soon as possible.</p>
                            </form>
                        </div>

                        <div className="emergency-card">
                            <h3 className="emergency-title">Emergency Contact</h3>
                            <p className="emergency-desc">For urgent pastoral matters outside office hours, please contact:</p>
                            <p className="emergency-number">Emergency Line: 01978 262 826</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
