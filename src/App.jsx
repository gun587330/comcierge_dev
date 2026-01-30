import React, { useState } from 'react'
import Hero from './components/Hero'
import Flow from './components/Flow'
import Value from './components/Value'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)

  const handleDemoClick = () => {
    setShowDashboard(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      {!showDashboard ? (
        <>
          <Hero onDemoClick={handleDemoClick} />
          <Flow />
          <Value />
          <Footer />
        </>
      ) : (
        <Dashboard onBackClick={() => setShowDashboard(false)} />
      )}
    </div>
  )
}

export default App
