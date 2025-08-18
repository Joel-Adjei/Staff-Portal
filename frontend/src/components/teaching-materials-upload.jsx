import React, { useState } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle, Loader, ChevronDown } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';


const inputStyle = `appearance-none rounded dark:bg-[#6F7FC0]/30 dark:border-[#EEA215] dark:text-white   bg-slate-100 border-blue-500 text-gray-700 border-b-[1px] w-full py-3 px-4 placeholder:italic leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`

const TeachingMaterialsUpload = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    grade: '',
    category: 'lesson-plan'
  });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const {token} = useAuth()
  const {fetchData , response} = useFetch({method : "POST" , endpoint: "/users/staff/submitTLMs"})

  const categories = [
    { value: 'lesson-plan', label: 'Lesson Plan' },
    { value: 'worksheet', label: 'Worksheet' },
    { value: 'presentation', label: 'Presentation' },
    { value: 'assessment', label: 'Assessment' },
    { value: 'resource', label: 'Resource Material' },
    { value: 'multimedia', label: 'Multimedia Content' }
  ];

  const grades = [
    'Pre-K', 'Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', 
    '4th Grade', '5th Grade', '6th Grade', '7th Grade', '8th Grade', 
    '9th Grade', '10th Grade', '11th Grade', '12th Grade'
  ];

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    addFiles(selectedFiles);
  };

  const addFiles = (newFiles) => {
    const validFiles = newFiles.filter(file => {
      const maxSize = 50 * 1024 * 1024; // 50MB
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'image/jpeg',
        'image/png',
        'image/gif',
        'video/mp4',
        'audio/mpeg',
        'text/plain'
      ];
      
      return file.size <= maxSize && allowedTypes.includes(file.type);
    });

    setFiles(prev => [...prev, ...validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type
    }))]);
  };

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.subject.trim()) return 'Subject is required';
    if (!formData.grade) return 'Grade level is required';
    if (files.length === 0) return 'At least one file is required';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setUploadStatus({ type: 'error', message: validationError });
      return;
    }

    setUploading(true);
    setUploadStatus(null);

    try {
      // Create FormData object for file upload
      const uploadFormData = new FormData();
      
      // // Append form fields
      // Object.keys(formData).forEach(key => {
      //   uploadFormData.append(key, formData[key]);
      // });
      
      // Append files
      files.forEach((fileObj, index) => {
        uploadFormData.append(`files`, fileObj.file);
      });

      // API call to backend
      const response = await fetch('http://localhost:3000/users/staff/submitTLMs', {
        method: 'POST',
        headers : {
          "Authorization" : `Bearer ${token.current}`
      },
        body: uploadFormData,
        // Don't set Content-Type header - let browser set it with boundary
      });


      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const result = await response.json();
      
      setUploadStatus({ 
        type: 'success', 
        message: 'Teaching materials uploaded successfully!' 
      });
      
      // Reset form
      setFiles([]);
      setFormData({
        title: '',
        description: '',
        subject: '',
        grade: '',
        category: 'lesson-plan'
      });
      
    } catch (error) {
      setUploadStatus({ 
        type: 'error', 
        message: `Upload failed: ${error.message}` 
      });
      console.log(error)
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="w-full px-4 ">
        <div className=" ">
          
          <div className="py-6 space-y-6">
            {/* Status Messages */}
            {uploadStatus && (
              <div className={`p-4 rounded-lg flex items-center gap-3 ${
                uploadStatus.type === 'success' 
                  ? 'bg-green-50 text-green-800 border border-green-200' 
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {uploadStatus.type === 'success' ? 
                  <CheckCircle size={20} /> : 
                  <AlertCircle size={20} />
                }
                {uploadStatus.message}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="Enter material title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={inputStyle}
                  placeholder="e.g., Mathematics, Science, English"
                  required
                />
              </div>
              
              <div className='relative'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grade Level *
                </label>
                <ChevronDown className='absolute bottom-5 right-2 size-7 text-gray-500' />
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                >
                  <option value="">Select grade level</option>
                  {grades.map(grade => (
                    <option key={grade} value={grade}>{grade}</option>
                  ))}
                </select>

                
              </div>
              
              <div className='relative'>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <ChevronDown className='absolute bottom-5 right-2 size-7 text-gray-500' />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={inputStyle}
                  
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={inputStyle}
                placeholder="Describe the teaching material and how it should be used..."
              />
            </div>

            {/* File Upload Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Files *
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-blue-950'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                <p className="text-lg font-medium text-gray-700 mb-2 dark:text-blue-400">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX, images, videos, audio files
                </p>
                <p className="text-xs text-gray-400 mb-4">Maximum file size: 50MB</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mp3,.txt"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                >
                  Choose Files
                </label>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Selected Files:</h3>
                <div className="space-y-2">
                  {files.map((fileObj) => (
                    <div key={fileObj.id} className="flex items-center justify-between p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-blue-500" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-blue-200">{fileObj.name}</p>
                          <p className="text-sm text-gray-500">{formatFileSize(fileObj.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(fileObj.id)}
                        className="text-red-500 hover:text-red-700 dark:text-blue-100 p-1"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={uploading}
                onClick={handleSubmit}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={20} />
                    Upload Materials
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeachingMaterialsUpload;