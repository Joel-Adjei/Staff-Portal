import React from "react";
import './navigation.css'
import {NavLink} from "react-router-dom"
import {usePortal} from "../../context/PortalContext";

const NavigationItem = ({ icon: Icon, label, to , active , onClick , viewName }) => {
    const { currentPage , setCurrentPage} = usePortal()

    return <li className="mb-2">
        <NavLink className={'nav-item'} to={to} >
        <button
            onClick={()=> setCurrentPage(viewName)}
            className={`flex items-center text-font-color w-full p-3 rounded-r-full text-left transition-all duration-200 ease-in-out
            ${active ? 'bg-orange-color': ''}
            hover:bg-blue-300/20
            ${currentPage == viewName && "bg-orange-color text-white"}
            `}
        >
            <Icon className={`mr-3 h-5 w-5 ${currentPage == viewName ? "text-white" : "text-orange-color"}`} />
            <span className="font-medium text-[15px]">{label}</span>
        </button>
        </NavLink>
    </li>
};

export default NavigationItem