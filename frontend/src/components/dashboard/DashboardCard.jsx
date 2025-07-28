import React from 'react'

const DashboardCard=({className , Icon, title , value})=>{
    return(
        <div className={`${className} bg-white dark:bg-blue-950 rounded-xl p-6 shadow-lg border-l-4 border-orange-400 dark:border-blue-300 transform hover:scale-105 transition-transform duration-200`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 dark:text-blue-200">{title}</p>
                    <p className="text-3xl font-bold text-gray-800 dark:text-blue-300">{value}</p>
                </div>
                <Icon className="w-12 h-12 text-orange-500 dark:text-blue-300" />
            </div>
        </div>
    )
}

export default DashboardCard