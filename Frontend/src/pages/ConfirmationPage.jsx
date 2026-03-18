import { SacramentHero, SacramentIntro, SacramentInfoCards, SacramentSteps, SacramentCTA, RelatedSacraments } from '../components/sacraments/SacramentSections'

const confirmationCards = [
    {
        title: 'Who Can Receive Confirmation',
        content: 'Confirmation is for young people (usually Year 8 and above) and adults who have already been baptized and received their First Holy Communion.'
    },
    {
        title: 'Preparation Classes',
        content: 'Candidates must attend a series of preparation sessions designed to deepen their understanding of the faith and the gifts of the Holy Spirit.'
    },
    {
        title: 'Requirements',
        content: 'Candidates need a sponsor who is a practicing Catholic, at least 16 years old, and has themselves been confirmed.'
    },
    {
        title: 'Registration Process',
        content: 'Registration typically opens in the autumn. Keep an eye on the weekly newsletter for announcement of the next course.'
    }
]

const confirmationSteps = [
    {
        title: 'Register for Classes',
        content: 'Complete the registration form when the enrolment period opens.'
    },
    {
        title: 'Attend Preparation Sessions',
        content: 'Participate fully in the scheduled sessions, workshops, and retreats.'
    },
    {
        title: 'Participate in Parish Life',
        content: 'Regular attendance at Sunday Mass is an essential part of the preparation journey.'
    },
    {
        title: 'Receive the Sacrament',
        content: 'The sacrament is usually conferred by the Bishop during a special celebration.'
    }
]

export default function ConfirmationPage() {
    return (
        <div className="sacrament-page">
            <SacramentHero 
                title="Confirmation"
                subtitle="Strengthening faith through the Holy Spirit"
                image="https://images.unsplash.com/photo-1544427920-c49ccfb85579?q=80&w=1600"
            />
            
            <SacramentIntro 
                title="Sealed with the Gift of the Spirit"
                text="Confirmation perfects Baptismal grace; it is the sacrament which gives the Holy Spirit in order to root us more deeply in the divine filiation, incorporate us more firmly into Christ, strengthen our bond with the Church, associate us more closely with her mission, and help us bear witness to the Christian faith in words accompanied by deeds."
            />

            <SacramentInfoCards cards={confirmationCards} />

            <SacramentSteps 
                title="The Path to Confirmation"
                steps={confirmationSteps}
            />

            <SacramentCTA 
                title="Ready to confirm your faith?"
                description="If you or your child would like to join the next Confirmation preparation programme, please register your interest."
                buttonText="Register for Confirmation"
                link="/contact?subject=Confirmation Registration"
            />

            <RelatedSacraments current="Confirmation" />
        </div>
    )
}
