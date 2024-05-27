import React, {useContext, useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";
import {UserContext} from "./userContext";

function StatusLogin(props){

    const navigate = useNavigate();
    const token = Cookies.get('token');
    const {GetStatusLogin , logout, ExpiredLogin} = useContext(UserContext);
    const url = `${process.env.REACT_APP_API_HOSTNAME}/auth-api/account`;

    useEffect(() => {

        const env = `${process.env.REACT_APP_AUTH_METHOD} ${token}`;
        GetStatusLogin(url, env, ExpiredLogin).then();

    }, [url, token]);

    return <></>;
}

export default StatusLogin;