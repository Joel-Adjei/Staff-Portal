import React from "react";

// --- Reusable Header Component ---
const Header = ({ Icon, title, className = ''}) => {
    return (
        <div className={"w-full mb-3"}>
            <div className={"flex items-center gap-2"}>
                <h3 className={"text-xl font-semibold dark:text-blue-200 text-blue-950"}>{title}</h3>
                <Icon className={"p-2 size-10 bg-orange-600 text-white rounded-xl"} />
            </div>

            <div className={"w-full h-[1.3px] bg-blue-200 dark:bg-blue-300 mt-2"}></div>
        </div>
    )
};

export default Header