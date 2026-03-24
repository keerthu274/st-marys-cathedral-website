import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './ContactPage.css'

export default function ContactPage() {
    const [searchParams] = useSearchParams()
    
    // Contact Form State
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        isMember: 'yes',
        message: ''
    })

    // ✅ added loading state
    const [loading, setLoading] = useState(false)

    // ✅ added success message state
    const [success, setSuccess] = useState('')

    // ✅ added error message state
    const [error, setError] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
        const subj = searchParams.get('subject')
        if (subj) {
            setContactForm(prev => ({ ...prev, subject: subj }))
        }
    }, [searchParams])

    const handleContactChange = e => setContactForm({ ...contactForm, [e.target.name]: e.target.value })
    
    // ✅ updated submit function to connect API
    const handleContactSubmit = async (e) => {
        e.preventDefault()

        setLoading(true) // start loading
        setSuccess('') // clear old success
        setError('') // clear old error

        try {
            const response = await fetch('http://127.0.0.1:8000/api/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactForm)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            // ✅ success message
            setSuccess('Message sent successfully!')

            // ✅ reset form after success
            setContactForm({ name: '', email: '', phone: '', subject: '', isMember: 'yes', message: '' })

        } catch (err) {
            // ✅ show error message
            setError(err.message)
        } finally {
            setLoading(false) // stop loading
        }
    }

    return (
        <div className="contact-page-container">
            <PageHero 
                title="Contact Us"
                subtitle="We'd love to hear from you. Get in touch with our parish team."
                centered={true}
                image="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1600"
            />

            {/* Tier 1: Top Section */}
            <section className="contact-top-section">
                <div className="container">
                    <div className="contact-hero-grid">
                        <div className="contact-map-wrapper">
                            <iframe 
                                title="Cathedral Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2402.0460492866634!2d-2.9964526841753!3d53.04566497991732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487ad39f9b5c3b5d%3A0x8e8e8e8e8e8e8e8e!2sSt%20Mary&#39;s%20Cathedral%2C%20Wrexham!5e0!3m2!1sen!2suk!4v1620000000000!5m2!1sen!2suk" 
                                width="100%" 
                                height="100%" 
                                style={{ border: 0 }} 
                                allowFullScreen="" 
                                loading="lazy"
                            ></iframe>
                        </div>
                        <div className="contact-intro-content">
                            <h2>FIND US</h2>
                            <p>
                                Thank you for your interest in St Mary's Cathedral. Feel free to contact us via the form below or the contact information provided.
                            </p>
                            <p>
                                St Mary's Cathedral is a vibrant community that desires to help people discover God and grow in their relationship with Him. We strive to show Christ to the people of our community and beyond through loving them, serving them, and walking together.
                            </p>
                            <p>
                                To learn more about St Mary's, please <Link to="/about" className="click-here-link">click here</Link>.
                            </p>
                            <p>
                                For more directions via Google Maps, please <a href="https://goo.gl/maps/8nN7F1H1R3J2" target="_blank" rel="noopener noreferrer" className="click-here-link">click here</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tier 2: Bottom Grid */}
            <section className="section">
                <div className="container">
                    <div className="contact-bottom-grid two-columns">
                        
                        {/* Column 1: Address */}
                        <div className="contact-column">
                            <h3>Address</h3>
                            <div className="address-list">
                                <div className="address-item">
                                    <span className="address-icon">🏛️</span>
                                    <div className="address-text">
                                        <strong>Cathedral Location</strong><br/>
                                        St Mary's Cathedral<br/>
                                        Regent Street, Wrexham<br/>
                                        LL11 1RR, United Kingdom
                                    </div>
                                </div>
                                <div className="address-item">
                                    <span className="address-icon">🏠</span>
                                    <div className="address-text">
                                        <strong>Parish Office / Mailing</strong><br/>
                                        Cathedral House<br/>
                                        Regent Street, Wrexham<br/>
                                        LL11 1RR
                                    </div>
                                </div>
                                <div className="address-item">
                                    <span className="address-icon">📞</span>
                                    <div className="address-text">01978 262 826</div>
                                </div>
                                <div className="address-item">
                                    <span className="address-icon">✉️</span>
                                    <div className="address-text">
                                        secretarywrexhamcathedral@rcdwxm.org.uk<br/>
                                        To subscribe to our emails,<br/>
                                        please <Link to="/newsletter" className="click-here-link">click here</Link>.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Contact Form */}
                        <div className="contact-column">
                            <h3>Contact Form</h3>

                            {/* ✅ show success message */}
                            {success && <div className="contact-feedback success">{success}</div>}

                            {/* ✅ show error message */}
                            {error && <div className="contact-feedback error">{error}</div>}

                            <form className="contact-form-minimal" onSubmit={handleContactSubmit}>
                                <div className="grid-2" style={{ gap: '15px' }}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input name="name" value={contactForm.name} onChange={handleContactChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input name="email" type="email" value={contactForm.email} onChange={handleContactChange} required />
                                    </div>
                                </div>
                                <div className="grid-2" style={{ gap: '15px', marginTop: '15px' }}>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input name="phone" value={contactForm.phone} onChange={handleContactChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input name="subject" value={contactForm.subject} onChange={handleContactChange} required />
                                    </div>
                                </div>
                                <div className="radio-group" style={{ margin: '15px 0' }}>
                                    <label className="radio-option">
                                        <input type="radio" name="isMember" value="yes" checked={contactForm.isMember === 'yes'} onChange={handleContactChange} />
                                        Yes, I attend St Mary's.
                                    </label>
                                    <label className="radio-option">
                                        <input type="radio" name="isMember" value="no" checked={contactForm.isMember === 'no'} onChange={handleContactChange} />
                                        No, I do not attend St Mary's.
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>Message</label>
                                    <textarea name="message" value={contactForm.message} onChange={handleContactChange} rows={5} required></textarea>
                                </div>
                                <div className="form-actions-row">
                                    <button type="button" className="btn-minimal-dark" style={{ background: '#777' }} onClick={() => setContactForm({name:'', email:'', phone:'', subject:'', isMember:'yes', message:''})}>Clear</button>
                                    
                                    {/* ✅ disable button when loading */}
                                    <button type="submit" className="btn-minimal-dark" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
