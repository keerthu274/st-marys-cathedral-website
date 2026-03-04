import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const navItems = [
    { label: 'Home', path: '/' },
    {
        label: 'Mass & Sacraments',
        path: '/mass-sacraments',
        children: [
            { label: 'Mass Times', path: '/mass-sacraments' },
            { label: 'Mass & Sacraments', path: '/mass-sacraments' },
            { label: 'Baptism', path: '/baptism' },
            { label: 'Confirmation', path: '/confirmation' },
            { label: 'Marriage', path: '/marriage' },
            { label: 'Reconciliation', path: '/reconciliation' },
        ],
    },
    {
        label: 'Parish',
        path: '/parish',
        children: [
            { label: 'Our Parish', path: '/parish' },
            { label: 'Parish Council', path: '/parish-council' },
            { label: 'Parish Groups', path: '/parish-groups' },
            { label: 'Building Project', path: '/building-project' },
            { label: 'Fundraising', path: '/fundraising' },
            { label: 'Policies & Safeguarding', path: '/safeguarding' },
        ],
    },
    {
        label: 'News & Events',
        path: '/news-events',
        children: [
            { label: 'News & Events', path: '/news-events' },
            { label: 'Events Calendar', path: '/events-calendar' },
            { label: 'News & Announcements', path: '/news' },
            { label: 'Weekly Newsletter', path: '/newsletter' },
            { label: 'Newsletter Archive', path: '/newsletter-archive' },
        ],
    },
    {
        label: 'Contact',
        path: '/contact',
        children: [
            { label: 'Contact Us', path: '/contact' },
            { label: 'Parish Registration', path: '/registration' },
        ],
    },
    {
        label: 'Links',
        path: '/links',
        children: [
            { label: 'Diocese of Wrexham', path: '#' },
            { label: 'Useful Links', path: '/links' },
        ],
    },
]

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(null)
    const location = useLocation()

    return (
        <nav className="navbar">
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="logo-icon">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                            <rect width="28" height="28" rx="4" fill="#c9a84c" />
                            <path d="M14 4 L14 24 M8 10 L20 10" stroke="#1e3a5f" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">St Mary's Cathedral</span>
                        <span className="logo-sub">WREXHAM</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <ul className="navbar-links">
                    {navItems.map((item) => (
                        <li
                            key={item.label}
                            className={`nav-item ${item.children ? 'has-dropdown' : ''}`}
                            onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.label}
                                {item.children && <span className="dropdown-arrow">▾</span>}
                            </Link>
                            {item.children && openDropdown === item.label && (
                                <ul className="dropdown">
                                    {item.children.map((child) => (
                                        <li key={child.label}>
                                            <Link to={child.path} className="dropdown-link">
                                                {child.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Donate Button */}
                <Link to="/donate" className="btn-gold navbar-donate">
                    <span>♡</span> Donate
                </Link>

                {/* Mobile hamburger */}
                <button
                    className="hamburger"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span><span></span><span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="mobile-menu">
                    {navItems.map((item) => (
                        <div key={item.label}>
                            <Link
                                to={item.path}
                                className="mobile-link"
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.label}
                            </Link>
                            {item.children && (
                                <div className="mobile-sub">
                                    {item.children.map((child) => (
                                        <Link
                                            key={child.label}
                                            to={child.path}
                                            className="mobile-sub-link"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            {child.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <Link to="/donate" className="btn-gold" style={{ margin: '12px 16px' }} onClick={() => setMobileOpen(false)}>
                        ♡ Donate
                    </Link>
                </div>
            )}
        </nav>
    )
}
