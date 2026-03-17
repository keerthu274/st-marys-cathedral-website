import { SacramentHero, SacramentIntro, SacramentInfoCards, SacramentSteps, SacramentCTA, RelatedSacraments } from '../components/sacraments/SacramentSections'

const marriageCards = [
    {
        title: 'Eligibility',
        content: 'At least one of the parties must be a baptized Catholic. Couples from outside the parish are welcome but need permission from their home parish.'
    },
    {
        title: 'Preparation',
        content: 'Couples must participate in a Marriage Preparation Course to reflect on the meaning of Christian marriage and their future life together.'
    },
    {
        title: 'Required Documents',
        content: 'Recent baptism certificates (issued within 6 months), evidence of freedom to marry, and civil marriage marriage documents are required.'
    },
    {
        title: 'Booking the Church',
        content: 'It is essential to contact the parish at least six months (preferably a year) before your intended wedding date.'
    }
]

const marriageSteps = [
    {
        title: 'Contact Parish Priest',
        content: 'Arrange an initial meeting with the priest to discuss your intention to marry.'
    },
    {
        title: 'Complete Marriage Forms',
        content: 'Work with the priest to complete the necessary canonical paperwork.'
    },
    {
        title: 'Attend Preparation Course',
        content: 'Enrol in and complete an approved Catholic Marriage Preparation course.'
    },
    {
        title: 'Confirm Wedding Date',
        content: 'Finalise the date, time, and liturgical details for your celebration.'
    }
]

export default function MarriagePage() {
    return (
        <div className="sacrament-page">
            <SacramentHero 
                title="Marriage"
                subtitle="A sacred covenant of love before God"
                image="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1600"
            />
            
            <SacramentIntro 
                title="Two Become One"
                text="The matrimonial covenant, by which a man and a woman establish between themselves a partnership of the whole of life, is by its nature ordered toward the good of the spouses and the procreation and education of offspring; this covenant between baptized persons has been raised by Christ the Lord to the dignity of a sacrament."
            />

            <SacramentInfoCards cards={marriageCards} />

            <SacramentSteps 
                title="Planning Your Wedding"
                steps={marriageSteps}
            />

            <SacramentCTA 
                title="Thinking of getting married?"
                description="Congratulations on your engagement! Please get in touch with us to begin the beautiful journey toward the sacrament of Matrimony."
                buttonText="Enquire About Marriage"
                link="/contact?subject=Marriage Enquiry"
            />

            <RelatedSacraments current="Marriage" />
        </div>
    )
}
