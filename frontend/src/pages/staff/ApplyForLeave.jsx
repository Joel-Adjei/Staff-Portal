import React, {useState} from 'react';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import { LogIn, UserPlus, Home, Upload, FileText, Send, Calendar, Lightbulb, Bell, User, BookText, GraduationCap, Building, ClipboardList, BookOpen, MessageSquare, Megaphone, CheckSquare } from 'lucide-react';
import MessageAlert from "../../components/MessageAlert";
import {useAuth} from "../../context/AuthContext";
import AppInput from "../../components/basic/input/AppInput";
import Header from "../../components/basic/Header";
import Button from "../../components/basic/button/Button";

const ApplyForLeave = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const { user } = useAuth();
    const userName = user?.firstName;
    const userId = user?.id || 'anonymous'; // Use user.id from backend

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
        setMessage({ text: '', type: '' });
        try {
            // const payload = {
            //     ...values,
            //     applicantId: userId,
            //     applicantName: userName,
            // };
            //
            // const response = await axios.post(`${API_BASE_URL}/staff/leave`, payload);
            //
            // if (response.status === 201) {
            //     setMessage({ text: 'Leave application submitted successfully!', type: 'success' });
            //     resetForm();
            // }
            console.log(values)
        } catch (error) {
            console.error("Apply leave error:", error);
            setMessage({
                text: error.response?.data?.message || 'Failed to submit leave application. Please try again.',
                type: 'error',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <Header
                Icon={Calendar}
                className="mr-2 h-7 w-7 text-green-600"
                title={"Apply for Leave"}
            />
            <MessageAlert message={message.text} type={message.type} />
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

                        <div>
                            <label htmlFor="comments" className="block text-gray-700 text-sm font-bold mb-2">
                                Additional Comments (Optional)
                            </label>
                            <AppInput
                                as="textarea"
                                id="comments"
                                name="comments"
                                rows="2"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Any other details you want to provide."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            // className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Application'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default  ApplyForLeave