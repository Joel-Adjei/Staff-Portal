import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { LogIn, UserPlus, Home, Upload, FileText, Send, Calendar, Lightbulb, Bell, User, BookText, GraduationCap, Building, ClipboardList, BookOpen, MessageSquare, Megaphone, CheckSquare } from 'lucide-react';
import MessageAlert from "../../components/MessageAlert";
import {useAuth} from "../../context/AuthContext";
import AppInput from "../../components/basic/input/AppInput";
import Header from "../../components/basic/Header";
import Button from "../../components/basic/button/Button";
import useToast from "../../hooks/useToast";
import {ToastContainer} from "../../Toast";
import useFetch from "../../hooks/useFetch";
import { ProcessIndicator } from '../../components/basic/loading/PortalLoading';

const ApplyForLeave = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const { user , token } = useAuth();
    const {toasts, addToast, removeToast} = useToast()

    const {fetchData ,response, loading} = useFetch({method:"POST" , endpoint: "/users/staff/leave" ,})

    const validationSchema = Yup.object().shape({
        reason: Yup.string().required('Reason for leave is required').min(10, 'Reason must be at least 10 characters'),
        startDate: Yup.date()
            .required('Start Date is required')
            .min(new Date(), 'Start date cannot be in the past'),
        endDate: Yup.date()
            .required('End Date is required')
            .min(Yup.ref('startDate'), 'End date cannot be before start date'),
        comments: Yup.string().optional(),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const payload =
            {
                "reason": `${values.reason}`,
                "start_date": `${values.startDate}`,
                "end_date": `${values.endDate}`
            }
        try {
            await fetchData({payload: payload, token: token.current})
            if(response.current.ok){
                addToast("message sent successful", "success")
            }
            console.log(values)
        } catch (error) {
            console.error("Apply leave error:", error);
            addToast("Failed to submit leave application. Please try again", "error")

        } finally {
            setSubmitting(false);
            resetForm()
        }
    };

    return (
        <div className="p-6">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <Header
                Icon={Calendar}
                className="mr-2 h-7 w-7 text-green-600"
                title={"Apply for Leave"}
            />
            <Formik
                initialValues={{ reason: '', startDate: '', endDate: '', comments: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                                Reason for Leave
                            </label>
                            <AppInput
                                as="textarea"
                                id="reason"
                                name="reason"
                                rows="3"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="E.g., Personal emergency, vacation, medical leave..."
                            />
                            {/*<ErrorMessage name="reason" component="div" className="text-red-500 text-xs mt-1" />*/}
                        </div>

                        <div>
                            <label htmlFor="startDate" className="block text-gray-700 text-sm font-bold mb-2">
                                Start Date
                            </label>
                            <AppInput
                                type="date"
                                id="startDate"
                                name="startDate"
                             />
                            {/*<ErrorMessage name="startDate" component="div" className="text-red-500 text-xs mt-1" />*/}
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-gray-700 text-sm font-bold mb-2">
                                End Date
                            </label>
                            <AppInput
                                type="date"
                                id="endDate"
                                name="endDate"
                             />
                            {/*<ErrorMessage name="endDate" component="div" className="text-red-500 text-xs mt-1" />*/}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            // className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? <ProcessIndicator label={'Submitting...'} /> : 'Submit Application'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default  ApplyForLeave