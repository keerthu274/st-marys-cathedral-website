import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './DonatePage.css'

const donationOptions = [
    { icon: 'OG', title: 'Offertory Giving', desc: 'Support the day-to-day running of the Cathedral through cash donations, the Dona machine, or regular standing orders.', amounts: 'Any amount' },
    { icon: 'BP', title: 'Building Project', desc: "Support the Cathedral's Anniversary Fund and the long-term renovation of the historic site.", amounts: 'GBP 10, GBP 25, GBP 50+' },
    { icon: 'MS', title: 'Mass Stipends', desc: 'Foundation Masses and Mass intentions may be offered with a suggested donation of GBP 10.', amounts: 'GBP 10 suggested' },
    { icon: 'FM', title: 'Funeral And Memorial Giving', desc: 'Families may also choose to support the Cathedral through funeral donations and memorial giving.', amounts: 'Any amount' },
    { icon: 'LG', title: 'Legacy Giving', desc: 'You can remember the Cathedral in your will and leave a lasting legacy for future generations.', amounts: 'Planned gift' },
    { icon: 'CS', title: 'Grant And Community Support', desc: 'Fundraising events, grant applications, EasyFundraising, and visitor donations all help sustain parish life.', amounts: 'Community support' },
]

const otherWays = [
    { title: 'Standing Order', desc: 'This is the parish preferred method for regular support and helps provide dependable income for ministry and maintenance.', btn: 'Contact Office' },
    { title: 'Gift Aid', desc: 'If you are a UK taxpayer, Gift Aid allows the parish to receive an extra 25p for every GBP 1 donated at no additional cost to you.', btn: 'Gift Aid Help' },
    { title: 'EasyFundraising', desc: 'If you shop online, many retailers will donate a percentage to the Cathedral when you nominate the parish through EasyFundraising.', btn: 'Learn More' },
]

export default function DonatePage() {
    return (
        <div>
            <PageHero
                icon="SM"
                title="Support Our Cathedral"
                subtitle="The Cathedral parish depends on donations from parishioners, visitors, and grant funders to sustain worship, outreach, maintenance, and future development."
            />

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Ways to Donate</h2>
                    <div className="grid-3" style={{ marginTop: '40px' }}>
                        {donationOptions.map(d => (
                            <div key={d.title} className="card donate-card">
                                <div className="donate-icon">{d.icon}</div>
                                <h3 className="donate-card-title">{d.title}</h3>
                                <p className="donate-card-desc">{d.desc}</p>
                                <p className="donate-amounts">Suggested amounts: <span>{d.amounts}</span></p>
                                <Link to="/contact?subject=Donation%20Enquiry" className="btn-gold donate-btn">Ask How To Give</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="gift-aid-card">
                        <div className="gift-aid-left">
                            <h2 className="gift-aid-title">
                                <span>i</span> Gift Aid
                            </h2>
                            <p className="gift-aid-desc">
                                If you are a UK taxpayer, the Cathedral can receive an extra 25p for every GBP 1 you donate, at no extra cost to you.
                            </p>
                            <p className="gift-aid-desc">
                                Signing up for Gift Aid is one of the simplest ways to strengthen parish finances and make every donation go further.
                            </p>
                        </div>
                        <div className="gift-aid-right">
                            <h3 className="gift-aid-how">How it works:</h3>
                            <ul className="gift-aid-list">
                                <li>You must be a UK taxpayer</li>
                                <li>Complete a Gift Aid declaration</li>
                                <li>We claim 25p for every GBP 1 you donate</li>
                                <li>No additional cost to you</li>
                            </ul>
                            <Link to="/contact?subject=Gift%20Aid" className="btn-gold" style={{ marginTop: '16px' }}>Gift Aid Declaration Help</Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <h2 className="section-title">Other Ways to Give</h2>
                    <div className="grid-3" style={{ marginTop: '40px' }}>
                        {otherWays.map(w => (
                            <div key={w.title} className="card other-way-card">
                                <h3 className="other-way-title">{w.title}</h3>
                                <p className="other-way-desc">{w.desc}</p>
                                <Link to="/contact?subject=Support%20the%20Cathedral" className="btn-outline" style={{ marginTop: '16px', fontSize: '0.82rem', padding: '8px 20px' }}>{w.btn}</Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Questions About Donating?</h2>
                    <p className="section-subtitle">
                        If you have any questions about supporting the Cathedral, Gift Aid, legacies, or the building project, please get in touch with the parish office.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <Link to="/contact" className="btn-primary">Contact Us</Link>
                        <a href="tel:01978263943" className="btn-outline">01978 263943</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
