import React, { useState, useCallback, useRef } from 'react';

let toastFn = null;

export const useToast = () => {
  const show = useCallback((message, type = 'info') => {
    if (toastFn) toastFn(message, type);
  }, []);
  return { show };
};

const icons = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);
  const counterRef = useRef(0);

  toastFn = useCallback((message, type = 'info') => {
    const id = ++counterRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <span style={{ fontSize: 16, color: t.type === 'success' ? 'var(--accent)' : t.type === 'error' ? '#ef4444' : '#3b82f6' }}>
            {icons[t.type]}
          </span>
          <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>{t.message}</span>
        </div>
      ))}
    </div>
  );
};
