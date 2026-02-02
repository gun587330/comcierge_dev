import React from 'react'
import { useToast, ToastContainer } from './index'

/**
 * Toast 시스템 사용 예시
 * 
 * 사용법:
 * 1. useToast 훅을 사용하여 toast 함수들을 가져옵니다
 * 2. showToast 함수로 알림을 표시합니다
 * 3. ToastContainer를 앱의 최상위에 추가합니다
 * 
 * 예시:
 * ```jsx
 * function MyComponent() {
 *   const { toasts, showToast, removeToast } = useToast()
 * 
 *   const handleClick = () => {
 *     showToast('작업이 완료되었습니다!', {
 *       type: 'success',
 *       duration: 3000,
 *       position: 'top-right'
 *     })
 *   }
 * 
 *   return (
 *     <>
 *       <button onClick={handleClick}>알림 표시</button>
 *       <ToastContainer toasts={toasts} position="top-right" onRemove={removeToast} />
 *     </>
 *   )
 * }
 * ```
 */
const ToastExample = () => {
  const { toasts, showToast, removeToast, clearAll } = useToast()

  return (
    <div style={{ padding: '20px' }}>
      <h2>Toast 알림 시스템 예시</h2>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button
          onClick={() =>
            showToast('정보 메시지입니다', {
              type: 'info',
              duration: 3000,
            })
          }
        >
          Info Toast
        </button>
        
        <button
          onClick={() =>
            showToast('성공 메시지입니다!', {
              type: 'success',
              duration: 3000,
            })
          }
        >
          Success Toast
        </button>
        
        <button
          onClick={() =>
            showToast('경고 메시지입니다', {
              type: 'warning',
              duration: 3000,
            })
          }
        >
          Warning Toast
        </button>
        
        <button
          onClick={() =>
            showToast('에러 메시지입니다', {
              type: 'error',
              duration: 3000,
            })
          }
        >
          Error Toast
        </button>
        
        <button onClick={clearAll}>모두 닫기</button>
      </div>

      <ToastContainer
        toasts={toasts}
        position="top-right"
        onRemove={removeToast}
      />
    </div>
  )
}

export default ToastExample
