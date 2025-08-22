import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { LogIn, UserPlus, Home, Upload, FileText, Send, Calendar, Lightbulb, Bell, User, BookText, GraduationCap, Building, ClipboardList, BookOpen, MessageSquare, Megaphone, CheckSquare, CalendarCog, CalendarClockIcon } from 'lucide-react';
import MessageAlert from "../../components/MessageAlert";
import {useAuth} from "../../context/AuthContext";
import AppInput from "../../components/basic/input/AppInput";
import Header from "../../components/basic/Header";
import Button from "../../components/basic/button/Button";
import useToast from "../../hooks/useToast";
import {ToastContainer} from "../../Toast";
import useFetch from "../../hooks/useFetch";
import { ProcessIndicator } from '../../components/basic/loading/PortalLoading';
import { usePortal } from '../../context/PortalContext';
import DashCalender from '../../components/dashboard/Calendar';

const StaffAcademicCalender = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const { user , token } = useAuth();
    const {events} = usePortal()
    const {toasts, addToast, removeToast} = useToast()
    const [selectedDate, setSelectedDate] = useState(new Date());


    const {fetchData ,response, loading} = useFetch({method:"POST" , endpoint: "/users/staff/leave" ,})

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload =
            {
                "reason": `${values.reason}`,
                "start_date": `${values.startDate}`,
                "end_date": `${values.endDate}`
            }
        try {
            await fetchData({payload: payload, token: token.current})
            if(response.current.ok){
                addToast("message sent successful", "success")
            }
            console.log(values)
        } catch (error) {
            console.error("Apply leave error:", error);
            addToast("Failed to submit leave application. Please try again", "error")

        } finally {
            setSubmitting(false);
            resetForm()
        }
    };

  // Format the selected date for display
  const formattedDate = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Filter events for the selected day
  const eventsForSelectedDay = events.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.toDateString() === selectedDate.toDateString();
  });

  // Helper function to create the calendar cells
  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = selectedDate.getMonth();
    const currentYear = selectedDate.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 1 = Monday, etc.

    const calendarCells = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add weekday headers
    weekdays.forEach(day => {
      calendarCells.push(
        <div key={`weekday-${day}`} className="p-2 text-center font-semibold text-slate-500 dark:text-blue-300 text-sm">
          {day}
        </div>
      );
    });

    // Add empty cells for the start of the month
    for (let i = 0; i < firstDay; i++) {
      calendarCells.push(<div key={`empty-${i}`}></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isToday = date.toDateString() === today.toDateString();
      const hasEvents = events.some(event => new Date(event.date).toDateString() === date.toDateString());

      calendarCells.push(
        <div
          key={day}
          className={`relative p-2 text-center rounded-lg transition-colors duration-200 cursor-pointer ${
            isToday ? 'bg-blue-500 text-white dark:text-white font-bold' :
            date.toDateString() === selectedDate.toDateString() ? 'bg-blue-300 dark:bg-blue-500/40 text-slate-900 font-bold' :
            'hover:bg-gray-200 dark:hover:bg-gray-700'}
            ${hasEvents ? 'border-2 border-orange-300' : ''}`
          }
          onClick={() => setSelectedDate(date)}
        >
          <div className=" dark:text-blue-50">
            {day}
          </div>
          {hasEvents && (
            <span className="absolute bottom-1 right-1 h-2 w-2 bg-orange-500 rounded-full"></span>
          )}
        </div>
      );
    }
    return calendarCells;
  };

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
  };
  
  const currentMonthName = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });


    return (
        <div className="p-6">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <Header
                Icon={Calendar}
                className="mr-2 h-7 w-7 text-green-600"
                title={"Academic Calender"}
            />

<div className=" py-6 flex flex-col items-center">
      <div className="calendar-container bg-slate-50 dark:bg-blue-950 w-full shadow-lg  mb-8 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <button onClick={handlePrevMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h3 className="text-xl text-slate-700 dark:text-blue-400 font-bold">{currentMonthName}</h3>
          <button onClick={handleNextMonth} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-sm">
          {renderCalendar()}
        </div>
      </div>

      <div className="w-full p-4 bg-slate-50 dark:bg-blue-950 shadow-xl rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-center text-slate-700 dark:text-blue-200">
          Events for {formattedDate}
        </h3>
        <div className="space-y-4">
          {eventsForSelectedDay.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400 italic">No events scheduled for this day.</p>
          ) : (
            eventsForSelectedDay.map((event) => (
              <div key={event.id} className="flex gap-4 items-center p-4 bg-gray-50 dark:bg-blue-900 rounded-xl shadow-sm border border-slate-200 dark:border-blue-200/40">
                
                <CalendarClockIcon className='size-15 text-orange-600 dark:text-blue-400'/>
                <div>
                  <h4 className="text-lg font-semibold text-orange-600 dark:text-blue-300">{event.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </div>

    <div className="w-full p-4 bg-slate-50 dark:bg-blue-950 shadow-xl rounded-xl">
        <h3 className="text-2xl font-bold mb-4 text-center text-slate-700 dark:text-blue-200">
          All Semester Events
        </h3>

        <EventsList events={events} onSelect={setSelectedDate} />
    </div>

    
        </div>

        
    );
};

export default  StaffAcademicCalender

// Reusable component to display a list of events
const EventsList = ({ events , onSelect}) => {
  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 italic">No events have been added yet.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
          {
            events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => (
              <div 
                key={event.id} 
                onClick={()=> onSelect(new Date(event.date))}
                className="relative cursor-pointer flex gap-4 items-center p-3 bg-gray-50 dark:bg-blue-900 rounded-lg shadow-sm border border-slate-200 dark:border-blue-200/40"
              >
                <div>
                  <h4 className="text-lg font-semibold text-orange-600 dark:text-blue-300">{event.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                </div>
            
                <div className='absolute top-3 right-3 flex gap-2'>
                  <Calendar className='size-4 text-blue-500' />
                  <p className="text-sm text-gray-900 dark:text-blue-300">{new Date(event.date).toDateString()}</p>
                </div>
              </div>
            ))
          }
        </div>
      )
      }
    </div>
  );
};
