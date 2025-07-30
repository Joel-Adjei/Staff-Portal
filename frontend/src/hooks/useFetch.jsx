import {useRef, useState} from "react";

const useFetch =({method="GET",endpoint })=>{
    const [loading , setLoading] = useState(false)
    let response  = useRef({})


    async function fetchData({payload, token}) {
        setLoading(true)

        // http://localhost:3000 || https://khms-backend.onrender.com
        const API_BASE_URL = "http://localhost:3000"

        try{
             response.current =  await fetch(`${API_BASE_URL}${endpoint}`,
                {
                    method : `${method}`,
                    headers : {
                        "Content-type" : "application/json" ,
                        "Authorization" : `Bearer ${token}`
                    },
                    body : JSON.stringify(
                        payload
                    )
                }
            );

            if(response.ok){
                const data = await response.json()
                console.log(data)
            }

        } catch (error) {
            console.error("fetch error:", error);
            throw new error(error)
        } finally {
            setLoading(false)
        }
    }

    return {loading , response, fetchData}
}

export default useFetch