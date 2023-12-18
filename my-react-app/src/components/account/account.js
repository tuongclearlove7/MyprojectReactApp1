import HeaderAccount from "./header/header";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import StatusLogin from "../../feature/statusLogin";

const Account = (props) => {

    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const token = Cookies.get('token');
    const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/login`;

    useEffect(() => {

        document.title = `Tài khoản ${username}`;
    }, [props.token, username]);

    useEffect(() => {

        props.setShowHeader(false);
        return () => props.setShowHeader(true);

    }, [props.setShowHeader]);


    const handleLogout = () => {

        Cookies.remove('token');
        Cookies.remove('username');
        Cookies.remove('email');
        localStorage.removeItem("username");
        window.location = "/login";
    };

    return (
        <div>
            <StatusLogin/>
            <HeaderAccount username={username} handleLogout={handleLogout} />
            <div className="account-container">

            </div>
        </div>
    );
};

export default Account;
