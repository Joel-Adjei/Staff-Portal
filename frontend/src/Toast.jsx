import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Toast = ({ message, type = 'info', duration = 4000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsVisible(false);
        onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 300);
  };

  const getToastStyles = () => {
    const baseStyles = "flex items-center p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm transition-all duration-300 transform";
    const exitStyles = isExiting ? "translate-x-full opacity-0" : "translate-x-0 opacity-100";

    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border-green-500 text-green-800 ${exitStyles}`;
      case 'error':
        return `${baseStyles} bg-red-50 border-red-500 text-red-800 ${exitStyles}`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border-yellow-500 text-yellow-800 ${exitStyles}`;
      default:
        return `${baseStyles} bg-blue-50 border-blue-500 text-blue-800 ${exitStyles}`;
    }
  };

  const getIcon = () => {
    const iconProps = { size: 20, className: "mr-3 flex-shrink-0" };

    switch (type) {
      case 'success':
        return <CheckCircle {...iconProps} className="mr-3 flex-shrink-0 text-green-600" />;
      case 'error':
        return <AlertCircle {...iconProps} className="mr-3 flex-shrink-0 text-red-600" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="mr-3 flex-shrink-0 text-yellow-600" />;
      default:
        return <Info {...iconProps} className="mr-3 flex-shrink-0 text-blue-600" />;
    }
  };

  if (!isVisible) return null;

  return (
      <div className={getToastStyles()}>
        {getIcon()}
        <div className="flex-1 text-sm font-medium">{message}</div>
        <button
            onClick={handleClose}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={18} />
        </button>
      </div>
  );
};

export const ToastContainer = ({ toasts, removeToast }) => {
  return (
      <div className="fixed top-4 right-2 sm:right-4 z-[70] space-y-2 max-w-sm">
        {toasts.map((toast) => (
            <Toast
                key={toast.id}
                message={toast.message}
                type={toast.type}
                duration={toast.duration}
                onClose={() => removeToast(toast.id)}
            />
        ))}
      </div>
  );
};