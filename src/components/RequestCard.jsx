import React from 'react'
import './RequestCard.css'

function RequestCard({ request, onClick }) {
  const getStatusClass = (status) => {
    if (status === '요청됨') return 'status-requested'
    if (status === '처리중') return 'status-processing'
    if (status === '완료') return 'status-completed'
    return ''
  }

  return (
    <div className="request-card" onClick={onClick}>
      <div className="request-card-header">
        <h3 className="request-card-title">{request.title}</h3>
        <span className={`request-card-status ${getStatusClass(request.status)}`}>
          {request.status}
        </span>
      </div>
      <div className="request-card-info">
        <span className="request-card-employee">{request.employee}</span>
        <span className="request-card-department">{request.department}</span>
      </div>
      <p className="request-card-description">{request.description}</p>
      <div className="request-card-footer">
        <span className="request-card-date">{request.createdAt}</span>
      </div>
    </div>
  )
}

export default RequestCard
