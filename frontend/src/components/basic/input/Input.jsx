import React from "react";

// --- Reusable Input Component ---
const Input = ({ type, placeholder, value, onChange, otherprops , className = '', id }) => {
    return <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...otherprops}
        className={`w-full p-3 bg-gray-100 border-b-[1px] border-blue-500 outline-none text-lg rounded-sm 
            placeholder:italic
            focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
};

export default Input