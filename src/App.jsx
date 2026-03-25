import React from 'react'
import Home from './pages/Home'
import { LanguageProvider } from './context/LanguageContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Bonds from './pages/Bonds'
import CmsDashboard from './pages/CmsDashboard'
import Contact from './pages/Contact'
import DebtData from './pages/DebtData'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/bonds' element={<Bonds/>}/>
        <Route path='/cms-dashboard' element={<CmsDashboard/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/debt' element={<DebtData/>}/>
      </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
