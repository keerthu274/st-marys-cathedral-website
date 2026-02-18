import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                {/* Col 1: Logo + tagline */}
                <div className="footer-brand">
                    <Link to="/" className="footer-logo">
                        <div className="footer-logo-icon">
                            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                                <rect width="28" height="28" rx="4" fill="#c9a84c" />
                                <path d="M14 4 L14 24 M8 10 L20 10" stroke="#1e3a5f" strokeWidth="2.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <div>
                            <div className="footer-logo-name">St Mary's Cathedral</div>
                            <div className="footer-logo-sub">WREXHAM</div>
                        </div>
                    </Link>
                    <p className="footer-tagline">
                        Mother Church of the Diocese of Wrexham, serving our Catholic community with faith, hope, and charity.
                    </p>
                </div>

                {/* Col 2: Contact */}
                <div className="footer-col">
                    <h4 className="footer-heading">Contact Us</h4>
                    <ul className="footer-list">
                        <li>
                            <span className="footer-icon">📍</span>
                            <span>Regent Street<br />Wrexham<br />LL11 1RR</span>
                        </li>
                        <li>
                            <span className="footer-icon">📞</span>
                            <a href="tel:01978262826">01978 262 826</a>
                        </li>
                        <li>
                            <span className="footer-icon">✉</span>
                            <a href="mailto:info@stmaryscathedral.org.uk">info@stmaryscathedral.org.uk</a>
                        </li>
                    </ul>
                </div>

                {/* Col 3: Mass Times */}
                <div className="footer-col">
                    <h4 className="footer-heading">Mass Times</h4>
                    <ul className="footer-list">
                        <li><strong>Sunday</strong><br />9:00 AM, 11:00 AM, 6:30 PM</li>
                        <li><strong>Weekdays</strong><br />Monday – Saturday: 10:00 AM</li>
                        <li><strong>Holy Days</strong><br />As announced</li>
                    </ul>
                </div>

                {/* Col 4: Quick Links */}
                <div className="footer-col">
                    <h4 className="footer-heading">Quick Links</h4>
                    <ul className="footer-links-list">
                        <li><Link to="/registration">Parish Registration</Link></li>
                        <li><Link to="/safeguarding">Safeguarding</Link></li>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="#">Diocese of Wrexham</Link></li>
                    </ul>
                    <div className="footer-social">
                        <a href="#" aria-label="Facebook" className="social-link">f</a>
                        <a href="#" aria-label="Twitter" className="social-link">𝕏</a>
                        <a href="#" aria-label="Instagram" className="social-link">📷</a>
                        <a href="#" aria-label="YouTube" className="social-link">▶</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>© 2026 St Mary's Cathedral, Wrexham. All rights reserved. Registered Charity.</p>
                </div>
            </div>
        </footer>
    )
}
