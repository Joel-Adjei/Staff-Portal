import React from "react";

const PortalLoading =()=>{
    return(
        <div className={"w-full h-[100dvh] flex flex-col gap-3 items-center justify-center"}>
            Please wait
            <div className={"size-[30px] bg-orange-color animate-bounce rounded-full"}></div>
        </div>
    )
}

export default PortalLoading