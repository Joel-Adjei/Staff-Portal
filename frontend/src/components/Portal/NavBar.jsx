import React, {useEffect} from 'react';
import {PanelLeft, Bell, Moon, Sun} from "lucide-react";
import {usePortal} from "../../context/PortalContext";
import {useAuth} from "../../context/AuthContext";

const NavBar =()=>{
    const { currentPage , toggleDarkMode, handleThemeChange ,togglePanel ,togglePanelMobile} = usePortal()
  const { user , roleRef } = useAuth()

    function formatString(title) {
        return title.split('-').map((word)=> word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
    }

    return(
        <nav className={"w-full sticky flex items-center md:justify-between top-0 bg-gray-50 shadow-md z-30 dark:bg-blue-950"}>
            <div className={"md:w-[255px] bg-orange-color flex items-center gap-2 py-3.5 md:py-1.5 pl-5 rounded-r-md"}>
                <button onClick={()=> {
                    togglePanel()
                    togglePanelMobile()
                }}>
                    <PanelLeft className={"text-3xl text-white p-1 rounded bg-white/20 mr-3 "} />
                </button>

                <div className={"hidden bg-white md:block size-[40px] bg-gray-500 rounded-full"}></div>
                <p className={"hidden font-bold text-white md:block"}>KHMP</p>
            </div>

            <div className={"flex flex-1 items-center justify-between py-1 pl-4 md:pl-7 pr-3"}>
                <div>
                    <h3 className={"hidden text-xl text-font-color font-medium dark:text-blue-200 md:block"}>{formatString(currentPage)}</h3>

                    <div className={" md:hidden size-[40px] bg-gray-500 rounded-full"}></div>
                </div>

                <div className={" flex items-center gap-4"}>
                    <Bell  className={"size-[30px] text-[#FF970B] p-1 rounded-full bg-gray-200 dark:bg-blue-200 dark:text-blue-950 cursor-pointer mr-3 "} />

                    <div className={" flex items-center gap-2 hover:bg-blue-300/20 px-2 py-1 cursor-pointer rounded"}>
                        <p className={"hidden text-font-color dark:text-blue-200 md:block"}>Dr. {user.firstName}</p>
                        <div className={"size-[35px] bg-gray-500 rounded-full"}></div>
                    </div>
                </div>
            </div>

                <button
                    className={`mr-2 p-1 border h-fit bg-gray-200 flex items-center gap-2 rounded-full`}
                    onClick={()=> {
                        toggleDarkMode()
                        handleThemeChange()
                    }}
                >
                     <Moon className={`w-6 h-6 text-blue-950 dark:bg-blue-950 dark:text-blue-200 p-1 rounded-full `} />
                     <Sun className={"size-6 bg-orange-color text-white-color p-1 rounded-full dark:bg-transparent dark:text-blue-950 "} />
                </button>

        </nav>
    )
}

export default NavBar