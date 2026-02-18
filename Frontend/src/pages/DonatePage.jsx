import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import './DonatePage.css'

const donationOptions = [
    { icon: '🏛', title: 'Cathedral Upkeep', desc: 'Help maintain our historic cathedral building, including heating, lighting, and essential repairs.', amounts: '£10, £25, £50' },
    { icon: '🕯', title: 'Votive Candles', desc: 'Light a candle for your intentions and support our liturgical needs.', amounts: '£2, £5, £10' },
    { icon: '📖', title: 'Mass Stipends', desc: 'Request a Mass to be offered for your intentions or in memory of a loved one.', amounts: '£10' },
    { icon: '🏢', title: 'Church Hall', desc: 'Support the maintenance and running of our parish hall and community facilities.', amounts: '£20, £50, £100' },
    { icon: '🚗', title: 'Car Park Fund', desc: 'Contribute to the maintenance and improvements of our parish car park.', amounts: '£10, £25' },
    { icon: '🎁', title: 'General Donation', desc: 'Support the general work of the cathedral and parish ministries.', amounts: 'Any amount' },
]

const otherWays = [
    { title: 'Standing Order', desc: 'Set up a regular monthly donation to support the ongoing work of the cathedral.', btn: 'Download Form' },
    { title: 'Bank Transfer', desc: 'Make a direct bank transfer to our cathedral account.', btn: 'View Details' },
    { title: 'Legacy Giving', desc: 'Leave a lasting legacy by including the cathedral in your will.', btn: 'Learn More' },
]

export default function DonatePage() {
    return (
        <div>
            <PageHero
                icon="♡"
                title="Support Our Cathedral"
                subtitle="Your generous donations help us maintain our historic cathedral, support our ministries, and serve our community. Every contribution makes a real difference."
            />

            {/* Ways to Donate */}
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
                                <button className="btn-gold donate-btn">Donate Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gift Aid */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container">
                    <div className="gift-aid-card">
                        <div className="gift-aid-left">
                            <h2 className="gift-aid-title">
                                <span>ℹ</span> Gift Aid
                            </h2>
                            <p className="gift-aid-desc">
                                If you are a UK taxpayer, we can claim Gift Aid on your donation, which means we receive an extra 25p for every £1 you give, at no extra cost to you.
                            </p>
                            <p className="gift-aid-desc">
                                This could increase the value of your donation by 25%! Please let us know if you would like to add Gift Aid to your donation.
                            </p>
                        </div>
                        <div className="gift-aid-right">
                            <h3 className="gift-aid-how">How it works:</h3>
                            <ul className="gift-aid-list">
                                <li>• You must be a UK taxpayer</li>
                                <li>• Complete a Gift Aid declaration</li>
                                <li>• We claim 25p for every £1 you donate</li>
                                <li>• No additional cost to you</li>
                            </ul>
                            <button className="btn-gold" style={{ marginTop: '16px' }}>Gift Aid Declaration Form</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Other Ways */}
            <section className="section">
                <div className="container">
                    <h2 className="section-title">Other Ways to Give</h2>
                    <div className="grid-3" style={{ marginTop: '40px' }}>
                        {otherWays.map(w => (
                            <div key={w.title} className="card other-way-card">
                                <h3 className="other-way-title">{w.title}</h3>
                                <p className="other-way-desc">{w.desc}</p>
                                <button className="btn-outline" style={{ marginTop: '16px', fontSize: '0.82rem', padding: '8px 20px' }}>{w.btn}</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Questions CTA */}
            <section className="section" style={{ background: 'var(--off-white)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Questions About Donating?</h2>
                    <p className="section-subtitle">
                        If you have any questions about making a donation or would like to discuss other ways to support St Mary's Cathedral, please don't hesitate to contact us.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                        <Link to="/contact" className="btn-primary">Contact Us</Link>
                        <a href="tel:01978262826" className="btn-outline">01978 262 826</a>
                    </div>
                </div>
            </section>
        </div>
    )
}
