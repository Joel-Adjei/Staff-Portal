import React, { useState, useRef, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { X, Bell, Calendar} from 'lucide-react';
import {usePortal} from "../../context/PortalContext";
import {useAuth} from "../../context/AuthContext";
import useFetch from '../../hooks/useFetch';

const NotificationPanel = () => {
    const panelRef = useRef(null);
    const {openNotifi,  toggleNotfiPanel} = usePortal()
    const { token} = useAuth()
    const [pastAnnouncement , setPastAnnouncement] = useState([])
    const [recentAnnouncement , setRecentAnnouncement] = useState([])
    const {fetchData , response} = useFetch({endpoint:"/users/staff/announcements"})

    const fetchAnnouncement = async ()=>{
        try {
            await fetchData({token : token.current})
            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                setPastAnnouncement(data.oldAnnouncements)
                setRecentAnnouncement(data.recentAnnouncements)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        openNotifi && fetchAnnouncement()
    },[openNotifi])


    return (
                    <div className="relative">

                        {openNotifi &&  <div onClick={() => toggleNotfiPanel()} className={`fixed z-30 top-0 left-0 bg-gray-800/70 h-[100vh] w-full`}></div>}

                        {openNotifi && <button
                            onClick={() => toggleNotfiPanel()}
                        >
                            <X className={`fixed w-[30px] h-[30px] text-blue-950 z-50 top-2 right-3 bg-gray-200 p-1 rounded-full`}/>
                        </button>
                        }


                        {/* Panel */}
                        <div
                            ref={panelRef}
                            className={`fixed z-40 h-[100dvh] top-0 right-0 w-90 bg-white-color dark:bg-deep_blue_black backdrop-blur-lg 
                                        rounded-l-2xl  shadow-2xl border-l-2 border-orange-color dark:border-blue-400 overflow-hidden transition-all duration-300 transform

                             ${
                                openNotifi
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-full pointer-events-none'
                            }`}
                        >
                            <div className='bg-orange-600 dark:bg-blue-950 sticky top-0 w-full py-4 flex items-center justify-center'>
                                <h1 className=' text-lg font-semibold text-white-color dark:text-blue-400'>Announcement</h1>
                            </div>
                            
                            <div className='h-full text-slate-700 dark:text-blue-200 overflow-y-scroll p-5'>
                            <div className='mb-4'>
                                <h3 className='mb-1'>Recent Announcement</h3>
                                <div>
                                {
                                    recentAnnouncement.map((ann , index)=>(
                                        <AnnouncementCard announcement={ann} key={index} />
                                    ))
                                }
                                </div>
                            </div>

                            <div>
                                <h3>Past Announcement</h3>
                                <div>
                                {
                                    pastAnnouncement.map((ann , index)=>(
                                        <AnnouncementCard announcement={ann} key={index} />
                                    ))
                                }
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
    );
};

export default NotificationPanel;

const shortenText = (text) =>{
    let mid = 35
    if(text.length > mid){
        return text.substring(0, mid) + "..."
    }
    return text
}

const AnnouncementCard = ({announcement , key}) => {
    const navigator = useNavigate()
  
    // Format the announcement date
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };
  
    return (
      <div key={key} className="max-w-lg mx-auto mt-8">
        <div className="bg-white dark:bg-blue-950 border border-gray-200 dark:border-blue-400 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-blue-400">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-50 rounded-full">
                <Bell className="w-4 h-4 text-orange-600 dark:text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-blue-100">
                {announcement.announcement_title}
              </h3>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-blue-400">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(announcement.announcement_date)}</span>
            </div>
          </div>
  
          {/* Content */}
          <div className="p-4">
            <p className="text-gray-700 dark:text-blue-300 text-base leading-relaxed">
              {shortenText(announcement.announcement)}
            </p>
          </div>
  
          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 dark:bg-blue-950 border-t border-gray-100 dark:border-blue-400 rounded-b-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 dark:text-blue-400">Staff Announcement</span>
              <button 
              className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline"
              onClick={()=> navigator(`/portal/announcement/${4}`)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };