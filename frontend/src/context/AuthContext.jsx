import React, {useState, useEffect, createContext, useContext, useRef} from 'react'
import useFetch from "../hooks/useFetch";

const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const roleRef = useRef("teaching")
    const token = useRef("")
    const userRef = useRef(null);
    const [user, setUser] = useState(null); // User object from backend API (e.g., { id, email, fullName, role })
    let isLogin = useRef(false)

    const {loading : reloadLoad , fetchData  , response} = useFetch({endpoint: "/users/staff/profile"})

     const fetchProfile = async ()=> {
        if(localStorage.getItem("token") !== null){
            token.current = ( localStorage.getItem("token") )
            // console.log(token)
            try{
                await fetchData({token: token.current})
                if(response.current.ok){
                    userRef.current = await response.current.json()
                    // console.log(data)
                    setUser(await userRef.current)
                    setUser(userRef.current)
                    isLogin.current = true
                }

            }catch (e) {
                console.log(e)
            }
        }
    }


  function setRoleRef(role) {
      roleRef.current = role;
  }

    const login = (userData) => {
      // Store user data received from backend upon successful login
      token.current = userData.token
        fetchProfile()
      localStorage.setItem("token" , userData.token);
        // setIsLogin( true)
    };

  const resetUserData = () => {
     setUser(null);
      localStorage.removeItem("token");
      isLogin.current =  false
  };

    return(
        <AuthContext.Provider value={{
            roleRef,
            userRef,
            setRoleRef,
            user,
            login, 
            resetUserData,
            isLogin,
            fetchProfile,
            reloadLoad,
            token
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> {
    return useContext(AuthContext)
}