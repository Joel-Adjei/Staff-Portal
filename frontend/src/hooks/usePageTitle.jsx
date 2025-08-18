import {useEffect} from "react";

const usePageTile =(title = "Staff Portal")=>{
    useEffect(()=>{
        document.title = title;
    },[title])
}

export default usePageTile;