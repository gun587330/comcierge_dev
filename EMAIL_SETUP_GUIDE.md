# 이메일 전송 설정 가이드

Contact 폼에서 실제 이메일을 받기 위한 설정 방법입니다.

## 방법 1: EmailJS 사용 (추천 - 가장 간단)

### 1단계: EmailJS 패키지 설치
```bash
npm install @emailjs/browser
```

### 2단계: EmailJS 계정 생성 및 설정
1. [EmailJS](https://www.emailjs.com/)에 가입 (무료 플랜 제공)
2. 대시보드에서 **Email Services** 추가
   - Gmail, Outlook 등 원하는 이메일 서비스 선택
   - 이메일 계정 연결

3. **Email Templates** 생성
   - 새 템플릿 생성
   - 다음 변수들을 사용:
     - `{{from_name}}` - 보낸 사람 이름
     - `{{from_email}}` - 보낸 사람 이메일
     - `{{company}}` - 회사명
     - `{{phone}}` - 연락처
     - `{{message}}` - 문의 내용
     - `{{to_email}}` - 받을 이메일 주소
   - To Email 필드에 `{{to_email}}` 또는 직접 이메일 주소 입력
   - Reply To 필드에 `{{from_email}}` 입력

4. **API Keys**에서 Public Key 복사

### 3단계: Contact.jsx 파일 업데이트
`src/components/Contact.jsx` 파일에서 다음 값들을 실제 값으로 변경:

```javascript
await emailjs.send(
  'YOUR_SERVICE_ID',      // EmailJS 서비스 ID (Email Services에서 확인)
  'YOUR_TEMPLATE_ID',      // EmailJS 템플릿 ID (Email Templates에서 확인)
  {
    from_name: formData.name,
    from_email: formData.email,
    company: formData.company,
    phone: formData.phone,
    message: formData.message,
    to_email: 'your-email@example.com' // 실제 받을 이메일 주소
  },
  'YOUR_PUBLIC_KEY'        // EmailJS Public Key
)
```

### 4단계: EmailJS 초기화 (선택사항)
`src/main.jsx` 또는 `src/App.jsx`에 다음 코드 추가:

```javascript
import emailjs from '@emailjs/browser'

// EmailJS 초기화
emailjs.init('YOUR_PUBLIC_KEY')
```

---

## 방법 2: Formspree 사용 (더 간단하지만 제한적)

### 1단계: Formspree 계정 생성
1. [Formspree](https://formspree.io/)에 가입
2. 새 Form 생성
3. Form 엔드포인트 URL 복사 (예: `https://formspree.io/f/YOUR_FORM_ID`)

### 2단계: Contact.jsx 수정
EmailJS 대신 Formspree를 사용하도록 수정:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message
      })
    })

    if (response.ok) {
      alert('문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.')
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        message: ''
      })
    } else {
      throw new Error('Form submission failed')
    }
  } catch (error) {
    console.error('Form submission failed:', error)
    alert('문의 전송에 실패했습니다. 다시 시도해주세요.')
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 방법 3: 백엔드 API 구축 (가장 유연하지만 복잡)

자체 백엔드 서버를 구축하여 이메일을 전송하는 방법입니다.

### Node.js + Nodemailer 예시

1. 백엔드 서버 생성 (예: Express.js)
2. Nodemailer 설치 및 설정
3. API 엔드포인트 생성
4. Contact.jsx에서 API 호출

이 방법은 더 많은 제어권이 필요하지만, 보안과 커스터마이징 측면에서 유리합니다.

---

## 추천 방법

**EmailJS**를 추천합니다:
- ✅ 설정이 간단함
- ✅ 무료 플랜 제공 (월 200건)
- ✅ 클라이언트 사이드에서 직접 처리 가능
- ✅ 다양한 이메일 서비스 지원
- ✅ 템플릿 커스터마이징 가능

---

## 보안 참고사항

- EmailJS Public Key는 클라이언트에 노출되어도 안전합니다
- 민감한 정보는 서버 사이드에서 처리하는 것을 권장합니다
- 프로덕션 환경에서는 Rate Limiting을 고려하세요

---

## 문제 해결

### 이메일이 오지 않는 경우
1. EmailJS 대시보드에서 로그 확인
2. 스팸 폴더 확인
3. 이메일 서비스 연결 상태 확인
4. 템플릿 설정 확인

### CORS 오류 발생 시
- EmailJS는 CORS를 지원하므로 문제없어야 합니다
- Formspree 사용 시 CORS 설정 확인
