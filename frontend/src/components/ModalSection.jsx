import React from 'react'
import { X} from "lucide-react";
import {useNavigate} from "react-router-dom";

const ModalSection =({children})=>{
    const navigator = useNavigate()

    return(
        <div className={`fixed p-3 top-0 right-0 w-full h-[100dvh] flex items-center justify-center bg-gray-400/50 backdrop-blur-[7px] shadow-xl z-50 
        `}>


            <button
                className={`absolute z-[70] top-6 right-9`}
                onClick={()=> navigator(-1)}
            >
                <X className={"text-gray-700 hover:text-gray-200 p-1 size-[35px] rounded-lg bg-gray-200 hover:bg-red-500 cursor-pointer"} />
            </button>

            <section className={"relative w-[500px] bg-white-color shadow-xl rounded-lg dark:bg-deep_blue_black p-6"}>
                {children}
            </section>
        </div>
    )
}

export default ModalSection