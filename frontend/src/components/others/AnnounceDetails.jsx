import React, { useState ,useEffect } from 'react';
import { ArrowLeft, Bell, Clock} from 'lucide-react';
import ModalSection from '../ModalSection';
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';
import { useParams } from 'react-router-dom';

const AnnouncementDetail = () => {

  // Sample data - in real usage, this would come from props or API
  const announcement = {
    id: "ANN-001",
    title: "Birthday Reminder",
    message: "Joseph Birthday is tomorrow",
    date: "2025-08-12 14:59:10"
  };

  const [announce , setAnnounce] = useState(null)
  const {id} = useParams()

  const { fetchData , response} = useFetch({endpoint :`/users/staff/announcements/${id}`});
  const {token} = useAuth()

    const fetchApplications = async () => {
        // setLoading(true)
        try {
            await fetchData({token: token.current})
            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                await setAnnounce(data);
            }
        } catch (err) {
            console.log(err)
        } finally {
            //  setLoading(false);
        }
    };

    useEffect(()=>{
        console.log(id)
        fetchApplications()
    },[])


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  return (
    <ModalSection>
    <div className=" ">
      {/* Header */}
      <div className="bg-orange-600 dark:bg-blue-950 rounded-t-md border-b border-gray-200 dark:border-blue-400">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100/30 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-100" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-center text-white-color">Announcement Details</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-blue-950 rounded-lg shadow-sm border border-gray-200">
              {/* Announcement Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-50 rounded-full">
                      <Bell className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-1">
                        {announcement.title}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Message */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Message</h3>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-gray-700 text-lg font-medium">
                      {announcement.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </ModalSection>
    
  );
};

export default AnnouncementDetail;