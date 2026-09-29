'use client';

import React from 'react';

export default function ToastContainer({ toasts }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          <span style={{ fontSize: '18px' }}>{toast.icon || '✨'}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
