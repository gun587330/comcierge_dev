import React from 'react'
import Toast from './Toast'
import './Toast.css'

const ToastContainer = ({ toasts, position = 'top-right', onRemove }) => {
  if (!toasts || toasts.length === 0) return null

  return (
    <div className={`toast-container toast-container--${position}`}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          position={position}
          duration={toast.duration}
          showProgress={toast.showProgress}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  )
}

export default ToastContainer
