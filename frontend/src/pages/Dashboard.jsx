import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import {usePortal} from "../context/PortalContext";
import AppLoading from '../components/basic/loading/AppLoading';
import AdminDashboard from './admin/AdminDashboard';
import Greetings from "../components/dashboard/Greatings";


const Dashboard = () => {
  const { user: userData , userRef, roleRef , fetchProfile } = useAuth()
  const navigator = useNavigate()


  return (
      <>
        {  userRef.current == null ? <AppLoading /> : roleRef.current == "admin" ? (
          <AdminDashboard />
        ) :
  <div className="p-6">
      <Greetings userRef={userRef} />

    <div className="mt-4 pb-0 dark:bg-deep_blue_black rounded-lg border border-blue-200">
      <h4 className="text-lg font-medium text-blue-100 py-2 px-5 rounded-t-lg bg-blue-600 dark:bg-blue-950 dark:text-blue-200 mb-2">Usage
        Documentation</h4>
      <ul className="list-disc list-inside text-blue-700 dark:text-blue-200 px-4 pb-2 space-y-1">
        {roleRef.current === "teaching" && (
            <>
              <li>Use "Submit Teaching Materials" to upload your PDF lesson notes.</li>
              <li>Fill out the "Apply for Leave" form for any leave requests.</li>
              <li>"Submit Class Performance" allows you to upload Excel sheets.</li>
            </>
        )}
        {roleRef.current === "non-teaching" && (
            <>
              <li>Fill out the "Apply for Leave" form for any leave requests.</li>
            </>
        )}
        {(roleRef.current === 'staff' || roleRef.current === 'non-teaching') && (
            <>
              <li>Use the "Suggestion Box" for anonymous feedback.</li>
            </>
        )}
        {roleRef.current === 'admin' && (
            <>
              <li>"Add/Delete/Update Teacher Profile" (placeholder) to manage staff accounts.</li>
              <li>"Grant Admin Privileges" (placeholder) to assign roles and tasks.</li>
              <li>"View Teaching Materials" (placeholder) to inspect and comment on uploaded resources.</li>
              <li>"Post Announcements" to communicate with all staff members.</li>
              <li>"Review Leave Applications" (placeholder) to approve or deny staff leave requests.</li>
              <li>"Review Suggestions" (placeholder) to view and comment on staff feedback.</li>
            </>
        )}
      </ul>
    </div>
      <div className={'p-3 bg-gray-50 dark:bg-blue-950 dark:text-blue-200 shadow-xl mt-7 rounded-lg border-2 border-orange-color dark:border-blue-300'}>
          Quote of the day
          <p className={'mt-2 text-sm text-gray-500'}>
              Eat Gob3 everyday it helps the body to last long when teaching
          </p>
      </div>
  </div>
      }
      </>
    )
}

export default Dashboard