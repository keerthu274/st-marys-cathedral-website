import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import TopBar from './components/TopBar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import MassTimesPage from './pages/MassTimesPage'
import NewsEventsPage from './pages/NewsEventsPage'
import ContactPage from './pages/ContactPage'
import DonatePage from './pages/DonatePage'
import OurParishPage from './pages/OurParishPage'

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/mass-times" element={<MassTimesPage />} />
          <Route path="/mass-sacraments" element={<MassTimesPage />} />
          <Route path="/news-events" element={<NewsEventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/parish" element={<OurParishPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}

export default App
