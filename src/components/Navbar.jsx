import React, { useState, useEffect } from 'react'
import './Navbar.css'

function Navbar({ onDemoClick }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80 // 네비게이션 바 높이 고려
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="navbar-logo">Comcierge</span>
        </div>
        <div className="navbar-menu">
          <button className="navbar-link" onClick={() => scrollToSection('service-intro')}>
            서비스 소개
          </button>
          <button className="navbar-link" onClick={() => scrollToSection('core-value')}>
            핵심 가치
          </button>
          <button className="navbar-link" onClick={() => scrollToSection('contact')}>
            컨택
          </button>
          <button className="navbar-cta" onClick={() => {/* 소개서 다운로드 기능 */}}>
            소개서 다운
          </button>
          <button className="navbar-cta" onClick={onDemoClick}>
            대시보드 Demo ➡
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
