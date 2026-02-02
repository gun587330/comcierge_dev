import React, { useState } from 'react'
import './Contact.css'

// EmailJS는 선택적으로 import (패키지 설치 후 활성화)
let emailjs = null
try {
  emailjs = require('@emailjs/browser')
} catch (e) {
  console.warn('EmailJS not installed. Please run: npm install @emailjs/browser')
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // EmailJS가 설치되지 않은 경우
    if (!emailjs) {
      alert('이메일 전송 기능을 사용하려면 다음 명령어를 실행해주세요:\nnpm install @emailjs/browser\n\n그리고 Contact.jsx 파일에서 EmailJS 설정을 완료해주세요.')
      setIsSubmitting(false)
      return
    }

    try {
      // EmailJS 설정 필요 - EMAIL_SETUP_GUIDE.md 참고
      await emailjs.send(
        'YOUR_SERVICE_ID',      // EmailJS 서비스 ID (EmailJS 대시보드에서 확인)
        'YOUR_TEMPLATE_ID',      // EmailJS 템플릿 ID (EmailJS 대시보드에서 확인)
        {
          from_name: formData.name,
          from_email: formData.email,
          company: formData.company,
          phone: formData.phone,
          message: formData.message,
          to_email: 'your-email@example.com' // 실제 받을 이메일 주소로 변경
        },
        'YOUR_PUBLIC_KEY'        // EmailJS Public Key (EmailJS 대시보드에서 확인)
      )

      alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      })
    } catch (error) {
      console.error('Email sending failed:', error)
      alert('문의 전송에 실패했습니다. 다시 시도해주세요.\n\n설정이 완료되지 않았다면 EMAIL_SETUP_GUIDE.md 파일을 참고해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <h2 className="contact-title">문의하기</h2>
        <p className="contact-subtitle">
          Comcierge 서비스에 대해 궁금한 점이 있으신가요? 아래 양식을 작성해주시면 빠르게 연락드리겠습니다.
        </p>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-form-row">
            <div className="contact-form-group">
              <label htmlFor="name">이름 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="이름을 입력해주세요"
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">이메일 *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@company.com"
              />
            </div>
          </div>

          <div className="contact-form-row">
            <div className="contact-form-group">
              <label htmlFor="company">회사명</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="회사명을 입력해주세요"
              />
            </div>
            <div className="contact-form-group">
              <label htmlFor="phone">연락처</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="010-0000-0000"
              />
            </div>
          </div>

          <div className="contact-form-group">
            <label htmlFor="message">문의 내용 *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="문의하실 내용을 자세히 입력해주세요"
            />
          </div>

          <button type="submit" className="contact-submit" disabled={isSubmitting}>
            {isSubmitting ? '전송 중...' : '문의하기'}
          </button>
        </form>
        
        <p className="contact-copyright">
          © {new Date().getFullYear()} Comcierge. All rights reserved.
        </p>
      </div>
    </section>
  )
}

export default Contact
