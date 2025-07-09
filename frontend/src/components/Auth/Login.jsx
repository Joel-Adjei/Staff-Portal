import React , {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom'
import { usePortal } from "../../context/PortalContext";
import Button from "../basic/button/Button";
import {Eye , EyeClosed ,EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import { Formik , Form, Field, ErrorMessage } from "formik";
import { useAuth } from "../../context/AuthContext";
import MessageAlert from "../MessageAlert";


const Login =()=>{
    const [displayPassword , setDisplayPassword] = useState("password")
    const [isStaff, setIsStaff] = useState(true); // Default to staff tab for display purposes
    const [isTeaching, setIsTeaching] = useState(true); // Default to teaching staff tab for display purposes
    const [message, setMessage] = useState({ text: '', type: '' });
    const [loading , setLoading] = useState(false)

    const { isLogin , login , roleRef , setRoleRef} = useAuth();
    const { darkMode } = usePortal()
    const navigator = useNavigate()

    const inputStyle = `appearance-none rounded dark:bg-[#6F7FC0]/30 dark:border-[#EEA215] dark:text-white   bg-slate-100 border-blue-500 text-gray-700 border-b-[1px] w-full py-3 px-4 placeholder:italic leading-tight focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent`


    useEffect(()=>{
      if(true)  navigator("/portal")
    },[])

    const loginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });
    
     const initialLoginValues = { email: '', password: '' };

    const handleLoginSubmit = async (values, { setSubmitting }) => {
        setMessage({ text: '', type: '' });
        setLoading(true)
        //https://staff-portal-qkp1.vercel.app/api
	//http://localhost:1972/api
        const API_BASE_URL = "https://staff-portal-qkp1.vercel.app/api"
        try{
            const response =  await fetch(`${API_BASE_URL}/auth/login`,
              {
                method : 'POST',
                headers : {
                  "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    "email": `${values.email}`,
                    "password": `${values.password}`,
                    "role": `${roleRef.current}`
                })
              }

            );

            const data = await response.json()

            if(data.success){
              setMessage({ text: data.message, type: 'success' });
              console.log(data)
              login(data) //fetch the real data from the response
              navigator("/portal")
            }else{
              console.log(data)
              setMessage({
                text: 'Login failed. Please check your credentials',
                type: 'error',
            });
              console.log("error" , data.message)
            }
          
        } catch (error) { 
            console.error("Login error:", error);
            setMessage({
                text: 'Login failed. Please try again.',
                type: 'error',
            });
        } finally {
            setSubmitting(false);
            setLoading(false)
        }
    };

    function toggleDisplayPass() {
        setDisplayPassword(type=> type === "password" ? "text" : "password")
    }


    return (
        <>
        <MessageAlert message={message.text} type={message.type} />
                <div className="flex gap-2 mb-3 justify-center">
                    <button
                        className={`px-6 py-2 rounded-md text-sm transition-colors duration-200 ${isStaff ? 'bg-orange-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => {
                            setIsStaff(true)
                            setRoleRef("teaching")
                            setIsTeaching(true)
                        }}
                    >
                        Staff
                    </button>
                    <button
                        className={`px-6 py-2 rounded-md text-sm transition-colors duration-200 ${!isStaff ? 'bg-orange-600 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => {
                            setIsStaff(false)
                            setRoleRef("admin")
                        }}
                    >
                        Admin
                    </button>
                </div>

        <div className={`dark:bg-[#001741] bg-white p-6 pb-4 rounded-lg shadow-2xl w-full max-w-md z-30 `}>
                <div className="flex flex-col items-center mb-6">
                    <h2 className={`text-4xl leading-none font-bold text-center text-blue-800 mb-3 dark:text-blue-200 text-blue-800`}>
                        Login
                    </h2>
                    <div className="h-[2px] w-[70px] rounded-full bg-orange-300"></div>

                    <p className={`mt-3 text-sm dark:text-blue-100 text-blue-950`}>
                        Please input your acount details
                    </p>
                </div>

              { isStaff &&
                <div className="flex  justify-center mb-4">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-200 ${isTeaching ? 'text-orange-600 text-md font-medium' : 'text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => {
                          setRoleRef("teaching")
                            setIsTeaching(true)
                        }}
                    >
                        <div className={`size-3 border-2 rounded-full ${isTeaching ? "border-orange-600 bg-orange-600" : "border-gray-500"}`}></div>

                        Teaching Staff
                    </button>
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-colors duration-200 ${!isTeaching  ? 'text-md text-orange-600 font-medium' : ' text-gray-600 hover:bg-gray-200'}`}
                        onClick={() => {
                            setRoleRef("non-teaching")
                            setIsTeaching(false)
                        }}
                    >
                        <div className={`size-3 border-2 rounded-full ${!isTeaching ? "border-orange-600 bg-orange-600" : "border-gray-500"}`}></div>
                        Non-Teaching Staff
                    </button>
                </div>
              }
       
        <Formik
          initialValues={ initialLoginValues}
          validationSchema={ loginSchema}
          onSubmit={handleLoginSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form className="">

              <div className="mb-4">
                {/* Email Field */}
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className={inputStyle}
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="mb-6">
                {/* Password Field */}
                <div className={"relative"}>
                    <Field
                        type= {displayPassword}
                        id="password"
                        name="password"
                        className={inputStyle}
                        placeholder="Password"
                    />
                    <button className={"absolute top-1 right-2 p-2 text-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-200"}
                            onClick={toggleDisplayPass}
                            type={"button"}
                    >
                        {
                            displayPassword === "password" ? <EyeOff /> : <Eye/>
                        }
                    </button>
                    <p className={`absolute right-0 bottom-[-30px] text-sm text-blue-600 cursor-pointer dark:text-blue-200 text-blue-600 hover:underline`}>
                        forgot your password?
                    </p>
                </div>

                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div className="w-full flex justify-center mt-auto pt-5 dark:border-blue-200" >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mx-auto mt-2 focus:outline-none  focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {loading ? "Processing" : "Login"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        </div>
        </>
    )
}

export default Login;