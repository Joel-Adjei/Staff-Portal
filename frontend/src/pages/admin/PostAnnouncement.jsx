import React, {useState} from "react";
import * as Yup from 'yup';
import {useAuth} from "../../context/AuthContext";
import {Megaphone} from 'lucide-react';
import {Formik,ErrorMessage , Form , Field} from "formik";
import {ToastContainer} from "../../Toast";
import useToast from "../../hooks/useToast";
import Header from "../../components/basic/Header";
import Button from "../../components/basic/button/Button";
import AppInput from "../../components/basic/input/AppInput";
import useFetch from "../../hooks/useFetch";
import usePageTile from "../../hooks/usePageTitle";

const PostAnnouncement = () => {
    const [message, setMessage] = useState({ text: '', type: '' });
    const { token } = useAuth();
    usePageTile("Post Announcement")
    const {fetchData , response} = useFetch({method: "POST" , endpoint: "/users/admin/announcement"})
    const {toasts, addToast, removeToast} = useToast()
   
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required').min(5, 'Title must be at least 5 characters'),
        content: Yup.string().required('Content is required').min(20, 'Content must be at least 20 characters'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setMessage({ text: '', type: '' });
        try {
            const payload = {
                "announcementTitle": values.title,
                "announcement": values.content,
            };

            await fetchData({payload , token : token.current})

            if(response.current.ok){
                const data = await response.current.json()
                console.log(data)
                addToast(data.message , "success")
                resetForm()
            }
            console.log(values)

        } catch (error) {
            console.error("Post announcement error:", error);
            setMessage({
                text: error.response?.data?.message || 'Failed to post announcement. Please try again.',
                type: 'error',
            });
            addToast("Error" , "error")
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="p-6">
            <Header title={"Post Announcement"} Icon={Megaphone} />

            <ToastContainer toasts={toasts} removeToast={removeToast} />

            <Formik
                initialValues={{ title: '', content: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                                Announcement Title
                            </label>
                            <AppInput
                                type="text"
                                id="title"
                                name="title"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Important Notice: School Holiday"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                                Announcement Content
                            </label>
                            <AppInput
                                as="textarea"
                                id="content"
                                name="content"
                                rows="5"
                                className="shadow border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type your announcement details here..."
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Posting...' : 'Post Announcement'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default PostAnnouncement;
