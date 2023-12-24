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
    const [loading, setLoading] = useState(false);
    const [renderMyUser, setRenderMyUser] = React.useState({username:null, status: false});
    const { logout } = useContext(UserContext);
    const { RedirectAccount, OnLocalStorage, HandleLoading, setTitlePage, myUser } = useContext(UserContext);
    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const token = Cookies.get('token');

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

    }, []);

    const onLoading = async () => {

        setLoading(true);

        const wait = async () =>{

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const data = await OnLocalStorage("get", "onLoading", "", "data");
        console.log("LocalStorage data: ", data);
        await OnLocalStorage("remove", "onLoading", "", "data", wait);
        setLoading(false);

    };

    const handleLogout = () => {

        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

        if(confirmLogout){

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
