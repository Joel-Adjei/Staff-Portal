import React from "react";

// --- Reusable Button Component ---
const OutlineButton = ({ children, onClick, className = '', type = 'button' }) => {

    return (
    <button
        type={type}
        onClick={onClick}
        className={`w-fit border border-orange-color flex gap-2 items-center hover:bg-blue-50 text-sm text-orange-color font-semibold py-1 px-7 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
                dark:border-blue-300 dark:text-blue-300
        ${className}`}
    >
        {children}
    </button>
    )
};

export default OutlineButton