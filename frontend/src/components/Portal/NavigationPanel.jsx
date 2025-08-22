import React from 'react'
import {useAuth} from "../../context/AuthContext";
import NavigationItem from "./NavigationItem";
import {
    Home , BookOpen , GraduationCap , Calendar , CheckSquare ,
    Lightbulb , Bell , User , ClipboardList , FileText ,
    Megaphone ,MessageSquare , LogOut,
    Calendar1
} from "lucide-react";
import {usePortal} from "../../context/PortalContext";
import NavigationPanelMobile from "./NavigationPanelMobile";
import {useNavigate} from "react-router-dom";

const NavigationPanel=()=>{
    const navigator = useNavigate()
    const {roleRef , resetUserData} = useAuth()
    const { showPanel } = usePortal()

    const logout = () => {
        // Clear user data upon logout
        resetUserData();
        navigator("/auth/login")
        // In a real app, you'd remove the JWT token from localStorage here
        console.log("User signed out successfully.");
    };

    return(
        <>
            {/* Sidebar */}
            <aside className={`hidden w-[210px] h-[100vh] pt-[60px] fixed bottom-0 left-0 bg-[#FBFBFB] dark:bg-blue-950 p-2 pl-0 shadow-2xl  ${showPanel} flex-col rounded-r-3xl z-20`}>
                <nav className=" w-full h-full flex flex-col justify-between">
                    <ul>
                        <NavigationItem
                            icon={Home}
                            label="Dashboard"
                            viewName="Dashboard"
                            to={"/portal"}
                        />
                        {roleRef.current === 'staff' && (
                            <>
                                <NavigationItem
                                    icon={BookOpen}
                                    label="Submit Materials"
                                    viewName="submit-materials"
                                    to={"/portal/submit-teaching-materials"}
                                />
                                {/* <NavigationItem
                                    icon={GraduationCap}
                                    label="Performance Reports"
                                    viewName="performance-reports"
                                /> */}
                            </>
                        )}

                        {(roleRef.current === 'staff' || roleRef.current === 'non-teaching') && (
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
                                {/* <NavigationItem icon={ClipboardList} label="Review Materials" viewName="review-materials" /> */}
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
                                    icon={FileText}
                                    label="View Lesson Note"
                                    viewName="view-lesson"
                                    to={"/portal/view-lesson"}
                                />
                                <NavigationItem
                                    icon={MessageSquare}
                                    label="Review Suggestions"
                                    viewName="review-suggestions"
                                    to={"/portal/review-suggestions"}
                                />
                            </>
                        )}

                        
                                <NavigationItem
                                    icon={Calendar1}
                                    label="Academic Calender"
                                    viewName="academic-calender"
                                    to={"/portal/academic-calender"}
                                />

                    </ul>
                    <div>
                        <div  className="bottom-0 mt-auto px-3 pt-3 border-t border-gray-400/50 dark:border-blue-200/40"> {/* Pushes logout to bottom */}
                            <button
                                onClick={logout}
                                className="flex items-center w-full p-3 rounded-lg text-left text-gray-200 hover:bg-blue-300/20 hover:text-white transition-all duration-200 ease-in-out"
                            >
                                <LogOut className="mr-3 h-5 w-5 text-blue-950 dark:text-blue-200 " />
                                <span className="font-medium text-blue-950 dark:text-blue-200 text-md">Logout</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </aside>

            <NavigationPanelMobile />
        </>
    )
}

export default NavigationPanel