import React from 'react'
import './Value.css'

function Value() {
  const companyValues = [
    {
      title: '장애인 고용부담금 절감',
      description: '장애인 직접고용으로 고용부담금을 절감하고 ESG 성과를 달성합니다.'
    },
    {
      title: 'ESG 성과',
      description: '사회적 가치 창출과 지속가능 경영을 실현합니다.'
    },
    {
      title: '임직원 생산성 향상',
      description: '비본질 업무를 위임하여 핵심 업무에 집중할 수 있습니다.'
    }
  ]

  const employeeValues = [
    {
      title: '비본질 업무 감소',
      description: '리서치, 예약, 일정 정리 등 반복적인 업무를 위임합니다.'
    },
    {
      title: '시간 절약',
      description: '개인 업무 처리 시간을 절약하여 업무 효율을 높입니다.'
    }
  ]

  return (
    <section id="core-value" className="value">
      <div className="value-container">
        <h2 className="value-title">핵심 가치</h2>
        
        <div className="value-section">
          <h3 className="value-section-title">기업 관점</h3>
          <div className="value-cards">
            {companyValues.map((item, index) => (
              <div key={index} className="value-card">
                <h4 className="value-card-title">{item.title}</h4>
                <p className="value-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="value-section">
          <h3 className="value-section-title">임직원 관점</h3>
          <div className="value-cards">
            {employeeValues.map((item, index) => (
              <div key={index} className="value-card">
                <h4 className="value-card-title">{item.title}</h4>
                <p className="value-card-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Value
