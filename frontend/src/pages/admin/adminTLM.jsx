import React, { useState, useEffect } from 'react';
import { Download, Search, Filter, FileText, Calendar, User, Eye, DownloadCloud, File } from 'lucide-react';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/basic/Header';

const AdminTLM = () => {
  const [tlms, setTlms] = useState([]);
  const [filteredTlms, setFilteredTlms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const {fetchData , response} = useFetch({endpoint: "/users/admin/viewTALMs"})
  const {token} = useAuth()

  // Mock data - replace with actual API call
  const mockTlms = [
    {
      id: 1,
      staffName: 'John Doe',
      staffId: 'EMP001',
      title: 'Mathematics Teaching Materials Q1',
      subject: 'Mathematics',
      grade: 'Grade 8',
      submissionDate: '2024-08-15',
      status: 'approved',
      pdfUrl: '/api/tlm/download/1',
      fileSize: '2.5 MB'
    },
    {
      id: 2,
      staffName: 'Sarah Wilson',
      staffId: 'EMP002',
      title: 'Science Lab Manual',
      subject: 'Science',
      grade: 'Grade 10',
      submissionDate: '2024-08-12',
      status: 'pending',
      pdfUrl: '/api/tlm/download/2',
      fileSize: '3.2 MB'
    },
    {
      id: 3,
      staffName: 'Mike Johnson',
      staffId: 'EMP003',
      title: 'English Literature Guide',
      subject: 'English',
      grade: 'Grade 12',
      submissionDate: '2024-08-10',
      status: 'rejected',
      pdfUrl: '/api/tlm/download/3',
      fileSize: '1.8 MB'
    },
    {
      id: 4,
      staffName: 'Emma Brown',
      staffId: 'EMP004',
      title: 'History Timeline Activities',
      subject: 'History',
      grade: 'Grade 9',
      submissionDate: '2024-08-08',
      status: 'approved',
      pdfUrl: '/api/tlm/download/4',
      fileSize: '4.1 MB'
    }
  ];

  // Fetch TLMs from API
  const fetchTLMs = async () => {
    try {
      setLoading(true);
      // Replace with actual API call
      await fetchData({token: token.current})

      if(response.current.ok){
        const data = await response.current.json();
      setTlms(mockTlms);
      console.log(data)
      setFilteredTlms(mockTlms);
      }
      
    } catch (err) {
      setError('Failed to fetch TLMs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTLMs();
  }, []);

  // Filter and search functionality
  useEffect(() => {
    let filtered = tlms.filter(tlm => {
      const matchesSearch = tlm.staffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tlm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tlm.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || tlm.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort functionality
    filtered.sort((a, b) => {
      let aVal, bVal;
      switch (sortBy) {
        case 'date':
          aVal = new Date(a.submissionDate);
          bVal = new Date(b.submissionDate);
          break;
        case 'staff':
          aVal = a.staffName.toLowerCase();
          bVal = b.staffName.toLowerCase();
          break;
        case 'subject':
          aVal = a.subject.toLowerCase();
          bVal = b.subject.toLowerCase();
          break;
        default:
          aVal = a[sortBy];
          bVal = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

    setFilteredTlms(filtered);
  }, [tlms, searchTerm, statusFilter, sortBy, sortOrder]);

  // Download PDF function
  const downloadPDF = async (tlm) => {
    try {
      // In a real implementation, this would fetch from the actual API
      // const response = await fetch(tlm.pdfUrl);
      // const blob = await response.blob();
      // const url = window.URL.createObjectURL(blob);
      
      // For demo purposes, create a mock download
      const link = document.createElement('a');
      link.href = '#'; // Replace with actual blob URL
      link.download = `${tlm.title.replace(/\s+/g, '_')}_${tlm.staffName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`Download started for: ${tlm.title}`);
    } catch (err) {
      alert('Download failed. Please try again.');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading TLMs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchTLMs}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Header title={"TLM Document Manager"} Icon={File} />
        </div>


        {/* TLMs Grid */}
        {filteredTlms.length === 0 ? (
          <div className="bg-white  rounded-lg shadow-sm p-12 text-center">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No TLMs found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTlms.map((tlm) => (
              <div key={tlm.id} className="bg-white dark:bg-blue-950 rounded-lg shadow-xl hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <FileText className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-blue-300 line-clamp-2">{tlm.title}</h3>
                        <p className="text-sm text-gray-500">{tlm.subject} • {tlm.grade}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tlm.status)}`}>
                      {tlm.status.charAt(0).toUpperCase() + tlm.status.slice(1)}
                    </span>
                  </div>

                  {/* Staff Info */}
                  <div className="flex items-center mb-3">
                    <User className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">{tlm.staffName} ({tlm.staffId})</span>
                  </div>

                  {/* Date and Size */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        {new Date(tlm.submissionDate).toLocaleDateString()}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">{tlm.fileSize}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => downloadPDF(tlm)}
                      className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </button>
                    <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <Eye className="w-4 h-4" />
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

export default AdminTLM;