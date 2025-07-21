import React, {useState} from 'react';
import {BookText} from 'lucide-react'
import * as Yup from 'yup'
import {Formik , Form , Field , ErrorMessage } from "formik";
import {useAuth} from "../../context/AuthContext";
import FileInput from "../../components/basic/input/FileInput";
import Header from "../../components/basic/Header";
import AppInput from "../../components/basic/input/AppInput";
import Button from "../../components/basic/button/Button";

const SubmitTeachingMaterial = () => {
    const { user } = useAuth();
    const userName = user?.fullName || user?.email.split('@')[0] || 'Unknown'; // Use fullName from backend

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().optional(),
        file: Yup.mixed()
            .required('A file is required')
            .test('fileType', 'Unsupported File Format', (value) => value && ['application/pdf'].includes(value.type))
            .test('fileSize', 'File too large', (value) => value && value.size <= 5 * 1024 * 1024), // 5MB limit
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // In a real app, you would upload the file to cloud storage (e.g., Firebase Storage, AWS S3)
            // and then send the returned URL to your backend.
            // For this mock, we're just sending filename and mock URL.

            console.log(values)
        } catch (error) {
            console.error("Submit material error:", error);

        } finally {
            setSubmitting(false);
            resetForm()
        }
    };

    return (
        <div className="p-6 ">
            <Header title={"Submit Teaching Materials (PDF)"}  Icon={BookText}/>

            <Formik
                initialValues={{ title: '', description: '', file: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                Material Title
                            </label>
                            <AppInput
                                type="text"
                                id="title"
                                name="title"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Lesson Notes - Chapter 1"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                                Description (Optional)
                            </label>
                            <AppInput
                                as="textarea"
                                id="description"
                                name="description"
                                rows="4"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Brief description of the material content."
                            />
                        </div>

                        <div>
                            <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">
                                Upload PDF File (Max 5MB)
                            </label>
                            <Field name="file" component={FileInput} />
                            <ErrorMessage name="file" component="div" className="text-red-500 text-xs mt-1" />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Material'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SubmitTeachingMaterial