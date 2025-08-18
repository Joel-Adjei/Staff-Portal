import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom'
import {User, X, Settings, Bell, LogOut, Edit, Mail, Phone, MapPin, Calendar, Moon, Sun} from 'lucide-react';
import {usePortal} from "../context/PortalContext";
import {useAuth} from "../context/AuthContext";

const ProfilePanel = () => {
    const navigator = useNavigate()
    const panelRef = useRef(null);
    const {openProfile,  toggleProfilePanel , toggleDarkMode , handleThemeChange} = usePortal()
    const {userRef , roleRef}  = useAuth()


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
                                <div className="flex flex-col gap-3 items-center space-x-4">
                                    <div className="w-[130px] h-[130px] bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                        <User className="w-[100px] h-[100px]" />
                                    </div>
                                    {userRef.current && <div>
                                        <h3 className="text-3xl text-orange-color text-center font-semibold">{userRef.current.name}</h3>
                                        <p className="bg-gradient-to-r from-orange-500 to-orange-600 mt-2 rounded-full text-white text-center">{userRef.current.role}</p>
                                    </div>}
                                </div>

                            </div>

                            <div className={`w-full flex justify-center`}>
                                <button
                                    className={`mr-2 mx-auto mt-2 p-1 border h-fit bg-gray-200 flex items-center gap-2 rounded-full`}
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
                                    <span className="text-sm">{userRef.current.email}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-700 dark:text-blue-200">
                                    <Phone className="w-4 h-4 text-orange-color"/>
                                    <span className="text-sm">+{userRef.current.contact}</span>
                                </div>
                                <div className="flex items-center space-x-3 text-gray-700 dark:text-blue-200">
                                    <MapPin className="w-4 h-4 text-orange-color"/>
                                    <span className="text-sm">{userRef.current.address}</span>
                                </div>
                            </div>
                            }

                            {roleRef.current == "staff" && <div>
                                <button
                                    onClick={()=> navigator("/portal/updateProfile")}
                                    className={`border p-2 rounded
                                    dark:text-blue-200 dark:border-blue-200`}
                                >
                                    Edit Profile
                                </button>
                            </div>}

                        </div>
                    </div>
    );
};

export default ProfilePanel;