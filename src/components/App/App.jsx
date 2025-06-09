import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from '../../contexts/UserContext'
import Header from '../Header/Header.jsx'
import Footer from '../Footer/Footer.jsx'
import Help from '../../pages/Help/Help.jsx'
import PrivacyPolicy from '../../pages/Privacy/PrivacyPolicy.jsx'
import Home from '../../pages/Home/Home.jsx'
import BookDetail from '../../pages/BookDetail/BookDetail.jsx'
import Favorites from '../../pages/Favorites/Favorites.jsx'
import Profile from '../../pages/Profile/Profile.jsx'
import Messages from '../../pages/Messages/Messages.jsx'
import Community from '../../pages/Community/Community.jsx'
import Notifications from '../../pages/Notifications/Notifications.jsx'
import Books from '../../pages/Books/Books.jsx'
import BookReader from '../../pages/BookReader/BookReader.jsx'

function App() {
  return (
    <UserProvider>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:bookId" element={<BookDetail />} />
            <Route path="/books/:bookId/read" element={<BookReader />} />
            <Route path="/book/:bookId" element={<BookDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Login Page Coming Soon</div>} />
            <Route path="/register" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Register Page Coming Soon</div>} />
            <Route path="/help" element={<Help />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                      <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/account" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Account Settings Coming Soon</div>} />
            <Route path="/privacy" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Privacy Settings Coming Soon</div>} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/terms" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Terms of Service Coming Soon</div>} />
            <Route path="/contact" element={<div style={{padding: '120px 2rem 4rem', textAlign: 'center', color: '#64748b', minHeight: '60vh'}}>Contact Page Coming Soon</div>} />
          </Routes>
        </main>
        <Footer />
        
        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerStyle={{
            zIndex: 999999999,
            top: '100px', // Header'ın altından başlaması için
          }}
          toastOptions={{
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              backdropFilter: 'blur(10px)',
              fontSize: '14px',
              fontWeight: '600',
              maxWidth: '400px',
              zIndex: 999999999,
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </div>
    </UserProvider>
  )
}

export default App;

