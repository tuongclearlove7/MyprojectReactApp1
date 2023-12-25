import HeaderAccount from "./header/header";
import React, {useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import axios from "axios";
import StatusLogin from "../../feature/statusLogin";
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import ChatContainer from "../chat/chatContainer";
import Home from "../home/home";
import Company from "../company/company";
import Blog from "../blog/blog";
import Contact from "../contact/contact";
import Login from "../auth/login";
import Register from "../auth/register";
import ChatAccount from "./chat/chatAccount";
import Info from "./info/info";
import DashBoard from "./dashboard/dashboard";
import {UserContext} from "../../feature/userContext";
import styles from "../auth/loginStyle.module.css";
import logo from "../../logo.svg";
import loading_img from "../../loading.gif";

const Account = (props) => {

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [renderMyUser, setRenderMyUser] = React.useState({username:null, status: false});
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const { logout } = useContext(UserContext);
    const { ExpiredLogin,OnLocalStorage, HandleLoading, setTitlePage, myUser } = useContext(UserContext);
    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const timer = 61000;


    useEffect(() => {

        const intervalId = setInterval(() => {

            setCountdown(prevCountdown => {

                return prevCountdown + 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {

        if(!username){

            setTitlePage(props.title);
            setRenderMyUser({
                username ,
                status: false,
            });

        }else{

            setRenderMyUser({
                username:myUser.username,
                status: true,
            });
            setTitlePage(`Tài khoản ${username}`);
        }
    }, [props.token, username]);

    useEffect(() => {

        onLoading().then(r => r);
        countDownLogin().then();

    }, []);

    const countDownLogin = async ()=>{

        if(myUser.auth !== true){

            if(localStorage.getItem("onLogin")){

                const wait = async () => {

                    const interval = 1000;

                    for (let i = 0; i < timer / interval; i++) {

                        await new Promise(resolve => setTimeout(resolve, interval));
                        const countdown = (i + 1) * interval / 1000;
                        console.log(`wait ${countdown}s`);
                    }

                    localStorage.setItem("notify","Hết hạn đăng nhập. Vui lòng đăng nhập lại!!!");
                    logout();
                    navigate("/login");
                }

                await OnLocalStorage("remove", "onLogin", "", "data", wait);
            }
        }
    }

    const onLoading = async () => {

        const wait = async () => {

            const timer = 1000;
            const interval = 1000;

            for (let i = 0; i < timer / interval; i++) {
                await new Promise(resolve => setTimeout(resolve, interval));
                console.log(`wait ${(i + 1) * interval / 1000}s`);
            }
        }

        setLoading(true);
        const data = await OnLocalStorage("get", "onLoading", "", "data");
        console.log("LocalStorage data: ", data);
        await OnLocalStorage("remove", "onLoading", "", "data", wait);
        setLoading(false);

    };

    const handleLogout = () => {

        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

        if(confirmLogout){

            OnLocalStorage("remove", "onLogin", "", "data");
            logout();
            window.location="/login"
        }
    };

    return (
        <div className={"account-container"}>
            {!myUser.auth && (
            <div>
                {loading ? (
                    <div className={"load-logo-center"}>
                        <img src={logo} className="loading-logo-account" alt="logo" />
                    </div>
                ) : (
                    <>{!renderMyUser.username && (
                        <div className={"has-not-user"}>
                            <Link onClick={() => HandleLoading("/login", setLoadingLogin, 1000)}>
                                <span>Vui lòng đăng nhập vào tài khoản!</span>
                                {loadingLogin && (
                                <span id={styles.rou_logo}>
                                  <img src={loading_img} className="loading-logo" alt="logo"/>
                                </span>)
                                }
                            </Link>
                        </div>
                        )}
                    </>
                    )
                }
            </div>)
            }
            {myUser.auth && (
                <div className={"account"}>
                    <StatusLogin />
                    <HeaderAccount username={username} handleLogout={handleLogout} />
                    <h1 id={"countdown"}>
                        <div className={"App-link"}>
                             <span>
                                Bạn sẽ hết hạn đăng nhập sau {timer/1000} giây
                             </span>
                             <span className={countdown < 50 ? "countdown-after" : "countdown-before"}>
                                {countdown}
                             </span>
                             <span>
                                s
                             </span>
                        </div>
                    </h1>
                    <div className="account-container">
                        <Routes>
                            <Route index element={<DashBoard />} />
                            <Route path="/chat" element={
                                <ChatAccount socket_url={process.env.REACT_APP_API_LOCALHOST}
                                setU={props.setU}
                                setR={props.setR}
                                socket={props.socket}
                                showChat={props.showChat}
                                setShowChat={props.setShowChat}/>}
                            />
                            <Route path="/info" element={<Info email={email} username={username} />} />
                        </Routes>
                    </div>
                </div>
            )}
        </div>
    );
};


export default Account;
