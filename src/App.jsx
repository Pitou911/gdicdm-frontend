import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Bonds from './pages/Bonds'
import CmsDashboard from './pages/CmsDashboard'
import Contact from './pages/Contact'
import DebtData from './pages/DebtData'
import Documents from './pages/Documents'
import Education from './pages/Education'
import News from './pages/News'
import NewsDetail from './pages/NewsDetail'
import Calendar from './pages/Calendar'
import AuctionResult from './pages/AuctionResult'
import Login from './pages/Login'

function Layout() {
  const location = useLocation();
  const isLogin  = location.pathname === '/login';

  return (
    <>
      {!isLogin && <Navbar />}
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/about"         element={<About />} />
        <Route path="/bonds"         element={<Bonds />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/debt"          element={<DebtData />} />
        <Route path="/documents"     element={<Documents />} />
        <Route path="/education"     element={<Education />} />
        <Route path="/news"          element={<News />} />
        <Route path="/news/:id"      element={<NewsDetail />} />
        <Route path="/calendar"      element={<Calendar />} />
        <Route path="/auction_result" element={<AuctionResult />} />
        <Route path="/login"         element={<Login />} />
        <Route
          path="/cms-dashboard"
          element={
            <ProtectedRoute>
              <CmsDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!isLogin && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  )
}
