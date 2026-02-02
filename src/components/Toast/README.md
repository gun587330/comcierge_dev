# Toast 알림 시스템

`code.txt`에서 추출한 디자인 시스템을 기반으로 만든 현대적인 React Toast 컴포넌트입니다.

## 특징

- ✅ **디자인 시스템 준수**: code.txt에서 추출한 색상, 간격, 그림자 등 모든 스타일 값 적용
- ✅ **반응형 디자인**: 모바일(480px 이하)에서 자동으로 전체 너비로 변환
- ✅ **Safe Area 지원**: iOS 노치 및 홈 인디케이터 영역 자동 대응
- ✅ **진행바 애니메이션**: 자동으로 진행되는 시각적 피드백
- ✅ **접근성**: ARIA 속성 및 키보드 네비게이션 지원
- ✅ **TypeScript 지원 가능**: JavaScript로 작성되어 TypeScript로 쉽게 변환 가능

## 설치 및 사용

### 1. 기본 사용법

```jsx
import React from 'react'
import { useToast, ToastContainer } from './components/Toast'

function App() {
  const { toasts, showToast, removeToast } = useToast()

  const handleSuccess = () => {
    showToast('작업이 완료되었습니다!', {
      type: 'success',
      duration: 3000,
      position: 'top-right'
    })
  }

  return (
    <div>
      <button onClick={handleSuccess}>성공 알림</button>
      <ToastContainer 
        toasts={toasts} 
        position="top-right" 
        onRemove={removeToast} 
      />
    </div>
  )
}
```

### 2. 다양한 타입의 알림

```jsx
// 정보 알림
showToast('새로운 업데이트가 있습니다', { type: 'info' })

// 성공 알림
showToast('저장되었습니다!', { type: 'success' })

// 경고 알림
showToast('주의가 필요합니다', { type: 'warning' })

// 에러 알림
showToast('오류가 발생했습니다', { type: 'error' })
```

### 3. 위치 설정

```jsx
// 상단
<ToastContainer toasts={toasts} position="top-left" onRemove={removeToast} />
<ToastContainer toasts={toasts} position="top-center" onRemove={removeToast} />
<ToastContainer toasts={toasts} position="top-right" onRemove={removeToast} />

// 하단
<ToastContainer toasts={toasts} position="bottom-left" onRemove={removeToast} />
<ToastContainer toasts={toasts} position="bottom-center" onRemove={removeToast} />
<ToastContainer toasts={toasts} position="bottom-right" onRemove={removeToast} />
```

### 4. 옵션 설정

```jsx
showToast('메시지', {
  type: 'success',        // 'info' | 'success' | 'warning' | 'error'
  duration: 3000,         // 자동 닫힘 시간 (ms), 0이면 수동으로만 닫힘
  position: 'top-right',  // 위치 (컨테이너의 position과 일치해야 함)
  showProgress: true      // 진행바 표시 여부
})
```

### 5. 수동으로 닫기

```jsx
const { toasts, showToast, removeToast, clearAll } = useToast()

// 특정 토스트 제거
removeToast(toastId)

// 모든 토스트 제거
clearAll()
```

## API

### `useToast()` Hook

반환값:
- `toasts`: 현재 표시 중인 토스트 배열
- `showToast(message, options)`: 새 토스트 표시
- `removeToast(id)`: 특정 토스트 제거
- `clearAll()`: 모든 토스트 제거

### `ToastContainer` Props

- `toasts` (array, required): 표시할 토스트 배열
- `position` (string, required): 토스트 위치
  - `'top-left'` | `'top-center'` | `'top-right'`
  - `'bottom-left'` | `'bottom-center'` | `'bottom-right'`
- `onRemove` (function, required): 토스트 제거 콜백

### `Toast` Props (직접 사용 시)

- `message` (string, required): 표시할 메시지
- `type` (string, default: 'info'): 토스트 타입
- `position` (string, default: 'top-right'): 위치
- `duration` (number, default: 3000): 자동 닫힘 시간 (ms)
- `showProgress` (boolean, default: true): 진행바 표시 여부
- `onClose` (function): 닫힘 콜백

## 스타일 커스터마이징

모든 스타일은 CSS 변수로 관리되며, `src/index.css`에서 수정할 수 있습니다:

```css
:root {
  --color-info: #3498db;
  --color-success: #07bc0c;
  --color-warning: #f1c40f;
  --color-error: hsl(6, 78%, 57%);
  --toast-width: 320px;
  --toast-radius: 6px;
  --toast-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  /* ... 기타 변수들 */
}
```

## 반응형 동작

- **데스크톱**: 고정 너비 (320px), 둥근 모서리
- **모바일 (480px 이하)**: 전체 너비, 모서리 없음, Safe Area 자동 대응

## 예시

`ToastExample.jsx` 파일을 참고하세요.
