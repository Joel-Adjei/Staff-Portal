import React, {useState} from 'react';
import Header from "../basic/Header";
import {Eye, EyeOff, User2Icon} from "lucide-react";
import { Form, Formik} from "formik";
import AppInput from "../basic/input/AppInput";
import Button from "../basic/button/Button";
import * as Yup from "yup";
import {useNavigate} from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import useToast from "../../hooks/useToast";
import {useAuth} from "../../context/AuthContext";
import {ToastContainer} from "../../Toast";

const StaffProfileSetup =()=>{
    const [displayPassword , setDisplayPassword] = useState("password")
    const navigator = useNavigate()
    const {fetchData ,response, loading} = useFetch({method:"PUT" , endpoint: "/users/staff/profile" ,})
    const {toasts, addToast, removeToast} = useToast()
    const {user, token, fetchProfile } = useAuth()

    const initialValues = {
        name: "",
        email: "",
        password: "",
        classTaught:"",
        subject: "",
        contact:"",
        address: ""

    }

    const validationSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Invalid email'),
        password: Yup.string().required("Please Enter a new password").min(6, 'Password must be at least 6 characters'),
        classTaught: Yup.string().required("Please enter your class you teach"),
        subject: Yup.string().required("Subject  is required").min(10, 'Reason must be at least 10 characters'),
        contact: Yup.string().required("Contact is required").min(10, "number should be 10 digit"),
        address: Yup.string().required("Address is required").min(10, 'Reason must be at least 10 characters'),
    });

    const handleSubmitUpdate = async (values, { setSubmitting , resetForm })=>{
        setSubmitting(true)
        const payload = {
            "name": `${values.name ? values.name : user.name}`,
            "email": `${values.email ? values.email : user.email}`,
            "password": `${values.password }`,
            "role" :`${user.role ? values.role : user.role}`,
            "classTaught":`${values.classTaught ? values.classTaught : user.classTaught}`,
            "subject": `${values.subject ? values.subject : user.subject}`,
            "contact":`${values.contact ? values.contact : user.contact}`,
            "address":`${values.address ? values.address : user.address}`
        }
        try {
            await fetchData({payload: payload, token: token.current})
            if(response.current.ok){
                addToast("Profile Updated", "success", 8000)
                resetForm()
                await fetchProfile()
                navigator("/portal", {replace : true})
                console.log(values)
            }
        }catch (error) {
            addToast("An Error", "error", 8000)
        }finally {
            setSubmitting(false)
        }
    }


    function toggleDisplayPass() {
        setDisplayPassword(type=> type === "password" ? "text" : "password")
    }


    return(
        <>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className={"bg-gray-100 h-[100vh] flex flex-col justify-cente items-center p-5"}>
                <Header title={"Setup Your Profile"} Icon={User2Icon} />

                <div className={`max-w-[500px] bg-white dark:bg-blue-950 rounded-lg shadow-xl`}>
                    <Formik
                        initialValues={ initialValues}
                        validationSchema={ validationSchema }
                        onSubmit={handleSubmitUpdate}
                    >
                        {
                            ({isSubmitting})=>(
                                <Form className={" p-4"}>
                                    <AppInput
                                        id={"name"}
                                        name={"name"}
                                        placeholder={user.name}
                                    />

                                    <AppInput
                                        id={"email"}
                                        name={"email"}
                                        placeholder={user.email}
                                    />

                                    <AppInput
                                        id={"password"}
                                        name={"password"}
                                        type={displayPassword}
                                        placeholder={"New Password"}
                                    />

                                    <div className={` flex flex-col gap-3 p-2`}>
                                        <div className={" h-[1px] bg-gray-300 dark:bg-blue-200 w-full mb-2"}></div>
                                        <div  className={`flex gap-4`}>
                                            <AppInput
                                                id={"subject"}
                                                name={"subject"}
                                                placeholder={"Subject"}
                                            />

                                            <AppInput
                                                id={"classTaught"}
                                                name={"classTaught"}
                                                placeholder={"classTaught"}
                                            />
                                        </div>
                                        <div className={" h-[1px] bg-gray-300 dark:bg-blue-200 w-full mb-2"}></div>
                                    </div>

                                    <AppInput
                                        id={"contact"}
                                        name={"contact"}
                                        placeholder={"Contact*"}
                                    />

                                    <AppInput
                                        id={"address"}
                                        name={"address"}
                                        placeholder={"Address*"}
                                    />

                                    <Button type={"submit"} >
                                        { isSubmitting ? "Updating" : "Update"}
                                    </Button>
                                </Form>
                            )
                        }

                    </Formik>
                </div>
            </div>
        </>
    )
}

export default StaffProfileSetup;