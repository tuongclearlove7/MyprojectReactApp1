import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function StatusLogin(props){

    const notifyErr = (text,time) => toast.error(text, {

        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });

    const token = Cookies.get('token');
    const url = `${process.env.REACT_APP_API_LOCALHOST}auth-api/login`;

    const handleLogout = () => {

        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('email');
        localStorage.removeItem("username");
        window.location = "/login";
    };

    useEffect(() => {

        const fetchData = async () => {

            try {
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `${process.env.REACT_APP_AUTH_METHOD} ${token}`,
                    },
                });

                console.log(response);

            } catch (error) {

                console.error("Error fetching data:", error);

                if (error.response && error.response.status >= 401) {

                    localStorage.setItem("notify","Hết hạn đăng nhập. Vui lòng đăng nhập lại!!!");
                    handleLogout();
                }
            }
        };

        fetchData().then(r => console.log(r));

    }, [url, token]);

    return(
        <></>
    );
}

export default StatusLogin;