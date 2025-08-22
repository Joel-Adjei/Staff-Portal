import React, { useState, useEffect , createContext, useContext } from "react";

const PortalContext = createContext();

export const PortalContextProvider =({children})=>{
    const [openProfile, setOpenProfile] = useState(false);// for profile panel
    const [openNotifi, setOpenNotifi] = useState(false);// for Notofication panel
    const [darkMode, setDarkMode] = useState(false)
    const [loading, setLoading] = useState(true);
    const [showPanel , setShowPanel] = useState("md:flex")
    const [showPanelMobile , setShowPanelMobile] = useState("hidden")
    const [showNotiMobile , setNotiMobile] = useState("hidden")
    const [currentPage , setCurrentPage] = useState("Dashboard")
    const [events, setEvents] = useState([]);


    
    const resetPage =()=>{
        setCurrentPage("Dashboard")
    }
    useEffect(() => {
        // Check if theme is stored in localStorage or system preference
        const savedTheme = localStorage.theme;
        const systemDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDarkMode)) {
          setDarkMode(true);
          document.documentElement.classList.add('dark');
        } else {
          setDarkMode(false);
          document.documentElement.classList.remove('dark');
        }
      }, []);
      
    useEffect(() => {
       resetPage()
    }, []);

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
        setOpenProfile(!openProfile);
    };
    const toggleNotfiPanel = () => {
        setOpenNotifi(!openNotifi);
    };

    //DestopPanel
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
            openProfile,
            setOpenProfile,
            toggleProfilePanel,
            openNotifi,
            toggleNotfiPanel,
            events,
            setEvents
        }}>
            {children}
        </PortalContext.Provider>
    )
}

export const usePortal =()=> useContext(PortalContext);