import React, { useState } from 'react'
import RequestCard from './RequestCard'
import { dummyRequests } from '../data/dummyData'
import './Dashboard.css'

function Dashboard({ onBackClick }) {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [filter, setFilter] = useState('전체')

  const formatResultText = (text) => {
    if (!text) return null
    
    // 줄 단위로 나누고 각 줄을 처리
    const lines = text.split('\n')
    
    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        return <br key={lineIndex} />
      }
      
      // 숫자(날짜, 비용 등) 강조
      let processedLine = line.split(/(\d+[월일일시만원원]?)/g).map((part, partIndex) => {
        if (/^\d+/.test(part) || part.includes('만원') || part.includes('원')) {
          return <strong key={partIndex} style={{ color: '#2563eb', fontWeight: '700' }}>{part}</strong>
        }
        return part
      })
      
      // 장소명 강조
      processedLine = processedLine.map((part, partIndex) => {
        if (typeof part === 'string') {
          const placePattern = /(강남|여의도|호텔|레스토랑|회의실|세미나|컨벤션센터|컨벤션)/g
          const parts = part.split(placePattern)
          return parts.map((p, i) => {
            if (placePattern.test(p)) {
              return <strong key={`${partIndex}-${i}`} style={{ color: '#059669', fontWeight: '700' }}>{p}</strong>
            }
            return p
          })
        }
        return part
      }).flat()
      
      // 상태/동작 강조
      processedLine = processedLine.map((part, partIndex) => {
        if (typeof part === 'string') {
          const actionPattern = /(예약|완료|추천|설정|등록)/g
          const parts = part.split(actionPattern)
          return parts.map((p, i) => {
            if (actionPattern.test(p)) {
              return <strong key={`action-${partIndex}-${i}`} style={{ color: '#dc2626', fontWeight: '700' }}>{p}</strong>
            }
            return p
          })
        }
        return part
      }).flat()
      
      return (
        <div key={lineIndex} style={{ marginBottom: '12px' }}>
          {processedLine}
        </div>
      )
    })
  }

  const filteredRequests = filter === '전체' 
    ? dummyRequests 
    : dummyRequests.filter(req => {
        if (filter === '요청됨') return req.status === '요청됨'
        if (filter === '처리중') return req.status === '처리중'
        if (filter === '완료') return req.status === '완료'
        return true
      })

  const handleRequestClick = (request) => {
    setSelectedRequest(request)
  }

  const handleCloseDetail = () => {
    setSelectedRequest(null)
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <button className="dashboard-back" onClick={onBackClick}>
          ← 홈으로
        </button>
        <h1 className="dashboard-title">최연우 임직원님의 일정 관리</h1>
      </div>

      <div className="dashboard-container">
        <div className="dashboard-filters">
          {['전체', '요청됨', '처리중', '완료'].map(status => (
            <button
              key={status}
              className={`dashboard-filter ${filter === status ? 'active' : ''}`}
              onClick={() => setFilter(status)}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="dashboard-requests">
          {filteredRequests.map(request => (
            <RequestCard
              key={request.id}
              request={request}
              onClick={() => handleRequestClick(request)}
            />
          ))}
        </div>
      </div>

      {selectedRequest && (
        <div className="dashboard-detail-overlay" onClick={handleCloseDetail}>
          <div className="dashboard-detail" onClick={(e) => e.stopPropagation()}>
            <button className="dashboard-detail-close" onClick={handleCloseDetail}>
              ×
            </button>
            <h2 className="dashboard-detail-title">{selectedRequest.title}</h2>
            <div className="dashboard-detail-info">
              <span className="dashboard-detail-label">의뢰자:</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{selectedRequest.employee} ({selectedRequest.department})</span>
            </div>
            <div className="dashboard-detail-info">
              <span className="dashboard-detail-label">상태:</span>
              <span className={`dashboard-detail-status status-${selectedRequest.status}`}>
                {selectedRequest.status}
              </span>
            </div>
            <div className="dashboard-detail-info">
              <span className="dashboard-detail-label">요청일:</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>{selectedRequest.createdAt}</span>
            </div>
            {selectedRequest.completedAt && (
              <div className="dashboard-detail-info">
                <span className="dashboard-detail-label">완료일:</span>
                <span style={{ fontWeight: '600', color: '#059669' }}>{selectedRequest.completedAt}</span>
              </div>
            )}
            <div className="dashboard-detail-section">
              <h3 className="dashboard-detail-section-title">요청 내용</h3>
              <p className="dashboard-detail-text">{selectedRequest.description}</p>
            </div>
            {selectedRequest.result && (
              <div className="dashboard-detail-section">
                <h3 className="dashboard-detail-section-title">처리 완료 내역</h3>
                <div className="dashboard-detail-result">
                  <div className="dashboard-detail-text">
                    {formatResultText(selectedRequest.result)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
