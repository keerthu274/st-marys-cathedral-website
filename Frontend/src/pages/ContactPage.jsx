import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import FeedbackDialog from '../components/FeedbackDialog'
import PageHero from '../components/PageHero'
import { getBackendUrl } from '../lib/auth'
import { firstError, hasErrors, requireField, validateEmail, validateMaxLength, validateNameText, validatePhone } from '../lib/validation'
import './ContactPage.css'

export default function ContactPage() {
    const [searchParams] = useSearchParams()

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        phone: '',
        category: 'general',
        group_id: '',
        subject: '',
        isMember: 'yes',
        message: ''
    })
    const [groups, setGroups] = useState([])
    const [loading, setLoading] = useState(false)
    const [successDialogOpen, setSuccessDialogOpen] = useState(false)
    const [error, setError] = useState('')
    const [contactErrors, setContactErrors] = useState({})

    useEffect(() => {
        window.scrollTo(0, 0)
        const subj = searchParams.get('subject')
        if (subj) {
            setContactForm(prev => ({ ...prev, subject: subj }))
        }
    }, [searchParams])

    useEffect(() => {
        let ignore = false

        async function loadGroups() {
            try {
                const response = await fetch(getBackendUrl('/api/v1/groups'))
                const payload = await response.json()

                if (!ignore && response.ok && Array.isArray(payload.data)) {
                    setGroups(payload.data)
                }
            } catch (error) {
                console.log('Error loading groups for contact form:', error)
            }
        }

        loadGroups()

        return () => {
            ignore = true
        }
    }, [])

    const handleContactChange = e => {
        const { name, value } = e.target
        const nextErrors = {}

        if (name === 'name') {
            validateNameText(nextErrors, 'name', value, 'Name', true)
            validateMaxLength(nextErrors, 'name', value, 255, 'Name')
        } else if (name === 'email') {
            validateEmail(nextErrors, 'email', value)
        } else if (name === 'phone') {
            validatePhone(nextErrors, 'phone', value)
        } else if (name === 'subject') {
            requireField(nextErrors, 'subject', value, 'Subject')
            validateMaxLength(nextErrors, 'subject', value, 255, 'Subject')
        } else if (name === 'category') {
            requireField(nextErrors, 'category', value, 'Category')
        } else if (name === 'message') {
            requireField(nextErrors, 'message', value, 'Message')
        }

        const nextForm = { ...contactForm, [name]: value }

        if (name === 'category' && value !== 'group_join') {
            nextForm.group_id = ''
        }

        setContactForm(nextForm)
        setContactErrors(current => ({ ...current, [name]: nextErrors[name] }))
    }

    const validateContactForm = () => {
        const nextErrors = {}

        validateNameText(nextErrors, 'name', contactForm.name, 'Name', true)
        validateMaxLength(nextErrors, 'name', contactForm.name, 255, 'Name')
        validateEmail(nextErrors, 'email', contactForm.email)
        validatePhone(nextErrors, 'phone', contactForm.phone)
        requireField(nextErrors, 'category', contactForm.category, 'Category')
        requireField(nextErrors, 'subject', contactForm.subject, 'Subject')
        validateMaxLength(nextErrors, 'subject', contactForm.subject, 255, 'Subject')
        requireField(nextErrors, 'message', contactForm.message, 'Message')

        if (contactForm.category === 'group_join' && !contactForm.group_id) {
            nextErrors.group_id = ['Please choose which group you want to join.']
        }

        return nextErrors
    }

    // 🔥 removed e.preventDefault from here (IMPORTANT)
    const handleContactSubmit = async () => {
        const validationErrors = validateContactForm()
        setContactErrors(validationErrors)

        if (hasErrors(validationErrors)) {
            setError(firstError(validationErrors) || 'Please review the highlighted fields.')
            return
        }

        setLoading(true)
        setSuccessDialogOpen(false)
        setError('')

        try {
            const response = await fetch(getBackendUrl('/api/v1/contact'), {
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

            setContactForm({ name: '', email: '', phone: '', category: 'general', group_id: '', subject: '', isMember: 'yes', message: '' })
            setContactErrors({})
            setSuccessDialogOpen(true)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
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
                                Thank you for your interest in St Mary's Cathedral. Please use the form below or the parish office contact details for enquiries about worship, parish life, sacramental preparation, or pastoral support.
                            </p>
                            <p>
                                St Mary's Cathedral Parish includes the Cathedral in Wrexham and the Church of the Holy Family in Coedpoeth. We are always happy to help parishioners, visitors, and those exploring the Catholic faith.
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

            <section className="section">
                <div className="container">
                    <div className="contact-bottom-grid two-columns">
                        <div className="contact-column">
                            <h3>Address</h3>
                            <div className="address-list">
                                <div className="address-item">
                                    <span className="address-icon">🏛️</span>
                                    <div className="address-text">
                                        <strong>Cathedral Location</strong><br/>
                                        St Mary's Cathedral<br/>
                                        Regent Street, Wrexham<br/>
                                        LL11 1RB, United Kingdom
                                    </div>
                                </div>
                                <div className="address-item">
                                    <span className="address-icon">🏠</span>
                                    <div className="address-text">
                                        <strong>Parish Office / Mailing</strong><br/>
                                        Cathedral House<br/>
                                        Regent Street, Wrexham<br/>
                                        LL11 1RB
                                    </div>
                                </div>
                                <div className="address-item">
                                    <span className="address-icon">📞</span>
                                    <div className="address-text">01978 263943</div>
                                </div>
                                <div className="address-item">
                                    <span className="address-icon">✉️</span>
                                    <div className="address-text">
                                        secretarywrexhamcathedral@rcdwxm.org.uk<br/>
                                        Office hours: Tuesday, Wednesday and Friday, 9:30 AM - 2:30 PM<br/>
                                        To subscribe to our emails,<br/>
                                        please <Link to="/newsletter" className="click-here-link">click here</Link>.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="contact-column">
                            <h3>Contact Form</h3>

                            {error && <div className="contact-feedback error">{error}</div>}

                            {/* 🔥 changed form submit handling (IMPORTANT) */}
                            <form 
                                className="contact-form-minimal" 
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleContactSubmit()
                                }}
                                noValidate
                            >
                                <div className="grid-2" style={{ gap: '15px' }}>
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input name="name" value={contactForm.name} onChange={handleContactChange} required aria-invalid={Boolean(contactErrors.name)} />
                                        {contactErrors.name ? <span className="field-error">{contactErrors.name[0]}</span> : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input name="email" type="email" value={contactForm.email} onChange={handleContactChange} required aria-invalid={Boolean(contactErrors.email)} />
                                        {contactErrors.email ? <span className="field-error">{contactErrors.email[0]}</span> : null}
                                    </div>
                                </div>

                                <div className="grid-2" style={{ gap: '15px', marginTop: '15px' }}>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select name="category" value={contactForm.category} onChange={handleContactChange} aria-invalid={Boolean(contactErrors.category)}>
                                            <option value="general">General Enquiry</option>
                                            <option value="liturgy">Liturgy / Mass</option>
                                            <option value="sacraments">Sacraments</option>
                                            <option value="pastoral-care">Pastoral Care</option>
                                            <option value="group_join">Join a Group</option>
                                        </select>
                                        {contactErrors.category ? <span className="field-error">{contactErrors.category[0]}</span> : null}
                                    </div>
                                    <div className="form-group">
                                        <label>Phone Number</label>
                                        <input name="phone" value={contactForm.phone} onChange={handleContactChange} aria-invalid={Boolean(contactErrors.phone)} />
                                        {contactErrors.phone ? <span className="field-error">{contactErrors.phone[0]}</span> : null}
                                    </div>
                                </div>

                                {contactForm.category === 'group_join' ? (
                                    <div className="form-group" style={{ marginTop: '15px' }}>
                                        <label>Which group would you like to join?</label>
                                        <select name="group_id" value={contactForm.group_id} onChange={handleContactChange} aria-invalid={Boolean(contactErrors.group_id)}>
                                            <option value="">Select a group</option>
                                            {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                                        </select>
                                        {contactErrors.group_id ? <span className="field-error">{contactErrors.group_id[0]}</span> : null}
                                    </div>
                                ) : null}

                                <div className="grid-2" style={{ gap: '15px', marginTop: '15px' }}>
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input name="subject" value={contactForm.subject} onChange={handleContactChange} required aria-invalid={Boolean(contactErrors.subject)} />
                                        {contactErrors.subject ? <span className="field-error">{contactErrors.subject[0]}</span> : null}
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
                                    <textarea name="message" value={contactForm.message} onChange={handleContactChange} rows={5} required aria-invalid={Boolean(contactErrors.message)}></textarea>
                                    {contactErrors.message ? <span className="field-error">{contactErrors.message[0]}</span> : null}
                                </div>

                                <div className="form-actions-row">
                                    <button type="button" className="btn-minimal-dark" style={{ background: '#777' }} onClick={() => {
                                        setContactForm({ name: '', email: '', phone: '', category: 'general', group_id: '', subject: '', isMember: 'yes', message: '' })
                                        setContactErrors({})
                                        setError('')
                                    }}>Clear</button>
                                    <button type="submit" className="btn-minimal-dark" disabled={loading}>
                                        {loading ? 'Sending...' : 'Send Message'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <FeedbackDialog
                open={successDialogOpen}
                tone="success"
                title="Message sent successfully"
                message="Thank you for contacting St Mary's Cathedral. Your enquiry has been submitted successfully."
                confirmLabel="Close"
                onClose={() => setSuccessDialogOpen(false)}
            />
        </div>
    )
}
