import React, { useEffect, useState, useCallback } from 'react'
import './Toast.css'

const Toast = ({
  message,
  type = 'info',
  position = 'top-right',
  duration = 3000,
  onClose,
  showProgress = true,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const [progress, setProgress] = useState(100)

  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => {
      onClose?.()
    }, 300) // 애니메이션 시간과 맞춤
  }, [onClose])

  useEffect(() => {
    if (duration > 0) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev <= 0) {
            clearInterval(interval)
            handleClose()
            return 0
          }
          return prev - (100 / (duration / 50))
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [duration, handleClose])

  if (!isVisible) return null


  return (
    <div
      className={`toast toast--${type} toast--${position} toast--enter`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast__content">
        <div className="toast__icon">
          {type === 'success' && '✓'}
          {type === 'error' && '✕'}
          {type === 'warning' && '⚠'}
          {type === 'info' && 'ℹ'}
        </div>
        <div className="toast__message">{message}</div>
        <button
          className="toast__close"
          onClick={handleClose}
          aria-label="닫기"
        >
          <svg
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="currentColor"
          >
            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
          </svg>
        </button>
      </div>
      {showProgress && duration > 0 && (
        <div className="toast__progress-wrapper">
          <div
            className="toast__progress-bar"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Toast
