import React, {useEffect, useRef, useState} from "react";
import NavigationPanel from "../components/Portal/NavigationPanel";
import {Outlet, useNavigate, useLoaderData} from 'react-router-dom'
import NavBar from "../components/Portal/NavBar";
import {usePortal} from "../context/PortalContext";
import {useAuth} from "../context/AuthContext";
import ProfilePanel from "../components/ProfilePanel";

const PortalLayout =()=>{
    const alert = useRef(false)
    const navigator = useNavigate()
    const { showPanel , loading} = usePortal()
    const {userRef} = useAuth();

    // useEffect(()=>{
    //     if(userRef.subject == null || userRef.classTaught==null || userRef.contact==null){
    //         alert.current = true
    //     }else{
    //         alert.current = false
    //     }
    // },[])

    if(loading){
        return <div>Loading... </div>
    } else {
    return(
        <>
            {
                <div className={"h-[100dvh] relative"} >
                    {/*{alert && <div className={"fixed top-0 z-40 h-[56vh] w-full text-3xl bg-blue-800"}>SetProfile</div>}*/}
                    <NavBar />
                    <div >
                        <ProfilePanel />
                        <NavigationPanel />
                        <div className={`flex-1 ${ showPanel === "md:flex" && "md:pl-[255px]"} h-[100%] dark:bg-deep_blue_black pt-[40px]`}>
                             <Outlet/>
                        </div>
                    </div>
                </div>
            }
        </>
    )}
}

export default PortalLayout