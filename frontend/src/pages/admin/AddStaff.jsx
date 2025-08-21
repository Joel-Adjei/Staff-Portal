import React from 'react'
import { Formik , Form, Field, ErrorMessage } from "formik";
import AppInput from "../../components/basic/input/AppInput";
import Button from "../../components/basic/button/Button";
import * as Yup from "yup";
import {ToastContainer} from "../../Toast";
import Header from "../../components/basic/Header";
import {Loader, User, X} from "lucide-react";
import useToast from "../../hooks/useToast";
import {useNavigate} from "react-router-dom";
import ModalSection from "../../components/ModalSection";
import useFetch from "../../hooks/useFetch";
import {useAuth} from "../../context/AuthContext";
import {usePortal} from "../../context/PortalContext";
import RadioGroup from "../../components/basic/input/AppPicker";
import usePageTile from "../../hooks/usePageTitle";

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'non teaching staff', label: 'Non Teaching Staff' },
    { value: 'staff', label: 'Teaching Staff' },
];

const AddStaff =()=>{
    const navigator = useNavigate()
    const {setLoading} = usePortal()
    const {token , fetchAllStaffs} = useAuth()
    usePageTile("Manage Staff - Add Staff")
    const {toasts, addToast, removeToast} = useToast()
    const { fetchData : addStaff  , response: addStaffResponse} = useFetch({method: "POST",endpoint: "/users/admin/addStaff"})

    const initialValues = {
        fullName: '', // Combined first and last name
        email: '',
        status: '',
    }

    const validation = Yup.object().shape({
        fullName: Yup.string().required("Full name is required"),
        email: Yup.string().email('Invalid email').required('Email is required'),
        status: Yup.string().oneOf(
                roles.map(opt => opt.value), // Ensure selected value is one of the valid options
        'Invalid Color'
                ).required('Status is required'),
    });

    const handleSubmit = async (values, { setSubmitting })=>{
        // setLoading(true)
        setSubmitting(true)
        const payload = {
            "email": `${values.email}`,
            "name": `${values.fullName}`,
            "role":`${values.status}`
        }
        try{
            await addStaff({token: token.current, payload})
            const data = await addStaffResponse.current.json()
            if(addStaffResponse.current.ok){
                console.log(data)
                navigator(-1)
                addToast("staff added successful" , "success" , 6000)
            }else {
                addToast(data.message, "error" , 6000)
            }
            fetchAllStaffs();
        }catch (e) {
            console.log(e)
            addToast(e.message , "error" , 6000)
        }finally {
            // setLoading(false)
            setSubmitting(false)
        }
    }

    return(
        <>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <ModalSection>
                <Header
                    Icon={User}
                    className="mr-2 h-7 w-7 text-green-600"
                    title={"Add Staff"}
                />

                <Formik
                    initialValues={ initialValues}
                    validationSchema={ validation }
                    onSubmit={handleSubmit}
                >
                    {
                        (formik )=>(
                            <Form>
                                <AppInput
                                    id={"fullName"}
                                    name={"fullName"}
                                    placeholder={"Full Name*"}
                                />

                                <AppInput
                                    id={"email"}
                                    name={"email"}
                                    placeholder={"Email*"}
                                />

                                <RadioGroup
                                    label="Status"
                                    name="status"
                                    options={roles}
                                    formik={formik} // Pass the formik object to the custom component
                                />

                                <Button
                                    type="submit"
                                    disabled={formik.isSubmitting}
                                    className={`mx-auto mt-2 focus:outline-none  focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    {formik.isSubmitting ? 
                                        <div className="flex items-center gap-2">
                                            <Loader className="animate-spin" size={20} /> 
                                            Processing..
                                        </div>
                    
                                        : "Add"}
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            </ModalSection>
        </>
    )
}

export default AddStaff