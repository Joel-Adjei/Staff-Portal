import React, {useState} from 'react'
import {Lightbulb} from "lucide-react";
import MessageAlert from "../../components/MessageAlert";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

const SuggestionBox = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const validationSchema = Yup.object().shape({
        suggestion: Yup.string().required('Suggestion cannot be empty').min(10, 'Suggestion must be at least 10 characters'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setMessage({ text: '', type: '' });
        try {
            // const response = await axios.post(`${API_BASE_URL}/staff/suggestions`, { message: values.suggestion });
            //
            // if (response.status === 201) {
            //     setMessage({ text: 'Suggestion submitted anonymously!', type: 'success' });
            //     resetForm();
            // }
            console.log(values)
        } catch (error) {
            console.error("Submit suggestion error:", error);
            setMessage({
                text:  'Failed to submit suggestion. Please try again.',
                type: 'error',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <Lightbulb className="mr-2 h-7 w-7 text-yellow-600" /> Suggestion Box (Anonymous)
            </h3>
            <MessageAlert message={message.text} type={message.type} />
            <Formik
                initialValues={{ suggestion: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="suggestion" className="block text-gray-700 text-sm font-bold mb-2">
                                Your Suggestion/Complaint/Thought
                            </label>
                            <Field
                                as="textarea"
                                id="suggestion"
                                name="suggestion"
                                rows="5"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your anonymous suggestion here..."
                            />
                            <ErrorMessage name="suggestion" component="div" className="text-red-500 text-xs mt-1" />
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Suggestion'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SuggestionBox