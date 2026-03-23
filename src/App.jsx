import React from 'react'
import Home from './pages/Home'
import { LanguageProvider } from './context/LanguageContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
