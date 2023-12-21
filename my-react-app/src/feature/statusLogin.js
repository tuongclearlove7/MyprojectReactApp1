import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";

function StatusLogin(props){

    const navigate = useNavigate();
    const { logout } = useContext(UserContext);
    const token = Cookies.get('token');
    const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/login`;

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
                    logout();
                    window.location="/login";
                }
            }
        };

        fetchData().then(r => console.log(r));

    }, [url, token]);

    return <></>;
}

export default StatusLogin;