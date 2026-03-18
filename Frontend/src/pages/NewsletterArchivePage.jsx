import { NewsHero, NewsIntro, NewsCTA } from '../components/news/NewsEventsSections'
import { Link } from 'react-router-dom'

const archiveData = [
    {
        year: '2025',
        months: [
            { name: 'March Newsletter', date: 'March 09, 2025' },
            { name: 'February Newsletter', date: 'February 15, 2025' },
            { name: 'January Newsletter', date: 'January 12, 2025' }
        ]
    },
    {
        year: '2024',
        months: [
            { name: 'December Newsletter', date: 'December 20, 2024' },
            { name: 'November Newsletter', date: 'November 15, 2024' },
            { name: 'October Newsletter', date: 'October 10, 2024' }
        ]
    }
]

export default function NewsletterArchivePage() {
    return (
        <div className="news-events-page">
            <NewsHero 
                title="Newsletter Archive"
                subtitle="Browse past editions of the parish newsletter."
                image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600"
                breadcrumb="Newsletter Archive"
            />
            
            <NewsIntro 
                title="Preserving Our Parish History"
                text="The digital archive allows you to look back at past announcements, event details, and community milestones. Use the list below to find and download historical bulletins."
            />

            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        
                        <div style={{ marginBottom: '40px', display: 'flex', gap: '20px', background: '#f8f9fa', padding: '24px', borderRadius: '12px' }}>
                            <input 
                                type="text" 
                                placeholder="Search past newsletters..." 
                                style={{ flexGrow: 1, padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                            <select style={{ padding: '12px 20px', borderRadius: '8px', border: '1px solid #ddd' }}>
                                <option>Filter by Year</option>
                                <option>2025</option>
                                <option>2024</option>
                                <option>2023</option>
                            </select>
                        </div>

                        {archiveData.map((group, yearIndex) => (
                            <div key={yearIndex} className="archive-year-group">
                                <h2 className="archive-year-title">{group.year}</h2>
                                {group.months.map((item, monthIndex) => (
                                    <div key={monthIndex} className="archive-item">
                                        <div>
                                            <h4 style={{ color: 'var(--navy)', marginBottom: '4px' }}>{item.name}</h4>
                                            <span style={{ fontSize: '0.8rem', color: 'var(--text-mid)' }}>{item.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <button className="btn-navy" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>View</button>
                                            <button className="btn-gold" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>Download PDF</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <NewsCTA 
                title="Need an Older Edition?"
                description="If you're looking for newsletters from before 2024, please contact the Parish Office as these are stored in our physical archives."
                buttonText="Contact Parish Office"
                buttonLink="/contact"
            />
        </div>
    )
}
