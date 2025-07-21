import React from "react";
import {X} from "lucide-react";
import {useNavigate} from "react-router-dom";

const AppModal = ({text, onYes, onCancel})=>{

    return(
        <div className={`fixed p-3 top-0 right-0 w-full h-[100dvh] flex items-center justify-center bg-gray-400/20 backdrop-blur-[2px] shadow-xl z-50 
        `}>


            <section className={"max-w-[450px] bg-white-color rounded-lg dark:bg-deep_blue_black p-6"}>
                <h4 className={`text-xl text-gray-600 dark:text-200 dark:text-blue-100`}>
                    {text}
                </h4>

                <div className={`flex w-full justify-end mt-5 gap-2`}>
                    <button
                        className={`px-4 py-2 text-sm font-semibold rounded-md bg-orange-600 text-gray-50`}
                        onClick={onYes}
                    >
                        Yes
                    </button>

                    <button
                        className={`px-4 py-2 text-sm font-semibold rounded-md bg-red-600 text-gray-50 hover:bg-red-700 active:bg-red-500`}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </section>
        </div>
    )
}

export default AppModal;