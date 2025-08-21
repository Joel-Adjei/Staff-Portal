import React, {useEffect, useState} from 'react';
import ModalSection from "../ModalSection";
import {useParams} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";

const SuggestionDetails =()=>{
    const {id} = useParams()
    const [data, setData] = useState();
    const [message, setMessage] = useState('');
    const {token} = useAuth()
    const { fetchData , response} = useFetch({endpoint :`/users/admin/viewSuggestions/${id}`});

    const fetchApplications = async () => {
        // setLoading(true)
        try {
            await fetchData({token: token.current})
            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                 setData(data);
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




    return(
        <ModalSection>
            {
                data && (
                <div className=''>

                    <div className='uppercase text-sm text-gray-700 dark:text-blue-200'>

                        <div>
                            <h3>Date:</h3>
                            <span className='font-bold text-lg'>{data.suggestion_time}</span>
                        </div>
                    </div>

                    <h4 className='mt-4 text-sm font-semibold text-gray-400 dark:text-blue-200 uppercase'>Reason</h4>
                    <div className='min-h-40 rounded-lg bg-gray-100 dark:bg-blue-900 dark:text-blue-100 p-4 mt-2'>
                        <p>{data.suggestion_box}</p>
                    </div>

                
                </div>
                )
            }
              
        </ModalSection>
    )
}
export default SuggestionDetails

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