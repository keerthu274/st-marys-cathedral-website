import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MassTimesPage from './pages/MassTimesPage'
import ContactPage from './pages/ContactPage'
import DonatePage from './pages/DonatePage'
import OurParishPage from './pages/OurParishPage'
import ParishCouncilPage from './pages/ParishCouncilPage'
import ParishGroupsPage from './pages/ParishGroupsPage'
import BuildingProjectPage from './pages/BuildingProjectPage'
import FundraisingPage from './pages/FundraisingPage'
import SafeguardingPage from './pages/SafeguardingPage'
import NewsEventsPage from './pages/NewsEventsPage'
import EventsCalendarPage from './pages/EventsCalendarPage'
import NewsAnnouncementsPage from './pages/NewsAnnouncementsPage'
import WeeklyNewsletterPage from './pages/WeeklyNewsletterPage'
import NewsletterArchivePage from './pages/NewsletterArchivePage'
import UsefulLinksPage from './pages/UsefulLinksPage'
import RegistrationPage from './pages/RegistrationPage'
import BaptismPage from './pages/BaptismPage'
import ConfirmationPage from './pages/ConfirmationPage'
import MarriagePage from './pages/MarriagePage'
import ReconciliationPage from './pages/ReconciliationPage'
import DiocesePage from './pages/DiocesePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mass-times" element={<MassTimesPage />} />
          <Route path="/mass-sacraments" element={<MassTimesPage />} />
          <Route path="/baptism" element={<BaptismPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/marriage" element={<MarriagePage />} />
          <Route path="/reconciliation" element={<ReconciliationPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/parish" element={<OurParishPage />} />
          <Route path="/parish-council" element={<ParishCouncilPage />} />
          <Route path="/parish-groups" element={<ParishGroupsPage />} />
          <Route path="/building-project" element={<BuildingProjectPage />} />
          <Route path="/fundraising" element={<FundraisingPage />} />
          <Route path="/safeguarding" element={<SafeguardingPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/events" element={<EventsCalendarPage />} />
          <Route path="/news" element={<NewsAnnouncementsPage />} />
          <Route path="/newsletter" element={<WeeklyNewsletterPage />} />
          <Route path="/newsletter-archive" element={<NewsletterArchivePage />} />
          <Route path="/diocese" element={<DiocesePage />} />
          <Route path="/links" element={<UsefulLinksPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
