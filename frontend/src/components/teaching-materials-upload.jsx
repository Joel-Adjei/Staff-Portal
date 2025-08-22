import React, { useRef, useState, useEffect } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader, Send , ChevronDown, Trash } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';
import Button from './basic/button/Button';
import useToast from '../hooks/useToast';
import {Formik} from "formik"
import * as Yup from "yup"
import { ToastContainer } from '../Toast';
import { ProcessIndicator } from './basic/loading/PortalLoading';
import CustomDropdown from "./basic/input/CustomDropdown";

const inputStyle = `appearance-none rounded dark:bg-[#6F7FC0]/30 dark:border-[#EEA215] dark:text-white   bg-slate-100 border-blue-500 text-gray-700 border-b-[1px] w-full py-3 px-4 placeholder:italic leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`
const label ="block text-sm font-medium text-gray-700 dark:text-blue-200 mb-2"

const CLASS_OPTIONS = [
  {value : "basic-1" , label: "Class 1"},
  {value : "basic-2" , label: "Class 2"},
  {value : "basic-3" , label: "Class 3"},
  {value : "basic-4" , label: "Class 4"},
  {value : "basic-5" , label: "Class 5"},
  {value : "basic-6" , label: "Class 6"},
]
export default function TLMUploadForm() {
  const [formData, setFormData] = useState({
    title: '',
    class: '',
    file: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [error, setError] = useState('');
  const {toasts, addToast, removeToast} = useToast()
  const {token} = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };

  const handleSelect = (value) => {
    setFormData(prev => ({
      ...prev,
      class: value
    }));
    // Clear any previous errors when user starts typing
    if (error) setError('');
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type (optional - you can customize this)
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
      if (allowedTypes.includes(file.type)) {
        setFormData(prev => ({
          ...prev,
          file: file
        }));
        if (error) setError('');
      } else {
        setError('Please select a valid file type (PDF, DOC, DOCX, or TXT)');
        e.target.value = '';
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      addToast('Title is required')
      // setError('Title is required');
      return;
    }
    if (!formData.class.trim()) {
      addToast('Class is required')
      // setError('Description is required');
      return;
    }
    if (!formData.file) {
      addToast('Please select a file to upload')
      // setError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setError('');
    setUploadStatus(null);

    try {
      // Create FormData object for multipart/form-data
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.class);
      submitData.append('file', formData.file);

      const response = await fetch('http://localhost:3000/users/staff/submitTLMs', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.current}`, // Replace with actual token
        },
        body: submitData
      });

      if (response.ok) {
        setUploadStatus('success');
        // Reset form
        setFormData({
          name: '',
          class: '',
          file: null
        });
        // Reset file input
        document.getElementById('file-input').value = '';
      } else {
        addToast('Upload failed, please try again' , "error")
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      // addToast('Upload failed. Please try again.' , "error")
      setError(err.message || 'Upload failed. Please try again.');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const resetFile = () => {
    setFormData({
      title: '',
      class: '',
      file: null
    })
  };

  return (
    <div className="min-h-screen ">
       <ToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="">
        <div>
          <div className="space-y-6 pt-4">
            {/* Title Input */}
            <div>
              <label htmlFor="title" className={label}>
                Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.name}
                onChange={handleInputChange}
                className={inputStyle}
                placeholder="Enter the title of your material"
                required
              />
            </div>

            {/* Description Input */}
            <div>
              <label htmlFor="description" className={label}>
                Class *
              </label>

              <CustomDropdown
                  options={CLASS_OPTIONS}
                  value={formData.class}
                  placeholder={"Select class"}
                  onChange={handleSelect}
              />

            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file-input" className={label}>
                Upload File *
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 dark:bg-blue-950 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-input"
                      className="relative cursor-pointer px-2 bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-input"
                        name="file"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.txt"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX, TXT up to 10MB</p>
                </div>
              </div>
              
              {/* Selected File Info */}
              {formData.file && (
                <div className="flex items-center justify-between mt-3 py-6 px-3 bg-gray-100 dark:bg-blue-950 shadow-md rounded-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900 dark:text-blue-200">{formData.file.name}</span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-blue-300">{formatFileSize(formData.file.size)}</span>
                  </div>

                  <button 
                    className='p-2 hover:bg-red-400 cursor-pointer rounded-sm'
                    onClick={resetFile}
                    >
                    <Trash className='size-4 text-red-800' />
                  </button>
                </div>
              )}
            </div>

            {/* Success Message */}
            {uploadStatus === 'success' && (
              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-md">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-sm text-green-700">TLM uploaded successfully!</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                disabled={isUploading}
                onClick={handleSubmit}
                className="w-full flex justify-center items-center"
              >
                {isUploading ? (
                  <>
                    <ProcessIndicator label={"Uploading..."} />
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit TLM
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Need help? Contact your system administrator for assistance.</p>
          </div>
        </div>
      </div>
    </div>
  );
}




// This wrapper component connects our CustomDropdown to Formik's state.
const FormikDropdown = ({ options, placeholder, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const onChange = (value) => {
    helpers.setValue(value);
  };

  return (
    <div>
      <CustomDropdown
        options={options}
        placeholder={placeholder}
        value={field.value}
        onChange={onChange}
      />
      <ErrorMessage name={props.name}>
        {msg => <div className="mt-1 text-xs text-red-500">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};



// Define validation schema with Yup
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  // Validation for the custom dropdown
  className: Yup.string()
    .oneOf(CLASS_OPTIONS.map(c => c.value).filter(v => v !== ''), 'Please select a valid class')
    .required('Class is required'),
  file: Yup.mixed()
    .required('A file is required')
    .test('fileSize', 'File is too large (max 10MB)', (value) => {
      return value && value.size <= 10485760; // 10 MB
    })
    .test('fileType', 'Invalid file type (PDF, DOC, DOCX, TXT)', (value) => {
      return value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(value.type);
    }),
});

