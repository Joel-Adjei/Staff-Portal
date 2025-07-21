import React, {useEffect} from 'react'
import {useAuth} from "../../context/AuthContext";
import {
    Home, BookOpen, GraduationCap, Calendar, CheckSquare,
    Lightbulb, Bell, User, ClipboardList, FileText,
    Megaphone, MessageSquare, LogOut
} from "lucide-react";
import {usePortal} from "../../context/PortalContext";
import {NavLink} from "react-router-dom";

const NavigationItem = ({ icon: Icon, label, to , active , viewName }) => {
    const { currentPage , setCurrentPage , togglePanelMobile , setLoading } = usePortal()


    return <li className="mb-2">
        <NavLink className={'nav-item'} to={to} >
            <button
                onClick={()=> {
                    setLoading(true)
                    setTimeout(()=>{
                        setLoading(false)
                    }, 2000)
                    togglePanelMobile()
                    setCurrentPage(viewName)
                }}
                className={`flex items-center text-font-color w-full p-3 rounded-r-full text-left transition-all duration-200 ease-in-out
            ${active ? 'bg-orange-color': ''}
            hover:bg-blue-300/20
            ${currentPage == viewName && "bg-gradient-to-r from-orange-500 to-orange-600 hover:bg-orange-color text-white dark:text-white "}
            `}
            >
                <Icon className={`mr-3 h-5 w-5 ${currentPage == viewName ? "text-white " : "text-orange-color"}`} />
                <span className="font-medium dark:text-blue-200 text-[15px]">{label}</span>
            </button>
        </NavLink>
    </li>
};

const NavigationPanelMobile =()=> {
    const {roleRef  , logout} = useAuth()
    const { showPanelMobile, togglePanelMobile} = usePortal()
    return(
        <>
            <div className={`fixed ${showPanelMobile} top-0 w-full h-[100dvh] bg-gray-900/50 z-0 md:hidden`}
                 onClick={()=> togglePanelMobile()}
            >
            </div>
            {/* Sidebar */}
            <aside className={`w-[250px] h-[100dvh] pt-[60px] fixed bottom-0 dark:bg-blue-950 left-0 bg-[#FBFBFB] p-2 pl-0 shadow-xl ${showPanelMobile} flex-col border-r-[2px] border-[#FF970B] rounded-r-3xl z-20 md:hidden`}>
                <nav className=" w-full h-full flex flex-col justify-between">
                    <ul>
                        <NavigationItem
                            icon={Home}
                            label="Home"
                            viewName="Home"
                            to={"/portal"}
                        />
                        {roleRef.current === 'teaching' && (
                            <>
                                <NavigationItem
                                    icon={BookOpen}
                                    label="Submit Materials"
                                    viewName="submit-materials"
                                    to={"/portal/submit-teaching-materials"}
                                />
                                <NavigationItem
                                    icon={GraduationCap}
                                    label="Performance Reports"
                                    viewName="performance-reports"
                                />
                            </>
                        )}

                        {(roleRef.current === 'teaching' || roleRef.current === 'non-teaching') && (
                            <>
                                <NavigationItem
                                    icon={Lightbulb}
                                    label="Suggestion Box"
                                    viewName="suggestion-box"
                                    to={"/portal/suggestion-box"}
                                />
                                <NavigationItem
                                    icon={Calendar}
                                    label="Apply for Leave"
                                    viewName="apply-leave"
                                    to={"/portal/apply-for-leave"}
                                />
                            </>
                        )}
                        {roleRef.current === 'admin' && (
                            <>
                                <NavigationItem
                                    icon={User}
                                    label="Manage Staff"
                                    viewName="manage-staff"
                                    to={"/portal/manageStaff"}
                                />
                                <NavigationItem icon={CheckSquare} label="Grant Privileges" viewName="grant-privileges" />
                                <NavigationItem icon={ClipboardList} label="Review Materials" viewName="review-materials" />
                                <NavigationItem
                                    icon={Megaphone}
                                    label="Post Announcement"
                                    viewName="post-announcement"
                                    to={"/portal/post-announcement"}
                                />
                                <NavigationItem
                                    icon={FileText}
                                    label="Review Leave"
                                    viewName="review-leave"
                                    to={"/portal/review-leave"}
                                />
                                <NavigationItem
                                    icon={MessageSquare}
                                    label="Review Suggestions"
                                    viewName="review-suggestions"
                                    to={"/portal/review-suggestions"}
                                />
                            </>
                        )}

                    </ul>
                    <div>
                        <div className="bottom-0 mt-auto pt-6 border-t border-gray-700"> {/* Pushes logout to bottom */}
                            <button
                                onClick={()=>logout()}
                                className="flex items-center w-full p-3 rounded-lg text-left text-gray-200 hover:bg-blue-300 hover:text-white transition-all duration-200 ease-in-out"
                            >
                                {/*<LogIn className="mr-3 h-5 w-5" />*/}
                                <LogOut className="mr-3 h-5 w-5 text-blue-950 dark:text-blue-200 " />
                                <span className="font-medium text-blue-950 dark:text-blue-200 text-md">Logout</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>

        </>
    )
}

export default NavigationPanelMobile