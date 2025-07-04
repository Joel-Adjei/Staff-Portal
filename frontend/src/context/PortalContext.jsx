import React, { useState , createContext, useContext } from "react";

const PortalContext = createContext();

export const PortalContextProvider =({children})=>{
    const [darkMode, setDarkMode] = useState(false)
    const [showPanel , setShowPanel] = useState("md:flex")
    const [showPanelMobile , setShowPanelMobile] = useState("hidden")
    const [currentPage , setCurrentPage] = useState("Home")

        function toggleDarkMode() {
            if(document.documentElement.classList.contains('dark')){
                document.documentElement.classList.remove('dark')
                localStorage.theme = 'light'
            }else{
                document.documentElement.classList.add('dark')
                localStorage.theme = 'dark'
            }
        }

    const handleThemeChange = ()=>{
        setDarkMode(prev => !prev)
    }

    function togglePanel() {
        setShowPanel(prevState => prevState === "md:flex" ? "md:hidden" : "md:flex")
    }
    function togglePanelMobile() {
        setShowPanelMobile(prevState => prevState === "flex" ? "hidden" : "flex")
    }

    return(
        <PortalContext.Provider value={{
            showPanel,
            togglePanel,
            showPanelMobile,
            togglePanelMobile,
            darkMode,
            toggleDarkMode,
            currentPage,
            setCurrentPage,
        }}>
            {children}
        </PortalContext.Provider>
    )
}

export const usePortal =()=> useContext(PortalContext);