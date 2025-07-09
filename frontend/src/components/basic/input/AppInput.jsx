import React from "react";
import {ErrorMessage, Field, Form} from "formik";

const inputStyle = `appearance-none rounded dark:bg-[#6F7FC0]/30 dark:border-[#EEA215] dark:text-white   bg-slate-100 border-blue-500 text-gray-700 border-b-[1px] w-full py-3 px-4 placeholder:italic leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`

// --- Reusable Input Component ---
const AppInput = ({ as , type, placeholder, name, otherProps , id }) => {
    return (
        <div className="mb-4">
            {/* Email Field */}
            <Field
                as={as}
                type={type}
                id={id}
                name={name}
                className={inputStyle}
                placeholder={placeholder}
                {...otherProps}
            />
            <ErrorMessage name={name} component="div" className="text-red-500 text-xs mt-1" />
        </div>
    )
};

export default AppInput