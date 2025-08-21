import React, {useEffect, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";
import {inputStyle} from "./AppInput";

const CustomDropdown = ({ options, placeholder, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOptionClick = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <button
                type="button"
                onClick={toggleDropdown}
                className={inputStyle + " flex items-center justify-between"}
                // className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200
                //     dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600
                //     bg-slate-100 border-gray-300 text-gray-700 border-[1px] hover:bg-slate-200`}
            >
        <span className="truncate">
          {selectedOption ? selectedOption.label : <p className={"italic text-slate-400"}>{placeholder}</p>}
        </span>
                <ChevronDown
                    size={16}
                    className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-blue-950 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
                    <ul className="py-1 max-h-60 overflow-y-auto">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionClick(option)}
                                className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150
                hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-800 dark:hover:text-blue-200
                text-gray-700 dark:text-gray-200"
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CustomDropdown