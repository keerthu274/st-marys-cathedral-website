import { useRef, useState } from 'react'
import FeedbackDialog from '../components/FeedbackDialog'
import PageHero from '../components/PageHero'
import './RegistrationPage.css'

export default function RegistrationPage() {
    const [regType, setRegType] = useState('individual')
    const [children, setChildren] = useState([{ id: 1, name: '', age: '' }])
    const [formData, setFormData] = useState({})
    const [dialogState, setDialogState] = useState({
        open: false,
        tone: 'neutral',
        title: '',
        message: null
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const formRef = useRef(null)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    const handleChildChange = (id, field, value) => {
        setChildren(children.map(child =>
            child.id === id ? { ...child, [field]: value } : child
        ))
    }

    const handleAddChild = () => {
        setChildren([...children, { id: Date.now(), name: '', age: '' }])
    }

    const handleRemoveChild = (id) => {
        if (children.length > 1) {
            setChildren(children.filter(c => c.id !== id))
        }
    }

    const resetRegistrationForm = () => {
        formRef.current?.reset()
        setFormData({})
        setChildren([{ id: 1, name: '', age: '' }])
        setRegType('individual')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const payload = {
                ...formData,
                registration_type: regType,
                consent_confirmed: !!formData.consent,
                contact_by_phone: !!formData.contact_by_phone,
                contact_by_email: !!formData.contact_by_email,
                children: regType === 'family'
                    ? children
                        .filter(child => child.name.trim() !== '')
                        .map(child => ({
                            child_name: child.name,
                            age: child.age ? Number(child.age) : null
                        }))
                    : [],

                interests: {
                    volunteering: !!formData.volunteering,
                    parish_groups: !!formData.parish_groups,
                    sacramental_preparation: !!formData.sacramental_preparation,
                    weekly_newsletter: !!formData.weekly_newsletter
                }
            }

            const response = await fetch('http://127.0.0.1:8000/api/v1/parish-registrations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if (response.ok && data.success) {
                resetRegistrationForm()
                setDialogState({
                    open: true,
                    tone: 'success',
                    title: 'Registration submitted successfully',
                    message: (
                        <>
                            <p>Thank you for registering with St Mary's Cathedral Parish.</p>
                            <p>Your parish member ID is <strong>{data.member_id}</strong>.</p>
                        </>
                    )
                })
            } else {
                setDialogState({
                    open: true,
                    tone: 'error',
                    title: 'We could not submit your registration',
                    message: data.message || 'Please review the form details and try again.'
                })
            }
        } catch (error) {
            console.error(error)
            setDialogState({
                open: true,
                tone: 'error',
                title: 'Submission failed',
                message: 'Something went wrong while sending your registration. Please try again in a moment.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="registration-page">
            <PageHero
                title="Parish Registration"
                subtitle="Register as a member of St Mary's Cathedral parish"
                centered={true}
            />

            <div className="container reg-container">
                {/* Welcome Box */}
                <div className="reg-welcome">
                    <h2 className="reg-welcome-title">Welcome to our Parish Family</h2>
                    <p>We are delighted that you have chosen to join St Mary's Cathedral. Please fill out the form below so we can keep you informed and involved in our community.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmit}>

                    {/* Registration Type Select */}
                    <div className="reg-section">
                        <span className="reg-type-label">Registration Type</span>
                        <div className="reg-type-grid">
                            <div
                                className={`reg-type-card ${regType === 'individual' ? 'active' : ''}`}
                                onClick={() => setRegType('individual')}
                            >
                                <div className="reg-type-icon">👤</div>
                                <span className="reg-type-text">Individual / Couple</span>
                            </div>
                            <div
                                className={`reg-type-card ${regType === 'family' ? 'active' : ''}`}
                                onClick={() => setRegType('family')}
                            >
                                <div className="reg-type-icon">👥</div>
                                <span className="reg-type-text">Family Registration</span>
                            </div>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div className="reg-section">
                        <h2 className="reg-section-title">Personal Information</h2>

                        <div className="form-group">
                            <label>Full Name <span className="required">*</span></label>
                            <input type="text" className="form-input" placeholder="Enter your full title and name" required name="full_name" onChange={handleChange} />
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Date of Birth <span className="required">*</span></label>
                                <input type="date" className="form-input" required name="date_of_birth" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Gender <span className="required">*</span></label>
                                <div className="radio-group" style={{ padding: '12px 0' }}>
                                    <label className="radio-label">
                                        <input type="radio" name="gender" value="male" required onChange={handleChange} /> Male
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="gender" value="female" required onChange={handleChange} /> Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Nationality</label>
                                <input type="text" className="form-input" placeholder="e.g. British" name="nationality" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Occupation</label>
                                <input type="text" className="form-input" placeholder="Your profession" name="occupation" onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Address & Contact Info */}
                    <div className="reg-section">
                        <h2 className="reg-section-title">Address & Contact Information</h2>

                        <div className="form-group">
                            <label>Home Address <span className="required">*</span></label>
                            <input type="text" className="form-input" placeholder="House number and street name" style={{ marginBottom: '12px' }} required name="address_line1" onChange={handleChange} />
                            <input type="text" className="form-input" placeholder="Address line 2 (optional)" name="address_line2" onChange={handleChange} />
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>City / Town <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. Wrexham" required name="city" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Postcode <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. LL11 1RR" required name="postcode" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Telephone Number <span className="required">*</span></label>
                                <input type="tel" className="form-input" placeholder="Mobile or landline" required name="phone" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Email Address <span className="required">*</span></label>
                                <input type="email" className="form-input" placeholder="your.email@example.com" required name="email" onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Partner / Family Section */}
                    {regType === 'individual' ? (
                        <div className="reg-section">
                            <h2 className="reg-section-title">Partner Information (Optional)</h2>
                            <div className="form-group">
                                <label>Spouse / Partner Name</label>
                                <input type="text" className="form-input" placeholder="Enter spouse or partner's full name" name="partner_name" onChange={handleChange} />
                            </div>
                        </div>
                    ) : (
                        <div className="reg-section">
                            <h2 className="reg-section-title">Family Information</h2>
                            <div className="form-group">
                                <label>Spouse / Partner Name</label>
                                <input type="text" className="form-input" placeholder="Enter spouse or partner's full name" name="partner_name" onChange={handleChange} />
                            </div>

                            <div className="children-header">
                                <h3>Children Information</h3>
                                <button type="button" className="btn-add-child" onClick={handleAddChild}>
                                    + Add Child
                                </button>
                            </div>

                            {children.map((child, index) => (
                                <div key={child.id} className="child-row">
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label>{index === 0 ? 'Child Name (If applicable)' : 'Child Name'}</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            placeholder="Full name"
                                            value={child.name}
                                            onChange={(e) => handleChildChange(child.id, 'name', e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label>{index === 0 ? 'Age' : 'Age'}</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            placeholder="Years"
                                            min="0"
                                            max="18"
                                            value={child.age}
                                            onChange={(e) => handleChildChange(child.id, 'age', e.target.value)}
                                        />
                                    </div>
                                    <div style={{ paddingTop: '28px' }}>
                                        <button type="button" className="btn-remove-child" onClick={() => handleRemoveChild(child.id)}>×</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Parish Involvement */}
                    <div className="reg-section">
                        <h2 className="reg-section-title">Parish Involvement (Optional)</h2>
                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input type="checkbox" name="volunteering" onChange={handleChange} />
                                <div>
                                    <span>Volunteering</span>
                                    <span className="checkbox-desc">I am interested in volunteering for parish activities (e.g. reading, welcoming, flower arranging).</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="parish_groups" onChange={handleChange} />
                                <div>
                                    <span>Parish Groups</span>
                                    <span className="checkbox-desc">I would like information about joining parish groups or choirs.</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="sacramental_preparation" onChange={handleChange} />
                                <div>
                                    <span>Sacramental Preparation</span>
                                    <span className="checkbox-desc">I require information about baptism, first communion, or confirmation.</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="weekly_newsletter" onChange={handleChange} />
                                <div>
                                    <span>Weekly Newsletter</span>
                                    <span className="checkbox-desc">I would like to receive the parish newsletter by email.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Signature & Consent */}
                    <div className="reg-section">
                        <h2 className="reg-section-title">Data Protection & Signature</h2>

                        <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: '1.6' }}>
                            Your privacy is important to us. The personal data you provide will be stored securely by St Mary's Cathedral and the Diocese of Wrexham in accordance with GDPR regulations. It will only be used for parish administration, pastoral care, and communication.
                        </p>

                        <div className="checkbox-group">
                            <label className="checkbox-label">
                                <input type="checkbox" name="contact_by_phone" onChange={handleChange} />
                                <span>I am happy to be contacted by Phone</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="contact_by_email" onChange={handleChange} />
                                <span>I am happy to be contacted by Email</span>
                            </label>
                        </div>

                        <div className="consent-box">
                            <label className="checkbox-label" style={{ fontWeight: '600', color: 'var(--navy)' }}>
                                <input type="checkbox" required name="consent" onChange={handleChange} />
                                <span>I confirm that I consent to the parish maintaining my records as detailed above *</span>
                            </label>
                        </div>

                        <div className="form-grid-2" style={{ marginTop: '32px' }}>
                            <div className="form-group">
                                <label>Signed (Type your full name) <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="Your signature" required name="signature" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Date <span className="required">*</span></label>
                                <input type="date" className="form-input" required name="signed_date" onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="reg-action-bar">
                        <span className="reg-footnote">Your information will be securely stored and used only for parish purposes.</span>
                        <div className="reg-action-buttons">
                            <button
                                type="reset"
                                className="btn-outline-white"
                                onClick={resetRegistrationForm}
                            >Clear Form</button>
                            <button type="submit" className="btn-gold" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
            <FeedbackDialog
                open={dialogState.open}
                tone={dialogState.tone}
                title={dialogState.title}
                message={dialogState.message}
                confirmLabel="Close"
                onClose={() => setDialogState(current => ({ ...current, open: false }))}
            />
        </div>
    )
}
