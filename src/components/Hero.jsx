import React from 'react'
import './Hero.css'

function Hero({ onDemoClick }) {
  return (
    <section className="hero">
      <div className="hero-container">
        <h2 className="hero-title">
          장애인 직접고용을 생산적인 임직원 복지로 전환하는<br/> AI 컨시어지
        </h2>
        <p className="hero-subtitle">
          Comcierge는 AI의 도움을 받는 장애인 근로자가 임직원의 개인 업무를 처리하여
          <br />
          기업의 ESG 성과와 임직원 생산성을 동시에 향상시킵니다.
        </p>
        <button className="hero-cta" onClick={onDemoClick}>
          대시보드 Demo
        </button>
      </div>
    </section>
  )
}

export default Hero
