import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Edit, Calendar, User, GraduationCap } from 'lucide-react'
import Greetings from "../../components/dashboard/Greatings";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashCalender from "../../components/dashboard/Calendar";

const AdminDashboard = () => {
    const {userRef} = useAuth()
  return (
    <div className='w-full h-[100dvh] mt-xl px-6'>
        <div className={"w-full h-full grid grid-cols-1 grid-rows-4 md:grid-cols-3 md:grid-rows-3 gap-6"}>
            <Greetings userRef={userRef}  />

            <div className={"md:col-span-2 row-span-2 "}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-3`}>
                    <DashboardCard Icon={User} title={'Total Staff'} value={'34'} />
                    <DashboardCard Icon={Calendar} title={"leave Applications"} value={'12'} />
                    <DashboardCard Icon={Calendar} className={'hidden md:block'} value={'2'} title={'Attendance'} />
                    <DashboardCard Icon={Calendar} className={'hidden md:block'} value={'121'} title={'Suggestions'}  />
                </div>

                <div className={'p-3 bg-gray-50 dark:bg-blue-950 dark:text-blue-200 shadow-xl mt-7 rounded-lg border-2 border-orange-color dark:border-blue-300'}>
                    Quote of the day
                    <p className={'mt-2 text-sm text-gray-500'}>
                        Eat Gob3 everyday it helps the body to last long when teaching
                    </p>
                </div>
            </div>
            <div className={"hidden md:block md:col-span-1 md:row-span-2"}>
                <DashCalender />
            </div>
        </div>
    </div>
  )
}

export default AdminDashboard