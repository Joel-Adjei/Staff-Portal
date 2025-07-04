import React  from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { PortalContextProvider } from './context/PortalContext'
import Login from './components/Auth/Login'
import RootLayout from './layout/RootLayout'
import AuthLayout from './layout/AuthLayout'
import Dashboard from './pages/Dashboard'
import { AuthContextProvider } from './context/AuthContext'
import PortalLayout from "./layout/PortalLayout";
import SuggestionBox from "./pages/staff/SuggestionBox";
import ApplyForLeave from "./pages/staff/ApplyForLeave";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
          <Route path='portal' element={<PortalLayout />} >
              <Route index element={<Dashboard />} />
              <Route path={"suggestion-box"} element={<SuggestionBox />} />
              <Route path={"apply-for-leave"} element={<ApplyForLeave />} />
          </Route>
        <Route path='auth' element={<AuthLayout />} >
          <Route path='login' element={<Login />} />
        </Route>

      </Route>
    )
  )

  return (
    <>
    <PortalContextProvider>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </PortalContextProvider>
    </>
  )
}

export default App
