import { SacramentHero, SacramentIntro, SacramentInfoCards, SacramentSchedule, SacramentSteps, SacramentCTA, RelatedSacraments } from '../components/sacraments/SacramentSections'
import reconciliationHero from '../assets/reconciliation-hero.jpg'

const reconciliationCards = [
    {
        title: 'What is Reconciliation',
        content: 'Also known as Confession or Penance, it is the sacrament through which we receive God’s mercy and the forgiveness of sins committed after Baptism.'
    },
    {
        title: 'How to Prepare',
        content: 'Spend some quiet time in prayer performing an "Examination of Conscience" to reflect on your life and actions.'
    },
    {
        title: 'Why Confession is Important',
        content: 'It reconciles us with God and with the Church, restores us to grace, and gives us spiritual strength to live a more Christian life.'
    },
    {
        title: 'Private Confession',
        content: 'You can choose to confess face-to-face or behind a screen. The priest is bound by the "seal of confession" to never reveal what is said.'
    }
]

const reconciliationSteps = [
    {
        title: 'Examine Your Conscience',
        content: 'Reflect on your life and identify areas where you need God’s forgiveness.'
    },
    {
        title: 'Go to Confession',
        content: 'Approach the priest and confess your sins with a contrite heart.'
    },
    {
        title: 'Receive Absolution',
        content: 'The priest, acting in the person of Christ, will grant you God’s forgiveness.'
    },
    {
        title: 'Perform Your Penance',
        content: 'Complete the prayer or action suggested by the priest to show your desire for change.'
    }
]

export default function ReconciliationPage() {
    return (
        <div className="sacrament-page">
            <SacramentHero 
                title="Reconciliation"
                subtitle="The healing gift of God's forgiveness"
                image={reconciliationHero}
            />
            
            <SacramentIntro 
                title="God's Infinite Mercy"
                text="The Lord Jesus Christ, physician of our souls and bodies, who forgave the sins of the paralytic and restored him to bodily health, has willed that his Church continue, in the power of the Holy Spirit, his work of healing and salvation, even among her own members."
            />

            <SacramentInfoCards cards={reconciliationCards} />

            <SacramentSchedule 
                title="Confession Times"
                content="Saturdays: 30 minutes before Mass or by appointment."
            />

            <SacramentSteps 
                title="Going to Confession"
                steps={reconciliationSteps}
            />

            <SacramentCTA 
                title="Seeking God’s Forgiveness?"
                description="The Sacrament of Reconciliation is a beautiful way to experience God’s mercy and start fresh. If it has been a long time, don't worry—the priest will guide you through the process."
                buttonText="View Contact Details"
                link="/contact?subject=Sacramental Enquiry"
            />

            <RelatedSacraments current="Reconciliation" />
        </div>
    )
}
