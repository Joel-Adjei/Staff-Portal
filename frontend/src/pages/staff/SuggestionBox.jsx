import React, {useState} from 'react'
import {Lightbulb} from "lucide-react";
import MessageAlert from "../../components/MessageAlert";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import AppInput from "../../components/basic/input/AppInput";
import Header from "../../components/basic/Header";
import Button from "../../components/basic/button/Button";
import {ToastContainer} from "../../Toast";
import useToast from "../../hooks/useToast";
import useFetch from '../../hooks/useFetch';
import { useAuth } from '../../context/AuthContext';

const SuggestionBox = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const {fetchData , response} = useFetch({method: "POST", endpoint: "/users/staff/suggestions"})
    const {toasts, addToast, removeToast} = useToast()
    const {token} = useAuth()


    const validationSchema = Yup.object().shape({
        suggestion: Yup.string().required('Suggestion cannot be empty').min(10, 'Suggestion must be at least 10 characters'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setMessage({ text: '', type: '' });

        const payload = {
            "suggestion": values.suggestion
        }

        try {
            await fetchData({payload , token: token.current})

            if (response.current.ok) {
                const data = await response.current.json()
                console.log(data)
                addToast('Suggestion submitted anonymously!','success');
                resetForm();
            }
            console.log(values)
        } catch (error) {
            console.error("Submit suggestion error:", error);
            setMessage({
                text:  'Failed to submit suggestion. Please try again.',
                type: 'error',
            });
            
            addToast('Eror!','error');
        } finally {
            setSubmitting(false);
            resetForm()
        }
    };

    return (
        <div className="p-6">
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <Header
               Icon={Lightbulb} title={"Suggestion Box (Anonymous)"}
            />
            <Formik
                initialValues={{ suggestion: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="suggestion" className="block text-gray-600 text-sm font-bold mb-2">
                                Your Suggestion/Complaint/Thought
                            </label>
                            <AppInput
                                as="textarea"
                                id="suggestion"
                                name="suggestion"
                                rows="20"
                                className="shadow h-[160px] border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your anonymous suggestion here..."
                            />
                         </div>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SuggestionBox