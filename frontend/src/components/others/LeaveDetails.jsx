import React, {useEffect, useState} from 'react';
import ModalSection from "../ModalSection";
import {useParams} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";

const LeaveDetails =()=>{
    const {id} = useParams()
    const [applications, setApplications] = useState();
    const [statusEndpoint , setStatusEndpoint ] = useState(`/users/admin/LeaveApplication/${id}/approve`)
    const [message, setMessage] = useState('');
    const {token} = useAuth()
    const {fetchData: updatingStatus , response: statusResponse} = useFetch({method: "PUT" , endpoint : statusEndpoint})
    const { fetchData , response} = useFetch({endpoint :`/users/admin/leaveApplications/${id}`});

    const fetchApplications = async () => {
        // setLoading(true)
        try {
            await fetchData({token: token.current})
            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                await setApplications(data);
            }
        } catch (err) {
            console.log(err)
        } finally {
            //  setLoading(false);
        }
    };

    useEffect(()=>{
        console.log(id)
        fetchApplications()
    },[])


    const updateApplicationStatus = async (email, newStatus) => {
        setStatusEndpoint( newStatus === 'Approved' ? `/users/admin/LeaveApplication/${id}/approve` : `/users/admin/LeaveApplication/${id}/reject`)
        setMessage('');
        try {
            const payload ={
                "email" : email
            }
            await updatingStatus({ payload : payload, token: token.current })
            if(statusResponse.current.ok){
                const data = await statusResponse.current.json()
                console.log(data)
                setMessage(`Application status updated to ${newStatus}!`);
                fetchApplications();
            }
            // fetchApplications(); // Refresh the list
        } catch (err) {
            setMessage(`Status update failed: ${err.response?.data?.message || err.message || 'Server error'}`);
        }
    };


    return(
        <ModalSection>
            {
                applications && (
                <div className=''>

                    <div className='uppercase text-sm text-gray-700 dark:text-blue-200'>
                        <div>
                            <h3>staff name </h3>
                            <span className='font-bold text-orange-600 text-lg'>{applications.name}</span>
                        </div>

                        <div className='mt-4 flex gap-7'>
                        <div >
                            <h3>Start Date:</h3>
                            <span className='font-bold text-lg'>{applications.start_date}</span>
                        </div>

                        <div>
                            <h3>Start Date:</h3>
                            <span className='font-bold text-lg'>{applications.end_date}</span>
                        </div>
                        </div>
                    </div>

                    <h4 className='mt-4 text-sm font-semibold text-gray-400 dark:text-blue-200 uppercase'>Reason</h4>
                    <div className='min-h-40 rounded-lg bg-gray-100 dark:bg-blue-900 dark:text-blue-100 p-4 mt-2'>
                        <p>{applications.reason}</p>
                    </div>

                    <div className="px-3 py-4 whitespace-nowrap absolute top-0 right-0 text-sm">
                                        <span className={`px-9 py-1 inline-flex leading-5 font-semibold rounded-full ${
                                            applications.status === 'Approved' ? 'bg-green-100 text-green-800' :
                                            applications.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {applications.status}
                                        </span>
                    </div>

                    <div className="mt-3 whitespace-nowrap text-sm font-medium">
                                    {applications.status === 'pending' && (
                                        <>
                                            <Button onClick={() => updateApplicationStatus(applications.email, 'Approved')} className="bg-green-600 hover:bg-green-700 mr-2">Approve</Button>
                                            <Button onClick={() => updateApplicationStatus(applications.email, 'Rejected')} className="bg-red-600 hover:bg-red-700 ">Reject</Button>
                                        </>
                                    )}
                    </div>
                </div>
                )
            }
              
        </ModalSection>
    )
}
export default LeaveDetails

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