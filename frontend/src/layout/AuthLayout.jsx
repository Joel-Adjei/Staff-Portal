import React, { useEffect } from 'react'
import AuthBackground from '../components/Auth/AuthBackground'
import { Outlet, useNavigate } from 'react-router-dom'



const AuthLayout = () => {
  const navigator = useNavigate();

  useEffect(()=>{
    navigator("/auth/login")
  }, [])
  
  return (
    <AuthBackground>
        <Outlet />
    </AuthBackground>
  )
}

export default AuthLayout