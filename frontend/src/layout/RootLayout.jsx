import React , {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const RootLayout = () => {
  const { isLogin } = useAuth()
  const navigator = useNavigate();

  useEffect(()=>{
    console.log(isLogin)
    isLogin ? navigator("/portal") : navigator("/auth/login")
  },[])

  return (
    <div className={'h-[100vh] dark:bg-deep_blue_black'} >
        <Outlet />
    </div>
  )
}

export default RootLayout