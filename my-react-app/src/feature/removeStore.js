import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ReMoveStore = (key,timeNotify,timeRemove) =>{

    const notify_error = (text,time) => toast.warn(text, {

        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });

    if(localStorage.getItem(key)){

        notify_error(localStorage.getItem(key),timeNotify);

        setTimeout(()=>{

            localStorage.removeItem(key);

        }, timeRemove);
    }
}

export const ReMoveStoreSuccess = (key,timeNotify,timeRemove) =>{

    const notifySuccess= (text,time) => toast.success(text, {

        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });

    if(localStorage.getItem(key)){

        notifySuccess(localStorage.getItem(key),timeNotify);

        setTimeout(()=>{

            localStorage.removeItem(key);

        }, timeRemove);
    }
}