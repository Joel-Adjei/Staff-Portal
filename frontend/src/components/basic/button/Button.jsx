import React from "react";
import { colors } from "../../../assets/assets";
import {usePortal} from "../../../context/PortalContext";

// --- Reusable Button Component ---
const Button = ({ children, onClick, className = '', type = 'button' }) => {

    const {darkMode} = usePortal();
    return (
    <button
        type={type}
        onClick={onClick}
        className={`w-fit  darK:text-[#F8F9FF] dark:bg-gradient-to-br dark:from-orange-600 dark:to-orange-900 bg-gradient-to-br from-blue-900 to-blue-800 hover:bg-blue-950 text-md text-white font-semibold py-2 px-12 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
        {children}
    </button>
    )
};

export default Button