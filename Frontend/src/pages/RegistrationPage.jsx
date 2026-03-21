import { useState } from 'react'
import PageHero from '../components/PageHero'
import './RegistrationPage.css'

export default function RegistrationPage() {
    const [regType, setRegType] = useState('individual')
    const [children, setChildren] = useState([{ id: 1, name: '', age: '' }])

    // added: store form values
    const [formData, setFormData] = useState({})

    // added: handle all normal inputs
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target

        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        })
    }

    // added: handle child inputs
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

    // updated: send form to backend
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const payload = {
                ...formData,

                // added: backend needs this field
                registration_type: regType,

                // added: backend needs this name
                consent_confirmed: !!formData.consent,

                // added: backend needs these names
                contact_by_phone: !!formData.contact_by_phone,
                contact_by_email: !!formData.contact_by_email,

                // added: send children in backend format
                children: regType === 'family'
                    ? children
                        .filter(child => child.name.trim() !== '')
                        .map(child => ({
                            child_name: child.name,
                            age: child.age ? Number(child.age) : null
                        }))
                    : [],

                // added: send interests in backend format
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
                alert(`Thank you for registering with St Mary's Cathedral parish. Your member ID is ${data.member_id}.`)
            } else {
                console.log(data)
                alert('Registration failed. Please check the form and try again.')
            }
        } catch (error) {
            console.error(error)
            alert('Something went wrong while submitting the form.')
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
                            <input type="text" className="form-input" placeholder="Enter your full title and name" required name="full_name" onChange={handleChange} /> {/* added */}
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Date of Birth <span className="required">*</span></label>
                                <input type="date" className="form-input" required name="date_of_birth" onChange={handleChange} /> {/* added */}
                            </div>
                            <div className="form-group">
                                <label>Gender <span className="required">*</span></label>
                                <div className="radio-group" style={{ padding: '12px 0' }}>
                                    <label className="radio-label">
                                        <input type="radio" name="gender" value="male" required onChange={handleChange} /> Male {/* added */}
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="gender" value="female" required onChange={handleChange} /> Female {/* added */}
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Nationality</label>
                                <input type="text" className="form-input" placeholder="e.g. British" name="nationality" onChange={handleChange} /> {/* added */}
                            </div>
                            <div className="form-group">
                                <label>Occupation</label>
                                <input type="text" className="form-input" placeholder="Your profession" name="occupation" onChange={handleChange} /> {/* added */}
                            </div>
                        </div>
                    </div>

                    {/* Address & Contact Info */}
                    <div className="reg-section">
                        <h2 className="reg-section-title">Address & Contact Information</h2>

                        <div className="form-group">
                            <label>Home Address <span className="required">*</span></label>
                            <input type="text" className="form-input" placeholder="House number and street name" style={{ marginBottom: '12px' }} required name="address_line1" onChange={handleChange} /> {/* added */}
                            <input type="text" className="form-input" placeholder="Address line 2 (optional)" name="address_line2" onChange={handleChange} /> {/* added */}
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>City / Town <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. Wrexham" required name="city" onChange={handleChange} /> {/* added */}
                            </div>
                            <div className="form-group">
                                <label>Postcode <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="e.g. LL11 1RR" required name="postcode" onChange={handleChange} /> {/* added */}
                            </div>
                        </div>

                        <div className="form-grid-2">
                            <div className="form-group">
                                <label>Telephone Number <span className="required">*</span></label>
                                <input type="tel" className="form-input" placeholder="Mobile or landline" required name="phone" onChange={handleChange} /> {/* added */}
                            </div>
                            <div className="form-group">
                                <label>Email Address <span className="required">*</span></label>
                                <input type="email" className="form-input" placeholder="your.email@example.com" required name="email" onChange={handleChange} /> {/* added */}
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Partner / Family Section */}
                    {regType === 'individual' ? (
                        <div className="reg-section">
                            <h2 className="reg-section-title">Partner Information (Optional)</h2>
                            <div className="form-group">
                                <label>Spouse / Partner Name</label>
                                <input type="text" className="form-input" placeholder="Enter spouse or partner's full name" name="partner_name" onChange={handleChange} /> {/* added */}
                            </div>
                        </div>
                    ) : (
                        <div className="reg-section">
                            <h2 className="reg-section-title">Family Information</h2>
                            <div className="form-group">
                                <label>Spouse / Partner Name</label>
                                <input type="text" className="form-input" placeholder="Enter spouse or partner's full name" name="partner_name" onChange={handleChange} /> {/* added */}
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
                                        /> {/* added */}
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
                                        /> {/* added */}
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
                                <input type="checkbox" name="volunteering" onChange={handleChange} /> {/* added */}
                                <div>
                                    <span>Volunteering</span>
                                    <span className="checkbox-desc">I am interested in volunteering for parish activities (e.g. reading, welcoming, flower arranging).</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="parish_groups" onChange={handleChange} /> {/* added */}
                                <div>
                                    <span>Parish Groups</span>
                                    <span className="checkbox-desc">I would like information about joining parish groups or choirs.</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="sacramental_preparation" onChange={handleChange} /> {/* added */}
                                <div>
                                    <span>Sacramental Preparation</span>
                                    <span className="checkbox-desc">I require information about baptism, first communion, or confirmation.</span>
                                </div>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="weekly_newsletter" onChange={handleChange} /> {/* added */}
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
                                <input type="checkbox" name="contact_by_phone" onChange={handleChange} /> {/* added */}
                                <span>I am happy to be contacted by Phone</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" name="contact_by_email" onChange={handleChange} /> {/* added */}
                                <span>I am happy to be contacted by Email</span>
                            </label>
                        </div>

                        <div className="consent-box">
                            <label className="checkbox-label" style={{ fontWeight: '600', color: 'var(--navy)' }}>
                                <input type="checkbox" required name="consent" onChange={handleChange} /> {/* added */}
                                <span>I confirm that I consent to the parish maintaining my records as detailed above *</span>
                            </label>
                        </div>

                        <div className="form-grid-2" style={{ marginTop: '32px' }}>
                            <div className="form-group">
                                <label>Signed (Type your full name) <span className="required">*</span></label>
                                <input type="text" className="form-input" placeholder="Your signature" required name="signature" onChange={handleChange} /> {/* added */}
                            </div>
                            <div className="form-group">
                                <label>Date <span className="required">*</span></label>
                                <input type="date" className="form-input" required name="signed_date" onChange={handleChange} /> {/* added */}
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
                                onClick={() => {
                                    setFormData({})
                                    setChildren([{ id: 1, name: '', age: '' }])
                                    setRegType('individual')
                                }}
                            >Clear Form</button> {/* added */}
                            <button type="submit" className="btn-gold">Submit Registration</button>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}