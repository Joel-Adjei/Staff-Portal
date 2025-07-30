import React, { useState, useRef } from 'react';
import { Upload, X, CheckCircle, AlertCircle, File, Loader2 } from 'lucide-react';
import {useAuth} from "../../../context/AuthContext"

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const {user, token } = useAuth()


  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const newFiles = fileArray.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      status: 'pending', // pending, uploading, success, error
      progress: 0,
      error: null
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

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
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const simulateUpload = (fileId) => {
    // Simulate file upload with progress
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading', progress: 0 } : f
    ));

    const uploadInterval = setInterval(() => {
      setFiles(prev => prev.map(f => {
        if (f.id === fileId) {
          const newProgress = Math.min(f.progress + Math.random() * 20, 100);
          
          if (newProgress >= 100) {
            clearInterval(uploadInterval);
            // Simulate success/failure (90% success rate)
            const isSuccess = Math.random() > 0.1;
            return {
              ...f,
              progress: 100,
              status: isSuccess ? 'success' : 'error',
              error: isSuccess ? null : 'Upload failed. Please try again.'
            };
          }
          
          return { ...f, progress: newProgress };
        }
        return f;
      }));
    }, 200);
  };

  const uploadFile = (fileId) => {
    simulateUpload(fileId);
  };

  const uploadAll = async (e) => {
    e.preventDefault()

    files.forEach(file => {
      if (file.status === 'pending') {
        uploadFile(file.id);
      }
    });

    const formData = new FormData()

    for(let i = 0; i < files.length; i++){
      formData.append('files', files[i]);
    }

    try{
      const response = await fetch("http://localhost:3000/users/staff/submitTLMs",{
        method : "POST",
        body: formData,
        headers: {
          "Authorization" : `Bearer ${token.current}`
        }
      })

      const data = await response.json()

      if(response.ok){
        console.log("success")
      }else{
        console.log("failed")
      }

    }catch(error){
      console.log(error)
    }
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'uploading':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-gray-200 bg-white';
    }
  };

  const pendingFiles = files.filter(f => f.status === 'pending').length;

  return (
    <div className="w-full max-w-4xl mx-auto p-6 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">File Uploader</h2>
        
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-blue-400 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-600 mb-2">
            Drag and drop files here, or click to select files
          </p>
          <p className="text-sm text-gray-500">
            Support for multiple files of any type
          </p>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Choose Files
          </button>
        </div>



        {/* Upload All Button */}
        {pendingFiles > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={uploadAll}
              className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Upload All Files ({pendingFiles})
            </button>
          </div>
        )}

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h3 className="text-lg font-semibold text-gray-700">Files ({files.length})</h3>
            
            {files.map((file) => (
              <div
                key={file.id}
                className={`border rounded-lg p-4 transition-colors ${getStatusColor(file.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {/* {getStatusIcon(file.status)} */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                   
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
            
              </div>
            ))}
          </div>
        )}
        
      
      </div>
    </div>
  );
};

export default FileUploader;