import React, {useEffect, useState} from 'react';
import ModalSection from "../ModalSection";
import {useParams} from 'react-router-dom'
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";

const LeaveDetails =()=>{
    const {id} = useParams()
    const [applications, setApplications] = useState([]);
    const [select , setSelect] = useState(null)
    const {token} = useAuth()
    const {loading, fetchData , response} = useFetch({endpoint : "/users/admin/leaveApplications"});

    const fetchApplications = async () => {
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
            // setLoading(false);
        }
    };

    useEffect(()=>{
        async function findSelected(){
            await fetchApplications()
            const selectId = applications.find((app)=> app.id === parseInt(id))
            await setSelect(selectId)
            console.log(selectId , id )
        }
        findSelected()
    },[])


    return(
        <ModalSection>
            {
                select &&
                <div>
                    Details of the Leave application {select.email}
                </div>
            }
        </ModalSection>
    )
}
export default LeaveDetails