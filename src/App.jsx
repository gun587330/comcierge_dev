import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Flow from './components/Flow'
import Value from './components/Value'
import Contact from './components/Contact'
import Dashboard from './components/Dashboard'
import { useToast, ToastContainer } from './components/Toast'
import './App.css'

function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const { toasts, showToast, removeToast } = useToast()

  const handleDemoClick = () => {
    setShowDashboard(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    showToast('대시보드로 이동했습니다', { type: 'info', duration: 2000 })
  }

  return (
    <div className="app">
      {!showDashboard ? (
        <>
          <Navbar onDemoClick={handleDemoClick} />
          <Hero onDemoClick={handleDemoClick} />
          <Flow />
          <Value />
          <Contact />
        </>
      ) : (
        <Dashboard onBackClick={() => setShowDashboard(false)} showToast={showToast} />
      )}
      <ToastContainer toasts={toasts} position="top-right" onRemove={removeToast} />
    </div>
  )
}

export default App
