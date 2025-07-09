import React, {useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';


const Dashboard = () => {
  const { user: userData , roleRef } = useAuth()


  const navigator = useNavigate()

  return (
    <div className="p-6">
      <section className={"flex flex-col items-center py-3"}>
        <h4 className={"mx-auto text-5xl font-bold text-orange-color mb-4"}>Welcome</h4>
        <div className={`h-[240px] w-[240px] mx-auto flex items-center justify-center rounded-full border-2 border-blue-50 dark:border-blue-300 `}>
          <div className={`h-[220px] w-[220px] rounded-full bg-blue-50`}>

          </div>
        </div>

        <h3 className={"mx-auto text-3xl font-semibold text-font-color dark:text-blue-200 mt-2"}>Mr. {userData.firstName+" "+userData.lastName}</h3>
        <div className ={"px-10 py-[2px] text-sm text-white rounded bg-orange-color mt-1"}>Social Teacher</div>
      </section>

    <div className="mt-4 pb-0 dark:bg-deep_blue_black rounded-lg border border-blue-200">
      <h4 className="text-lg font-medium text-blue-100 py-2 px-5 rounded-t-lg bg-blue-600 dark:bg-blue-950 dark:text-blue-200 mb-2">Usage Documentation</h4>
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
        {(roleRef.current === 'teaching' || roleRef.current === 'non-teaching') && (
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
  </div>
  )
}

export default Dashboard