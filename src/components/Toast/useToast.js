import { useState, useCallback } from 'react'

let toastIdCounter = 0

export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(
    (message, options = {}) => {
      const {
        type = 'info',
        duration = 3000,
        position = 'top-right',
        showProgress = true,
      } = options

      const id = ++toastIdCounter
      const newToast = {
        id,
        message,
        type,
        duration,
        position,
        showProgress,
      }

      setToasts((prev) => [...prev, newToast])

      // 자동 제거 (duration이 0이면 수동으로만 제거)
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id)
        }, duration + 300) // 애니메이션 시간 포함
      }

      return id
    },
    []
  )

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    removeToast,
    clearAll,
  }
}
