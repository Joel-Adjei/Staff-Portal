import React, { useState, useEffect , createContext, useContext } from "react";

const PortalContext = createContext();

export const PortalContextProvider =({children})=>{
    const [isOpen, setIsOpen] = useState(false);// for profile panel
    const [darkMode, setDarkMode] = useState(false)
    const [loading, setLoading] = useState(true);
    const [showPanel , setShowPanel] = useState("md:flex")
    const [showPanelMobile , setShowPanelMobile] = useState("hidden")
    const [currentPage , setCurrentPage] = useState("Home")

    // useEffect(() => {
    //     setCurrentPage("Home")
    // }, []);

    function onLoad(){
        setLoading(true)
        setTimeout(()=>{
            setLoading(false)
        },3000)
    }


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

    const toggleProfilePanel = () => {
        setIsOpen(!isOpen);
    };

    function togglePanel() {
        setShowPanel(prevState => prevState === "md:flex" ? "md:hidden" : "md:flex")
    }
    function togglePanelMobile() {
        setShowPanelMobile(prevState => prevState === "flex" ? "hidden" : "flex")
    }


    return(
        <PortalContext.Provider value={{
            loading,
            onLoad,
            setLoading,
            showPanel,
            togglePanel,
            showPanelMobile,
            handleThemeChange,
            togglePanelMobile,
            darkMode,
            toggleDarkMode,
            currentPage,
            setCurrentPage,
            isOpen,
            setIsOpen,
            toggleProfilePanel,
        }}>
            {children}
        </PortalContext.Provider>
    )
}

export const usePortal =()=> useContext(PortalContext);