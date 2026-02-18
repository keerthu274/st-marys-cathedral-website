import './PageHero.css'

export default function PageHero({ title, subtitle, icon }) {
    return (
        <div className="page-hero">
            <div className="container page-hero-inner">
                {icon && <div className="page-hero-icon">{icon}</div>}
                <h1 className="page-hero-title">{title}</h1>
                {subtitle && <p className="page-hero-subtitle">{subtitle}</p>}
            </div>
        </div>
    )
}
