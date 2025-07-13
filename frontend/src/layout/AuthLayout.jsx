import React, { useEffect } from 'react'
import AuthBackground from '../components/Auth/AuthBackground'
import { Outlet, useNavigate } from 'react-router-dom'
import {useAuth} from "../context/AuthContext";



const AuthLayout = () => {
  const navigator = useNavigate();

  return (
    <AuthBackground>
        <Outlet />
    </AuthBackground>
  )
}

export default AuthLayout