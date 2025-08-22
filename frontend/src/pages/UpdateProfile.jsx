import React from 'react'
import { Formik , Form } from "formik";
import {useNavigate} from 'react-router-dom'
import AppInput from "../components/basic/input/AppInput";
import Button from "../components/basic/button/Button";
import * as Yup from "yup";
import {ToastContainer} from "../Toast";
import Header from "../components/basic/Header";
import {User , X} from "lucide-react";
import useToast from "../hooks/useToast";
import {useAuth} from "../context/AuthContext";
import useFetch from "../hooks/useFetch";
import ModalSection from "../components/ModalSection";
import { ProcessIndicator } from '../components/basic/loading/PortalLoading';

const UpdateProfile =() => {
    const navigator = useNavigate()
    const {fetchData ,response, loading} = useFetch({method:"PUT" , endpoint: "/users/staff/profile" ,})
    const {toasts, addToast, removeToast} = useToast()
    const {user, userRef , token } = useAuth()

    const initialValues = {
        name: "",
        email: "",
        classTaught:"",
        subject: "",
        contact:"",
        address: ""

    }

    const validation = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email('Invalid email'),
        classTaught: Yup.string(),
        subject: Yup.string(),
        contact: Yup.string().min(10, "number should be 10 digit"),
        address: Yup.string().min(10, 'Reason must be at least 10 characters'),
    });

    const handleSubmit = async (values, { setSubmitting , resetForm })=>{
        setSubmitting(true)
        const payload = {
            "name": `${values.name !== "" ? values.name : userRef.current.name}`,
            "email": `${values.email !== "" ? values.email : user.email}`,
            "password": `${user.password}`,
            "role" :`${user.role}`,
            "classTaught":`${values.classTaught !== "" ? values.classTaught : user.classTaught}`,
            "subject": `${values.subject !== "" ? values.subject : user.subject}`,
            "contact":`${values.contact !== "" ? values.contact : user.contact}`,
            "address":`${values.address !== "" ? values.address : user.address}`
        }
        try {
             await fetchData({payload: payload, token: token.current})
            if(response.current.ok){
                addToast("Profile Updated", "success", 8000)
                resetForm()
                navigator(-1)
                console.log(values)
            }
        }catch (error) {
            addToast("An Error", "error", 8000)
        }finally {
            setSubmitting(false)
        }

        console.log(values)
    }

    return(
        <ModalSection>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <Header
                Icon={User}
                className="mr-2 h-7 w-7 text-green-600"
                title={"Update Profile"}
            />

            <Formik
                initialValues={ initialValues}
                validationSchema={ validation }
                onSubmit={handleSubmit}
            >
                {
                    ({ isSubmitting })=>(
                        <Form className={`transition-all duration-300 transform opacity-100 translate-x-0`}>
                            <AppInput
                                id={"name"}
                                name={"name"}
                                placeholder={user.name}
                                value={userRef.current.email}
                            />

                            <AppInput
                                id={"email"}
                                name={"email"}
                                placeholder={user.email}
                            />

                            <div className={"w-full flex gap-4"}>
                                <AppInput
                                    id={"classTaught"}
                                    name={"classTaught"}
                                    placeholder={user.classTaught ? user.classTaught : "classTaught*"}
                                />

                                <AppInput
                                    id={"contact"}
                                    name={"contact"}
                                    placeholder={user.contact ? user.contact :"contact*"}
                                />
                            </div>

                            <AppInput
                                id={"address"}
                                name={"address"}
                                placeholder={user.address ? user.address : "address*"}
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                // className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? <ProcessIndicator label={"Updating.."} /> : 'Update'}
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </ModalSection>
    )
}

export default UpdateProfile