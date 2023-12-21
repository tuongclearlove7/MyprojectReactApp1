import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {UserContext} from "./UserContext";

function StatusLogin(props){

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const {GetStatusLogin , logout} = useContext(UserContext);
    const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/login`;

    useEffect(() => {

        const env = `${process.env.REACT_APP_AUTH_METHOD} ${token}`;
        GetStatusLogin(url, env, ()=>{

            localStorage.setItem("notify","Hết hạn đăng nhập. Vui lòng đăng nhập lại!!!");
            logout();
            window.location="/login"

        }).then();
    }, [url, token]);

    return <></>;
}

export default StatusLogin;