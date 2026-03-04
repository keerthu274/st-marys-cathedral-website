import { useState } from 'react'
import PageHero from '../components/PageHero'
import './RegistrationPage.css'

export default function RegistrationPage() {
    const [regType, setRegType] = useState('individual')
    const [children, setChildren] = useState([{ id: 1, name: '', age: '' }])

    const handleAddChild = () => {
        setChildren([...children, { id: Date.now(), name: '', age: '' }])
    }

    const handleRemoveChild = (id) => {
        if (children.length > 1) {
            setChildren(children.filter(c => c.id !== id))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Thank you for registering with St Mary\'s Cathedral parish. We will review your details.')
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

                <form onSubmit={handleSubmit}>

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
                            <input type="text" className="form-input" placeholder="Enter your full title and name" required />
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Date of Birth <span className="required">*</span></label>
                                <input type="date" className="form-input" required />
                            </div>
                            <div className="form-group">
                                <label>Gender <span className="required">*</span></label>
                                <div className="radio-group" style={{ padding: '12px 0' }}>
                                    <label className="radio-label">
                                        <input type="radio" name="gender" value="male" required /> Male
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="gender" value="female" required /> Female
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Nationality</label>
                                <input type="text" className="form-input" placeholder="e.g. British" />
                            </div>
                            <div className="form-group">
                                <label>Occupation</label>
                                <input type="text" className="form-input" placeholder="Your profession" />
                            </div>
                        </div>
                    </div>

                    {/* Address & Contact Info */}
                    <div className="reg-section">
                        <h2 className="reg-section-title">Address & Contact Information</h2>

                        <div className="form-group">
                            <label>Home Address <span className="required">*</span></label>
                            <input type="text" className="form-input" placeholder="House number and street name" style={{ marginBottom: '12px' }} required />
                            <input type="text" className="form-input" placeholder="Address line 2 (optional)" />
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>City / Town <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. Wrexham" required />
                            </div>
                            <div className="form-group">
                                <label>Postcode <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. LL11 1RR" required />
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Telephone Number <span className="required">*</span></label>
                                <input type="tel" className="form-input" placeholder="Mobile or landline" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address <span className="required">*</span></label>
                                <input type="email" className="form-input" placeholder="your.email@example.com" required />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Partner / Family Section */}
                    {regType === 'individual' ? (
                        <div className="reg-section">
                            <h2 className="reg-section-title">Partner Information (Optional)</h2>
                            <div className="form-group">
                                <label>Spouse / Partner Name</label>
                                <input type="text" className="form-input" placeholder="Enter spouse or partner's full name" />
                            </div>
                        </div>
                    ) : (
                        <div className="reg-section">
                            <h2 className="reg-section-title">Family Information</h2>
                            <div className="form-group">
                                <label>Spouse / Partner Name</label>
                                <input type="text" className="form-input" placeholder="Enter spouse or partner's full name" />
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
                                        <input type="text" className="form-input" placeholder="Full name" />
                                    </div>
                                    <div className="form-group" style={{ marginBottom: 0 }}>
                                        <label>{index === 0 ? 'Age' : 'Age'}</label>
                                        <input type="number" className="form-input" placeholder="Years" min="0" max="18" />
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
                                <input type="checkbox" />
                                <div>
                                    <span>Volunteering</span>
                                    <span className="checkbox-desc">I am interested in volunteering for parish activities (e.g. reading, welcoming, flower arranging).</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <div>
                                    <span>Parish Groups</span>
                                    <span className="checkbox-desc">I would like information about joining parish groups or choirs.</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <div>
                                    <span>Sacramental Preparation</span>
                                    <span className="checkbox-desc">I require information about baptism, first communion, or confirmation.</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" />
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
                                <input type="checkbox" />
                                <span>I am happy to be contacted by Phone</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>I am happy to be contacted by Email</span>
                            </label>
                        </div>

                        <div className="consent-box">
                            <label className="checkbox-label" style={{ fontWeight: '600', color: 'var(--navy)' }}>
                                <input type="checkbox" required />
                                <span>I confirm that I consent to the parish maintaining my records as detailed above *</span>
                            </label>
                        </div>

                        <div className="form-grid-2" style={{ marginTop: '32px' }}>
                            <div className="form-group">
                                <label>Signed (Type your full name) <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="Your signature" required />
                            </div>
                            <div className="form-group">
                                <label>Date <span className="required">*</span></label>
                                <input type="date" className="form-input" required />
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="reg-action-bar">
                        <span className="reg-footnote">Your information will be securely stored and used only for parish purposes.</span>
                        <div className="reg-action-buttons">
                            <button type="reset" className="btn-outline-white">Clear Form</button>
                            <button type="submit" className="btn-gold">Submit Registration</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
