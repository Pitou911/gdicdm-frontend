import React from 'react'
import Home from './pages/Home'
import { LanguageProvider } from './context/LanguageContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Bonds from './pages/Bonds'
import CmsDashboard from './pages/CmsDashboard'
import Contact from './pages/Contact'
import DebtData from './pages/DebtData'
import Documents from './pages/Documents'
import Education from './pages/Education'
import News from './pages/News'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/bonds' element={<Bonds/>}/>
        <Route path='/cms-dashboard' element={<CmsDashboard/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/debt' element={<DebtData/>}/>
        <Route path='/documents' element={<Documents/>}/>
        <Route path='/education' element={<Education/>}/>
        <Route path='/news' element={<News/>}/>
      </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
