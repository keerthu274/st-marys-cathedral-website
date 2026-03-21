import { SacramentHero, SacramentIntro, SacramentInfoCards, SacramentSchedule, SacramentSteps, SacramentCTA, RelatedSacraments } from '../components/sacraments/SacramentSections'
import baptismHero from '../assets/baptism-hero.jpg'

const baptismCards = [
    {
        title: 'Who Can Receive Baptism',
        content: 'Baptism is available to infants of Catholic parents, as well as adults who wish to join the Catholic Church through the RCIA process.'
    },
    {
        title: 'Requirements',
        content: 'At least one parent must be a practicing Catholic. Godparents must be over 16, confirmed, and active in their faith.'
    },
    {
        title: 'Documents Needed',
        content: 'A copy of the child’s birth certificate and, if parents are not from this parish, a letter of permission from their home parish priest.'
    },
    {
        title: 'Preparation',
        content: 'Parents and godparents are required to attend a preparation session to understand the significance and responsibilities of the sacrament.'
    }
]

const baptismSteps = [
    {
        title: 'Contact Parish Office',
        content: 'Reach out to us to express your interest in baptism for your child or yourself.'
    },
    {
        title: 'Complete Baptism Form',
        content: 'Fill out the necessary registration forms provided by the parish office.'
    },
    {
        title: 'Attend Preparation Meeting',
        content: 'Join other parents for a short session on the meaning of Baptism and the ceremony details.'
    },
    {
        title: 'Schedule Baptism Date',
        content: 'Once preparation is complete, we will confirm the date for the celebration.'
    }
]

export default function BaptismPage() {
    return (
        <div className="sacrament-page">
            <SacramentHero 
                title="Baptism"
                subtitle="Welcoming new members into the Catholic faith"
                image={baptismHero}
            />
            
            <SacramentIntro 
                title="Sacrament of New Life"
                text="Holy Baptism is the basis of the whole Christian life, the gateway to life in the Spirit, and the door which gives access to the other sacraments. Through Baptism we are freed from sin and reborn as sons of God; we become members of Christ, are incorporated into the Church and made sharers in her mission."
            />

            <SacramentInfoCards cards={baptismCards} />

            <SacramentSchedule 
                title="Schedule"
                content="Baptisms are typically held after Sunday Mass or by special appointment."
            />

            <SacramentSteps 
                title="Steps to Baptism"
                steps={baptismSteps}
            />

            <SacramentCTA 
                title="Is your child ready for Baptism?"
                description="We are delighted to welcome your child into our faith community. Contact us today to begin the registration process and join a preparation meeting."
                buttonText="Register for Baptism"
                link="/contact?subject=Baptism Enquiry"
            />

            <RelatedSacraments current="Baptism" />
        </div>
    )
}
