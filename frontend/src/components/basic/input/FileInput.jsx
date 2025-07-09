import React, { useState } from 'react'
import { Upload } from "lucide-react";

const FileInput = ({ field, form, ...props }) => {
    const { setFieldValue } = form;
    const [fileName, setFileName] = useState('');

    const handleChange = (event) => {
        const file = event.currentTarget.files[0];
        setFieldValue(field.name, file);
        setFileName(file ? file.name : '');
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleChange}
                {...props}
                className="hidden" // Hide the default input
                id={field.name}
            />
            <label
                htmlFor={field.name}
                className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center shadow-md transition duration-300"
            >
                <Upload className="mr-2 h-5 w-5" />
                {fileName || 'Choose File'}
            </label>
            {fileName && <span className="ml-3 text-gray-600 text-sm">{fileName}</span>}
        </div>
    );
};

export default FileInput