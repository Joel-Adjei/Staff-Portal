import { Loader } from "lucide-react";
import React from "react";

const PortalLoading =({loading=false})=>{
    if (!loading) return null

    return(
        <div className={"w-full h-full flex flex-col gap-3 items-center justify-center"}>
            <p className="text-gray-600 dark:text-blue-400 text-xl ">Please wait</p>
            <Loader className="animate-spin text-orange-500 dark:text-blue-300" size={50} />
        </div>
    )
}

export default PortalLoading

export const ProcessIndicator = ({label})=>{
    return (
    <div className="flex gap-2">
        {/* <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div> */}
        <Loader className="animate-spin text-orange-500 dark:text-blue-100" size={25} />
         {label}
    </div>
    )
}