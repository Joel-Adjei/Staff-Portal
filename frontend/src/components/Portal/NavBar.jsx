import React from 'react';
import {PanelLeft , Bell} from "lucide-react";
import {usePortal} from "../../context/PortalContext";

const NavBar =()=>{
    const {togglePanel ,togglePanelMobile} = usePortal()
    return(
        <nav className={"w-full sticky flex  md:justify-between top-0 bg-gray-50 shadow-md z-30"}>
            <div className={"md:w-[255px] bg-orange-color flex items-center gap-2 pl-5 rounded-r-md"}>
                <button onClick={()=> {
                    togglePanel()
                    togglePanelMobile()
                }}>
                    <PanelLeft className={"text-3xl text-white p-1 rounded bg-white/20 mr-3 "} />
                </button>

                <div className={"hidden bg-white md:block size-[40px] bg-gray-500 rounded-full"}></div>
                <p className={"hidden font-bold text-white md:block"}>KHMP</p>
            </div>

            <div className={"flex flex-1 items-center justify-between py-1 px-7"}>
                <div>
                    <h3 className={"hidden text-xl text-font-color font-medium md:block"}>Home</h3>

                    <div className={" md:hidden size-[40px] bg-gray-500 rounded-full"}></div>
                </div>

                <div className={" flex items-center gap-4"}>
                    <Bell  className={"text-[40px] text-[#FF970B] p-1 rounded-full bg-blue-50 cursor-pointer mr-3 "} />

                    <div className={" flex items-center gap-2 hover:bg-blue-300/20 px-2 py-1 cursor-pointer rounded"}>
                        <p className={"hidden text-font-color md:block"}>Dr. Apreku</p>
                        <div className={"size-[35px] bg-gray-500 rounded-full"}></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar