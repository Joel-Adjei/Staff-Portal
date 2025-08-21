import React from 'react';
import {Edit, User} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const day = new Date().getDate()
const month = new Date().getMonth()
const year = new Date().getFullYear()

const Greetings =({userRef})=>{
    const navigator = useNavigate()
    const {roleRef} = useAuth()
    
    return(
        <div className={`bg-gradient-to-br from-orange-500 from-1% to-orange-700 to-99% dark:from-blue-900 dark:to-blue-950 row-span-2 md:col-span-3 md:row-span-1 rounded-lg
                                 flex flex-col-reverse justify-center md:flex-row items-center md:justify-between p-3 md:p-6 md:py-4 md:px-14 shadow-md`}>
            <div className='md:h-full flex flex-col gap-3 justify-between py-8 text-sm text-white dark:text-blue-200'>
                <div>
                    <p>{day}/{month}/{year}</p>
                </div>
                <div>
                    <h3 className='text-3xl font-semibold pb-2'>Welcome, {userRef.current.name}</h3>
                    <p>The one and only {userRef.current.name}, Man them </p>
                </div>
            </div>
            <div className={`relative size-[150px] flex items-center justify-center bg-slate-100 dark:bg-blue-300 rounded-full`}>
                <User className={`size-[110px] text-orange-600 dark:text-blue-950`} />

                { roleRef.current == "staff" &&
                <button
                 className='absolute top-1 right-1 shadow-lg z-0 '
                 onClick={()=> navigator("/portal/updateProfile")}
                >
                    <Edit className='size-[30px] text-orange-600 dark:text-blue-950 dark:blue-200 bg-slate-100 dark:bg-blue-100 rounded p-1.7 z-0' />
                </button>
                }
            </div>
        </div>
    )
}

export default Greetings