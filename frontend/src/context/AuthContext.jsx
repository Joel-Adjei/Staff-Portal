import React, {useState, useEffect, createContext, useContext, useRef} from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthContextProvider=({children})=>{
    const roleRef = useRef("teaching")
  const [role , setRole] = useState("non-teaching") // set role to non-teaching staff (non-teaching || teaching || admin)
  const [user, setUser] = useState(null); // User object from backend API (e.g., { id, email, fullName, role })
  const [loading, setLoading] = useState(false);
  const [isLogin , setIsLogin] = useState(false)


  function setRoleRef(role) {
      roleRef.current = role;
  }

    const login = (userData) => {
      // Store user data received from backend upon successful login
      setUser(userData.data);
      localStorage.setItem("token" , userData.token);
      localStorage.setItem("user" , JSON.stringify(userData.data));
        setIsLogin(true)
    };

  const logout = () => {
    // Clear user data upon logout
    setUser(null);
    // In a real app, you'd remove the JWT token from localStorage here
    console.log("User signed out successfully.");
  };

    return(
        <AuthContext.Provider value={{
            isLogin,
            // role,
            // setRole,
            roleRef,
            setRoleRef,
            user, 
            login, 
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=> useContext(AuthContext)