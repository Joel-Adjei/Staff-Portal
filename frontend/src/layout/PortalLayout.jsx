import React, {useEffect} from "react";
import NavigationPanel from "../components/Portal/NavigationPanel";
import {Outlet, useNavigate} from 'react-router-dom'
import NavBar from "../components/Portal/NavBar";
import {usePortal} from "../context/PortalContext";
import {useAuth} from "../context/AuthContext";

const PortalLayout =()=>{
    const { showPanel} = usePortal()

    return(
        <div >
                <NavBar />

            <div className={"flex"}>
                <NavigationPanel />
                <div className={`flex-1 ${ showPanel === "md:flex" && "md:pl-[255px]"} h-[100%] dark:bg-deep_blue_black pt-[40px]`}>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default PortalLayout