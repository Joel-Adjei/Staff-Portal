import {useRef, useState} from "react";

const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return { toasts, addToast, removeToast };
};

export default useToast