import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Help from '../../pages/Help/Help.jsx'
import PrivacyPolicy from '../../pages/Privacy/PrivacyPolicy.jsx'
import Home from '../../pages/Home/Home.jsx'
import BookDetail from '../../pages/BookDetail/BookDetail.jsx'
import Favorites from '../../pages/Favorites/Favorites.jsx'
import Profile from '../../pages/Profile/Profile.jsx'

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Books Page Coming Soon</div>} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/community" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Community Page Coming Soon</div>} />
          <Route path="/login" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Login Page Coming Soon</div>} />
          <Route path="/register" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Register Page Coming Soon</div>} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/account" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Account Settings Coming Soon</div>} />
          <Route path="/privacy" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Privacy Settings Coming Soon</div>} />
          <Route path="/notifications" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Notification Settings Coming Soon</div>} />
          <Route path="/terms" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Terms of Service Coming Soon</div>} />
          <Route path="/contact" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Contact Page Coming Soon</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App;

