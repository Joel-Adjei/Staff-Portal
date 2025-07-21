import React , {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth} from '../context/AuthContext';
import { usePortal } from '../context/PortalContext';

const RootLayout = () => {
  const navigator = useNavigate()
   const {   isLogin , fetchProfile , user } = useAuth()
  const {loading , setLoading} = usePortal()

  useEffect(()=>{
      setTimeout(()=> setLoading(false) , 3000)
  },[])

  useEffect(()=>{
      isLogin.current ? navigator("/portal") : navigator("/auth/login")
      // navigator("/portal")
      user == null && fetchProfile()
  },[isLogin.current])

  return (
      <>
          <div className={'h-[100vh] dark:bg-deep_blue_black'} >
              <Outlet/>
          </div>
      </>

  )
}

export default RootLayout