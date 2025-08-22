import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import {User, X, School, Bell, LogOut, Edit, Mail, Phone, MapPin, Calendar, Moon, Sun, UserCheck} from 'lucide-react';
import {usePortal} from "../context/PortalContext";
import {useAuth} from "../context/AuthContext";

const ProfilePanel = () => {
    const navigator = useNavigate()
    const panelRef = useRef(null);
    const {openProfile,  toggleProfilePanel , toggleDarkMode , handleThemeChange} = usePortal()
    const {userRef, roleRef, resetUserData}  = useAuth()

    const logout = () => {
        // Clear user data upon logout
        resetUserData();
        navigator("/auth/login")
        // In a real app, you'd remove the JWT token from localStorage here
        console.log("User signed out successfully.");
    };


    return (
                    <div className="relative">

                        {openProfile &&  <div onClick={() => toggleProfilePanel()} className={`fixed z-30 top-0 left-0 bg-gray-800/70 h-[100vh] w-full`}></div>}

                        {openProfile && <button
                            onClick={() => toggleProfilePanel()}
                        >
                            <X className={`fixed w-[30px] h-[30px] text-blue-950 z-50 top-2 right-3 bg-gray-200 p-1 rounded-full`}/>
                        </button>
                        }
                        {/* Profile Panel */}
                        <div
                            ref={panelRef}
                            className={`fixed z-40 h-[100dvh] top-0 right-0 w-80 bg-white-color p-2 dark:bg-deep_blue_black backdrop-blur-lg rounded-l-2xl shadow-2xl border-l-2 border-orange-color overflow-hidden transition-all duration-300 transform
                             
                             ${
                                openProfile
                                    ? 'opacity-100 translate-x-0'
                                    : 'opacity-0 translate-x-full pointer-events-none'
                            }`}
                        >
                            {/* Profile Header */}
                            <div className={`bg-gray-200/40 dark:bg-blue-50/10 p-6 text-white rounded-lg`}>
                                <div className="relative flex flex-col gap-3 items-center space-x-4">
                                    <div className="relative w-[130px] h-[130px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                        <User className="w-[100px] h-[100px]" />

                                        { roleRef.current == "staff" &&
                                        <button 
                                            className='absolute top-1 right-1 shadow-lg z-0 '
                                            onClick={()=> navigator("/portal/updateProfile")}
                                        >
                                            <Edit className='size-[30px] text-orange-600 dark:text-blue-950 dark:blue-200 bg-slate-100 dark:bg-blue-100 rounded p-1.7 z-0' />
                                        </button>
                                        }
                                    </div>
                                    {userRef.current && <div>
                                        <h3 className="text-3xl text-orange-color text-center font-semibold">{userRef.current.name}</h3>
                                        <p className="bg-gradient-to-r from-orange-500 to-orange-600 mt-2 rounded-full text-white text-center">{userRef.current.subject}</p>
                                    </div>}

                                </div>

                            </div>

                            <div className={`w-full flex pt-4 justify-center`}>
                                <button
                                    className={` p-1 border h-fit bg-gray-200 flex items-center gap-2 rounded-full`}
                                    onClick={()=> {
                                        toggleDarkMode()
                                        handleThemeChange()
                                    }}
                                >
                                    <Moon className={`w-6 h-6 text-blue-950 dark:bg-blue-950 dark:text-blue-200 p-1 rounded-full `} />
                                    <Sun className={"size-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white-color p-1 rounded-full dark:bg-none dark:text-blue-950 "} />
                                </button>
                            </div>


                            {/* Profile Details */}
                            { userRef.current &&
                            <div className="p-6 space-y-4">
                                <div className="flex items-center space-x-3 text-gray-700 dark:text-blue-200">
                                    <Mail className="w-4 h-4 text-orange-color"/>
                                    <span className="text-md">{userRef.current.email}</span>
                                </div>

                                {
                                    roleRef.current == "staff" && 
                                    <>
                                        <Info Icon={Phone} label={userRef.current.contact} />
                                        <Info Icon={MapPin} label={userRef.current.address} />
                                        <Info Icon={UserCheck} label={userRef.current.role} />
                                        <Info Icon={School} label={userRef.current.classTaught} />
                                    </>
                                }
                            </div>
                            }

        
                        <div className="absolute w-full bottom-0 mt-auto p-4"> {/* Pushes logout to bottom */}
                            <button
                                onClick={logout}
                                className="flex items-center w-full p-3 pl-4 rounded-lg text-left text-gray-200 hover:bg-blue-300/30 hover:text-white transition-all duration-200 ease-in-out"
                            >
                                {/*<LogIn className="mr-3 h-5 w-5" />*/}
                                <LogOut className="mr-3 h-5 w-5 text-blue-950 dark:text-blue-200 " />
                                <span className="font-medium text-blue-950 dark:text-blue-200 text-md">Logout</span>
                            </button>
                        </div>

                        </div>
                    </div>
    );
};

export default ProfilePanel;

const Info =({Icon , label})=>{
    return(
        <div className="flex items-center space-x-3 text-gray-700 dark:text-blue-200">
            <Icon className="w-4 h-4 text-orange-color"/>
            <span className="text-md">{label}</span>
        </div>
    )
}