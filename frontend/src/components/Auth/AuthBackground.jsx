import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Sun , Moon} from 'lucide-react'
import { colors } from '../../assets/assets';
import { useAuth } from "../../context/AuthContext";
import {usePortal} from "../../context/PortalContext";


const AuthBackground = ({children}) => {
    const [isLogin, setIsLogin] = useState(true); 
    const navigator = useNavigate()

    const { setRoleRef } = useAuth()
    const { darkMode , toggleDarkMode , handleThemeChange} = usePortal()
  return (
    <div className={`relative min-h-screen flex flex-col  items-center justify-center bg-blue-100/40 dark:bg-deep_blue_black backdrop-blur-[20px] py-6 px-4 overflow-hidden`}>
                {/* bg desgins */}
                <div className={`bg-gradient-to-br from-blue-500  to-blue-50/40  fixed bottom-0 -left-2 sm:left-8 rounded-t-full h-[270px]  w-[160px] z-0`}></div>
                <div className={`bg-gradient-to-tl from-orange-700/80 to-orange-400 fixed block -top-20 rounded-b-full -right-2 sm:right-8 h-60 w-[16px] sm:w-[30px] z-0`}></div>

                
                <div className='flex flex-col items-center mb-5  z-30'>
                    <div className={"size-[50px] bg-gray-500 rounded-full mb-2"}></div>
                    <h2 className={`text-xl dark:text-white text-blue-900 text-center uppercase text-gray-600 font-medium `}>
                        Kids Haven Montessori School Staff Portal</h2>
                </div>
                
                   {children} 
                
                <button
                    className={`fixed bottom-4 right-4 p-2 rounded-full text-lg dark:bg-white dark:text-blue-950 bg-blue-950 text-white`}
                    onClick={()=> {
                        toggleDarkMode()
                        handleThemeChange()
                    }}
                >
                    {darkMode ? <Moon /> : <Sun />}
                </button>
            </div>
  )
}

export default AuthBackground