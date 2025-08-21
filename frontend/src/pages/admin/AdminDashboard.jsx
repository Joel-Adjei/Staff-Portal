import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Edit, Calendar, User, GraduationCap } from 'lucide-react'
import Greetings from "../../components/dashboard/Greatings";
import DashboardCard from "../../components/dashboard/DashboardCard";
import DashCalender from "../../components/dashboard/Calendar";
import usePageTile from "../../hooks/usePageTitle";
import useFetch from '../../hooks/useFetch';
import PortalLoading from '../../components/basic/loading/PortalLoading';

const dStat = {
    totalStaff : 0,
    totalLeaves : 0,
    totalSuggestions: 0
}
const AdminDashboard = () => {
    const {userRef , token} = useAuth()
    const [loading , setLoading] = useState(false)
    const [stat , setStat] = useState(dStat)
    const { fetchData , response } = useFetch({endpoint: "/users/admin/stats"})
    usePageTile("Dashboard")

    const fetchStat= async()=>{
        setLoading(true)
        try{
            await fetchData({token: token.current})
            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                setStat(data)
            }
        }catch(error){
            console.log("error ", error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchStat()
    },[])

    // if(loading) return ( <PortalLoading loading={loading} />)

  return (
    <div className='w-full  mt-xl px-6'>
        <div className={"w-full h-full grid grid-cols-1 grid-rows-2 lg:grid-cols-3 lg:grid-rows-3 gap-6"}>
            <Greetings userRef={userRef}  />

            <div className={"md:col-span-2 row-span-2 "}>
                <div className={`h-full grid grid-cols-1 md:grid-cols-2 gap-3`}>
                    <DashboardCard Icon={User} title={'Total Staff'} value={stat.totalStaff} />
                    <DashboardCard Icon={Calendar} title={"leave Applications"} value={stat.totalLeaves} />
                    <DashboardCard Icon={Calendar} className={'hidden md:block'} value={'2'} title={'Attendance'} />
                    <DashboardCard Icon={Calendar} className={'hidden md:block'} value={stat.totalSuggestions} title={'Suggestions'}  />
                </div>
            </div>
            <div className={"hidden lg:block lg:col-span-1 lg:row-span-2"}>
                <DashCalender />
            </div>
        </div>

        
        <div className={"lg:hidden  py-4"}>
                <DashCalender />
        </div>
    </div>
  )
}

export default AdminDashboard