import React from 'react'
import './Flow.css'

function Flow() {
  const steps = [
    {
      number: 1,
      title: '임직원 요청 접수',
      description: '임직원이 리서치, 예약, 일정 정리 등의 업무를 요청합니다.'
    },
    {
      number: 2,
      title: 'AI Squire가 업무 정리',
      description: 'AI가 요청 내용을 분석하고 우선순위를 정리하여 효율적으로 처리합니다.'
    },
    {
      number: 3,
      title: '장애인 근로자 최종 판단',
      description: '장애인 근로자가 AI의 분석 결과를 검토하고 최종 결정을 내립니다.'
    },
    {
      number: 4,
      title: '고급 비즈니스 결과물 전달',
      description: '완성된 결과물을 임직원에게 전달하여 업무 효율을 높입니다.'
    }
  ]

  return (
    <section className="flow">
      <div className="flow-container">
        <h2 className="flow-title">서비스 프로세스</h2>
        <div className="flow-steps">
          {steps.map((step, index) => (
            <div key={step.number} className="flow-step">
              <div className="flow-step-number">{step.number}</div>
              <div className="flow-step-content">
                <h3 className="flow-step-title">{step.title}</h3>
                <p className="flow-step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="flow-arrow">→</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Flow
