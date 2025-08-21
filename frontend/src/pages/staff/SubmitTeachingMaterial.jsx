import React, {useState} from 'react';
import {BookText} from 'lucide-react'
import {useAuth} from "../../context/AuthContext";
import Header from "../../components/basic/Header";
import TeachingMaterialsUpload from '../../components/teaching-materials-upload';

const SubmitTeachingMaterial = () => {
    const { user } = useAuth();

    return (
        <div className="p-6 pt-0 ">
            <Header title={"Submit Teaching Materials (PDF)"}  Icon={BookText}/>

            <TeachingMaterialsUpload />
        </div>
    );
};

export default SubmitTeachingMaterial