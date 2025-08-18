import React, {useState} from 'react';
import {BookText} from 'lucide-react'
import * as Yup from 'yup'
import {Formik , Form , Field , ErrorMessage } from "formik";
import {useAuth} from "../../context/AuthContext";
import FileInput from "../../components/basic/input/FileInput";
import Header from "../../components/basic/Header";
import AppInput from "../../components/basic/input/AppInput";
import Button from "../../components/basic/button/Button";
import FileUploader from "../../components/basic/input/FileUploader";
import TeachingMaterialsUpload from '../../components/teaching-materials-upload';

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

            <TeachingMaterialsUpload />
        </div>
    );
};

export default SubmitTeachingMaterial