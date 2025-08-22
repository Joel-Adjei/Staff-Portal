import React, {useEffect} from 'react'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate} from 'react-router-dom'
import { PortalContextProvider } from './context/PortalContext'
import Login from './components/Auth/Login'
import RootLayout from './layout/RootLayout'
import AuthLayout from './layout/AuthLayout'
import Dashboard from './pages/Dashboard'
import {AuthContextProvider, useAuth} from './context/AuthContext'
import PortalLayout from "./layout/PortalLayout";
import SuggestionBox from "./pages/staff/SuggestionBox";
import ApplyForLeave from "./pages/staff/ApplyForLeave";
import AddStaff from "./pages/admin/AddStaff";
import UpdateProfile from "./pages/UpdateProfile";
import SubmitTeachingMaterial from "./pages/staff/SubmitTeachingMaterial";
import SubmitPerformance from "./pages/staff/SubmitPerformance";
import ManageStaff from "./pages/admin/ManageStaff";
import PostAnnouncement from "./pages/admin/PostAnnouncement";
import ReviewLeave from "./pages/admin/ReviewLeave";
import ReviewSuggestions from "./pages/admin/ReviewSuggestions";
import LeaveDetails from "./components/others/LeaveDetails";
import StaffProfileSetup from "./components/ProfileSetup/StaffProfileSetup";
import StaffDetails from "./components/others/StaffDetails";
import AnnouncementDetail from './components/others/AnnounceDetails'
import SuggestionDetails from './components/others/SuggestionDetails'
import AcademicCalender from './pages/AcademicCalender'
import AdminTLM from './pages/admin/adminTLM'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout /> } >
          <Route path='auth' element={<AuthLayout />} >
              <Route path='login' element={<Login />} />
          </Route>

          <Route path={"profile-setup"} element={<StaffProfileSetup />} />

          <Route path='portal' element={<PortalLayout />} >
              <Route index element={<Dashboard />} />
              <Route path={"suggestion-box"} element={<SuggestionBox />} />
              <Route path={"apply-for-leave"} element={<ApplyForLeave />} />
              <Route path={"manageStaff"} element={<ManageStaff />} />
              <Route path={"addStaff"} element={<AddStaff />} />
              <Route path={"updateProfile"} element={<UpdateProfile />} />
              <Route path={"submit-teaching-materials"} element={<SubmitTeachingMaterial />} />
              <Route path={"view-lesson"} element={<AdminTLM />} />
              <Route path={"submit-performance"} element={<SubmitPerformance />} />
              <Route path={"post-announcement"} element={<PostAnnouncement />} />
              <Route path={"announcement/:id"} element={<AnnouncementDetail />} />
              <Route path={"review-leave"} element={<ReviewLeave />} />
              <Route path={"review-leave/:id"} element={<LeaveDetails />} />
              <Route path={"academic-calender"} element={<AcademicCalender />} />
              <Route path={"manageStaff/:id"} element={<StaffDetails />} />
              <Route path={"review-suggestions"} element={<ReviewSuggestions />} />
              <Route path={"review-suggestions/:id"} element={<SuggestionDetails />} />
          </Route>

      </Route>
    )
  )

  return (
    <>
    <AuthContextProvider >
      <PortalContextProvider>
        <RouterProvider router={router} />
      </PortalContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
