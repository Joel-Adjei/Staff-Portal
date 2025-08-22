import React, { useState } from "react";
import { usePortal } from "../../context/PortalContext";
import StaffAcademicCalender from "../staff/StaffAcademicCalender";
import DashCalender from "../../components/dashboard/Calendar";
import { inputStyle } from "../../components/basic/input/AppInput";
import Button from "../../components/basic/button/Button";
import { Calendar, CalendarPlus, Edit, LucideCalendarSync, Trash } from "lucide-react";
import Header from "../../components/basic/Header";
import useToast from "../../hooks/useToast";
import { ToastContainer } from "../../Toast";

// Admin Page component to add new events
const AdminAcademicCalender = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const {events , setEvents} = usePortal()
    const [editingEvent, setEditingEvent] = useState(null);
    const {toasts, addToast, removeToast} = useToast()

      // When a date is selected from the calendar, update the form's date input.
  const handleDateSelect = (date) => {
    setDate(date.toISOString().substring(0, 10)); // Format date for input type="date"
  };

 
  // Handle adding or updating an event
  const handleAddOrUpdateEvent = (e) => {
    e.preventDefault();
    if (!title || !date || !description) {
      setMessage('Please fill in all fields.');
      addToast('Please fill in all fields.' )
      return;
    }

    if (editingEvent) {
      // Update existing event
      setEvents(events.map(event =>
        event.id === editingEvent.id
          ? { ...event, title, date, description }
          : event
      ));
      setMessage('Event updated successfully!');
      addToast('Event updated successfully!' , "success")
      setEditingEvent(null); // Exit edit mode
    } else {
      // Add a new event
      const newEvent = {
        id: Date.now(),
        title,
        date,
        description,
      };
      setEvents([...events, newEvent]);
      console.log(events)
      setMessage('Event added successfully!');
      addToast('Event added successfully!' , "success")
    }
    // Clear form inputs
    setTitle('');
    setDate('');
    setDescription('');
  };
    
  // Handle deleting an event
  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setMessage('Event deleted successfully!');
  };

  // Handle editing an event
  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setTitle(event.title);
    setDate(event.date);
    setDescription(event.description);
  };
  
    return (
        <>
        <ToastContainer toasts={toasts} removeToast={removeToast} />
       
       <div className=" p-6 pt-0 mb-8">
            <Header
                Icon={Calendar}
                className="mr-2 h-7 w-7 text-green-600"
                title={"Academic Calender"}
            />
             
      <div className="h-fit w-full justify-center mb-9">
        <DashCalender events={events} />
      </div>

      <h2 className="text-xl w-full bg-orange-500 dark:bg-blue-900 py-2 font-bold mb-2 rounded text-center text-gray-50 dark:text-white">{editingEvent ? 'Update Event' : 'Add New Event'}</h2>
      <form onSubmit={handleAddOrUpdateEvent} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Event Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputStyle}
            // className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputStyle}
            // className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputStyle}
            // className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <Button
            type="submit"
          >
            {editingEvent ? <div className="flex gap-2">
                                <LucideCalendarSync />
                                Update Event
                            </div> : 
                            <div className="flex gap-2">
                                <CalendarPlus />
                                Add Event
                            </div>
                            }
          </Button>
          {editingEvent && (
            <button
              type="button"
              onClick={() => {
                setEditingEvent(null);
                setTitle('');
                setDate('');
                setDescription('');
                setMessage('');
              }}
              className="ml-4 w-full sm:w-auto px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>


          <div className="h-[2px] w-full mt-7 bg-gray-300 dark:bg-blue-300/40" />
      <h3 className="text-2xl mt-5 font-bold mb-4 text-center text-slate-700 dark:text-blue-200">Existing Events</h3>
      
      <div className="space-y-4">
        {events.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 italic">No events have been added yet.</p>
        ) : (
          events.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event) => (
            <div 
                key={event.id} 
                className="w-full p-4 bg-gray-50 dark:bg-blue-900 rounded-xl shadow-sm border border-slate-200 dark:border-blue-200/40 flex  justify-between items-center space-y-2 sm:space-y-0"
            >
              <div className="text-left w-full flex-grow">
                <div className=' top-3 right-3 flex gap-2'>
                  <Calendar className='size-4 text-blue-500' />
                  <p className="text-sm text-gray-900 dark:text-blue-300">{new Date(event.date).toDateString()}</p>
                </div>
                <h4 className="text-lg font-semibold text-orange-600 dark:text-blue-300">{event.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditEvent(event)}
                  className="p-2 rounded-md text-white bg-blue-900  dark:bg-blue-950 hover:bg-blue-600"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="p-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                >
                  <Trash size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
      </>
    );
  };

export default AdminAcademicCalender