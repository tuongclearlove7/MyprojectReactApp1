import HeaderAccount from "./header/header";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import StatusLogin from "../../feature/statusLogin";
import { Routes, Route, useNavigate } from 'react-router-dom';
import ChatContainer from "../chat/chatContainer";
import Home from "../home/home";
import Company from "../company/company";
import Blog from "../youtube/blog";
import Contact from "../contact/contact";
import Login from "../auth/login";
import Register from "../auth/register";
import ChatAccount from "./chat/chatAccount";
import Info from "./info/info";
import DashBoard from "./dashboard/dashboard";

const Account = (props) => {

    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const token = Cookies.get('token');
    const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/login`;

    useEffect(() => {

        if(!username){

            document.title = `Account - TUONGCLEARLOVE7`;
        }

        document.title = `Tài khoản ${username}`;

    }, [props.token, username]);


    const handleLogout = () => {

        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

        if(confirmLogout){

            Cookies.remove('token');
            Cookies.remove('username');
            Cookies.remove('email');
            localStorage.removeItem("username");
            window.location = "/login";
        }
    };

    return (
        <div>
            <StatusLogin />
            <HeaderAccount username={username} handleLogout={handleLogout} />
            <div className="account-container">
                <Routes>
                    <Route index element={<DashBoard />}/>
                    <Route path="/chat"
                        element={<ChatAccount
                        socket_url={process.env.REACT_APP_API_LOCALHOST}
                        setU={props.setU} setR={props.setR}
                        socket={props.socket}
                        showChat={props.showChat}
                        setShowChat={props.setShowChat} />}
                    />
                    <Route path="/info" element={<Info email={email} username={username} />}/>
                </Routes>
            </div>
        </div>
    );
};

export default Account;
