import React from "react";

const MessageAlert = ({ message, type }) => {
  if (!message) return null;
  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-yellow-100';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-yellow-400';
  const textColor = type === 'success' ? 'text-green-700' : 'text-yellow-700';

  return (
    <div className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded-lg absolute top-5 mb-4 z-40`}>
      {message}
    </div>
  );
};

export default MessageAlert;