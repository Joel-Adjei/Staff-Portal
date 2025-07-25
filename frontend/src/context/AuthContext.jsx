import React, {useState, useEffect, createContext, useContext, useRef} from 'react'
import useFetch from "../hooks/useFetch";

const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const roleRef = useRef("teaching")
    const token = useRef("")
    const userRef = useRef(null);
    const [user, setUser] = useState(null); // User object from backend API (e.g., { id, email, fullName, role })
    let isLogin = useRef(false)

    //const staff = useRef([]);
	const [staff , setStaff] = useState([])

    const { fetchData : fetchStaff  , response: staffResponse} = useFetch({endpoint: "/users/admin/staffProfiles"})
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

    const fetchAllStaffs = async ()=> {
        try{
            await fetchStaff({token: token.current})
            if(staffResponse.current.ok){
                const data = await staffResponse.current.json()
                setStaff(data);
                console.log(data)
            }

        }catch (e) {
            console.log(e)
        }
    }


  function setRoleRef(role) {
      roleRef.current = role;
  }

    const loginStaff = async (userData) => {
      // Store user data received from backend upon successful login
        token.current = userData.token
        await fetchProfile()
        localStorage.setItem("token" , userData.token);
        // setIsLogin( true)
    };

    const loginAdmin = async (userData) => {
      // Store user data received from backend upon successful login
      token.current = userData.token
       userRef.current = userData.user
        setUser(userData.user)
        isLogin.current = true
        console.log(userData)
      localStorage.setItem("token" , userData.token);
    };

  const resetUserData = () => {
     setUser(null);
     userRef.current = null
      localStorage.removeItem("token");
      isLogin.current =  false
      roleRef.current = "teaching"
  };

    return(
        <AuthContext.Provider value={{
            roleRef,
            userRef,
            setRoleRef,
            user,
            loginStaff,
            loginAdmin,
            resetUserData,
            isLogin,
            fetchProfile,
            reloadLoad,
            token,
            staff,
            fetchAllStaffs
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> {
    return useContext(AuthContext)
}