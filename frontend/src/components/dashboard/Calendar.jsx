import React,{useState} from 'react';
import {ChevronRight , ChevronLeft} from 'lucide-react'

const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};



const DashCalender =()=>{
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const [events] = useState([
        { id: 1, title: "Staff Meeting", date: new Date(2025, 6, 28), time: "09:00 AM", type: "meeting" },
        { id: 2, title: "Parent Conference", date: new Date(2025, 6, 30), time: "02:00 PM", type: "conference" },
        { id: 3, title: "School Assembly", date: new Date(2025, 7, 1), time: "10:00 AM", type: "event" },
        { id: 4, title: "Teacher Training", date: new Date(2025, 7, 5), time: "03:00 PM", type: "training" }
    ]);

    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    const today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const hasEvent = events.some(event =>
            event.date.toDateString() === date.toDateString()
        );

        days.push(
            <div
                key={day}
                onClick={() => setSelectedDate(date)}
                className={`p-2 text-center cursor-pointer rounded-lg transition-all duration-200 hover:bg-orange-50 relative
            ${isToday ? 'bg-orange-500 text-white font-bold' : ''}
            ${isSelected && !isToday ? 'bg-orange-100 text-orange-800 font-semibold' : ''}
            ${hasEvent ? 'border-2 border-orange-300' : ''}
          `}
            >
                {day}
                {hasEvent && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full"></div>
                )}
            </div>
        );
    }

    return (
        <div className="bg-white-color dark:bg-blue-950 rounded-xl shadow-xl p-4">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-blue-300">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                        className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-orange-600 dark:text-blue-300" />
                    </button>
                    <button
                        onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                        className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-orange-600 dark:text-blue-300" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center font-semibold text-gray-600 dark:text-blue-300 text-sm">
                        {day}
                    </div>
                ))}
            </div>

            <div className="days-container h-[220px] overflow-y-scroll grid grid-cols-7 gap-1 dark:text-blue-50">
                {days}
            </div>
        </div>
    );
};

export default DashCalender