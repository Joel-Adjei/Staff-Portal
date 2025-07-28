import React, {useEffect, useRef, useState} from "react";
import NavigationPanel from "../components/Portal/NavigationPanel";
import {Outlet, useNavigate} from 'react-router-dom'
import NavBar from "../components/Portal/NavBar";
import {usePortal} from "../context/PortalContext";
import {useAuth} from "../context/AuthContext";
import ProfilePanel from "../components/ProfilePanel";
import PortalLoading from "../components/basic/loading/PortalLoading";
import AppLoading from "../components/basic/loading/AppLoading";

const PortalLayout =()=>{
    const navigator = useNavigate()
    const { showPanel , loading} = usePortal()


    return(
        <>
            {
                <div className={"h-[100dvh] relative"} >
                    {/*{alert && <div className={"fixed top-0 z-40 h-[56vh] w-full text-3xl bg-blue-800"}>SetProfile</div>}*/}
                    <NavBar />
                    <div >
                        <ProfilePanel />
                        <NavigationPanel />
                        <div className={`flex-1 ${ showPanel === "md:flex" && "md:pl-[215px]"} h-[100%] dark:bg-deep_blue_black pt-[70px] pb-4`}>
                            {loading ? <AppLoading /> : <Outlet/>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PortalLayout