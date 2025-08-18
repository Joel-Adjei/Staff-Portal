import React, {useEffect, useState} from 'react';
import ModalSection from "../ModalSection";
import {useParams} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";

const StaffDetails =()=>{
    const {id} = useParams()
    const [staffDetail, setStaffDetail] = useState();
    const [statusEndpoint , setStatusEndpoint ] = useState(`/users/admin/LeaveApplication/${id}/approve`)
    const [message, setMessage] = useState('');
    const {token} = useAuth()
    const {fetchData: updatingStaff , response: updateResponse} = useFetch({method: "PUT" , endpoint : statusEndpoint})
    const { fetchData , response} = useFetch({endpoint :`/users/admin/staffProfiles/${id}`});

    const fetchStaff = async () => {
        try {
            await fetchData({token: token.current})
            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                await setStaffDetail(data[0]);
            }
        } catch (err) {
            console.log(err)
        } finally {
            //  setLoading(false);
        }
    };

    useEffect(()=>{
        console.log(id)
        fetchStaff()
    },[])


    const updateStaff = async (email, newStatus) => {
        setStatusEndpoint( newStatus === 'Approved' ? `/users/admin/LeaveApplication/${id}/approve` : `/users/admin/LeaveApplication/${id}/reject`)
        setMessage('');
        try {
            const payload ={
                "email" : email
            }
            await updateStaff({ payload : payload, token: token.current })
            if(updateResponse.current.ok){
                const data = await updateResponse.current.json()
                console.log(data)
                setMessage(`Application status updated to ${newStatus}!`);
                await fetchStaff();
            }
        } catch (err) {
            setMessage(`Status update failed: ${err.response?.data?.message || err.message || 'Server error'}`);
        }
    };


    return(
        <ModalSection>
            {
                staffDetail && (
                <div className=''>

                    <div className='text-sm text-gray-700 dark:text-blue-200'>
                        <div className={"uppercase"}>
                            <h3>staff name </h3>
                            <span className='font-bold  text-orange-600 text-lg'>{staffDetail.name}</span>
                        </div>

                        <div className={"mt-3"}>
                            <h3 className={" uppercase"}>Email </h3>
                            <span className='font-semibold text-lg'>{staffDetail.email}</span>
                        </div>

                        {/*Class Taught & Subject*/}
                        <div className=' mt-4 grid  grid-cols-1 sm:grid-cols-2 gap-7'>
                        <div className={"mt-4"} >
                            <h3 className={" uppercase"}>Class Taught</h3>
                            <span className='font-semibold text-lg'>{staffDetail.classTaught}</span>
                        </div>

                        <div className={"sm:mt-4"}>
                            <h3 className={" uppercase"}>Subject</h3>
                            <span className='font-semibold text-lg'>{staffDetail.subject}</span>
                        </div>
                        </div>

                        {/*Address & contact*/}
                        <div className='border-t border-gray-200 dark:border-blue-400 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-7'>
                        <div className={"mt-4"} >
                            <h3 className={" uppercase"}>Contact Number</h3>
                            <span className='font-semibold text-lg'>{staffDetail.contact}</span>
                        </div>

                        <div className={"sm:mt-4"}>
                            <h3 className={" uppercase"}>Address</h3>
                            <span className='font-semibold text-lg'>{staffDetail.address}</span>
                        </div>
                        </div>
                    </div>

                    <div className="px-3 py-4 whitespace-nowrap absolute top-0 right-0 text-sm">
                                        <span className={`px-9 py-1 inline-flex leading-5 font-semibold rounded-full ${
                                            staffDetail.role === 'staff' ? 'bg-blue-100 text-blue-800' :
                                            staffDetail.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {staffDetail.role}
                                        </span>
                    </div>

                    {/*<div className="mt-3 whitespace-nowrap text-sm font-medium">*/}
                    {/*    <Button onClick={() => updateStaff(staffDetail.email, 'Approved')} className="bg-green-600 hover:bg-green-700 mr-2">Approve</Button>*/}
                    {/*</div>*/}
                </div>
                )
            }
              
        </ModalSection>
    )
}
export default StaffDetails

const Button = ({ children, onClick, className = '', type = 'button' }) => {

    return (
    <button
        type={type}
        onClick={onClick}
        className={`w-fit dark:text-[#F8F9FF]  dark:bg-blue-900  from-blue-900 to-blue-800 hover:bg-blue-950 text-md text-white font-semibold py-2 px-12 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${className}`}
    >
        {children}
    </button>
    )
};