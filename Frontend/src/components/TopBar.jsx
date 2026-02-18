import './TopBar.css'

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="container topbar-inner">
                <a href="mailto:info@stmaryscathedral.org.uk" className="topbar-link">
                    <span>✉</span> info@stmaryscathedral.org.uk
                </a>
                <div className="topbar-right">
                    <span className="topbar-link">
                        <span>📞</span> 01978 262 826
                    </span>
                    <span className="topbar-divider">|</span>
                    <span className="topbar-link">
                        <span>📍</span> Regent Street, Wrexham LL11 1RR
                    </span>
                </div>
            </div>
        </div>
    )
}
