import React from "react"
import { useAuth } from "../context/AuthContext"
import StaffAcademicCalender from "./staff/StaffAcademicCalender"
import AdminAcademicCalender from "./admin/AdminAcademicCalender"

const AcademicCalender = () => {
    const {roleRef} = useAuth()
    return(
        <div>
            {roleRef.current === "staff" && <StaffAcademicCalender />}
            {roleRef.current === "admin" && <AdminAcademicCalender />}
        </div>
    )
}

export default AcademicCalender