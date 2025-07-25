import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Edit, User } from 'lucide-react'

const AdminDashboard = () => {
    const {userRef} = useAuth()
  return (
    <div className='w-full h-[100vh] mt-xl px-6'>
        <div className={"w-full h-full grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6"}>
            <div className={`bg-gradient-to-br from-orange-500 to-orange-700 dark:from-blue-900 dark:to-blue-950 md:col-span-3 md:row-span-1 rounded-lg
                                 flex flex-col-reverse justify-center md:flex-row items-center md:justify-between p-6 md:py-4 md:px-14 shadow-md`}>
                <div className='md:h-full flex flex-col gap-3 justify-between py-8 text-sm text-white dark:text-blue-200'>
                    <div>
                        <p>24th October, 2024</p>
                    </div>
                    <div>
                        <h3 className='text-3xl font-semibold'>Welcome, {userRef.current.name}</h3>
                        <p>lorem fsfjs sfospfspsf psfosjpfi spofsjpfjs</p>
                    </div>
                </div>
                <div className={`relative size-[150px] flex items-center justify-center bg-slate-100 dark:to-blue-900 rounded-full`}>
                    <User className={`size-[110px] text-orange-600 dark:text-blue-200`} />
                    <button className='absolute top-1 right-1 '>
                        <Edit className='size-[30px] text-orange-600 dark:blue-200 bg-white rounded p-1.7' />
                    </button>
                </div>
            </div>
            <div className={"bg-gray-50 md:col-span-2 md:row-span-2 rounded-lg shadow-xl"}></div>
            <div className={"bg-gray-100 md:col-span-1 md:row-span-2 rounded-lg shadow-xl"}></div>
        </div>
    </div>
  )
}

export default AdminDashboard