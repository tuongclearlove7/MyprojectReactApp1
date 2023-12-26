import HeaderAccount from "./header/header";
import React, {useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import StatusLogin from "../../feature/statusLogin";
import {Link, Route, Routes, useNavigate} from 'react-router-dom';
import ChatAccount from "./chat/chatAccount";
import Info from "./info/info";
import DashBoard from "./dashboard/dashboard";
import {UserContext} from "../../feature/userContext";
import styles from "../auth/loginStyle.module.css";
import logo from "../../logo.svg";
import loading_img from "../../loading.gif";
import Count from "../../feature/count";

const Account = (props) => {

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [renderMyUser, setRenderMyUser] = React.useState({username:null, status: false});
    const [loading, setLoading] = useState(false);
    const { logout } = useContext(UserContext);
    const {OnLocalStorage, HandleLoading, setTitlePage, myUser } = useContext(UserContext);
    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const timer = 61000;

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

        if(username){

            const wait = async () => {

                const interval = 1000;

                for (let i = 0; i < timer / interval; i++) {

                    const data = (i + 1) * interval / 1000;
                    OnLocalStorage("set","countdown",data,"data");
                    await new Promise(resolve => setTimeout(resolve, interval));
                }

                await OnLocalStorage("remove", "countdown", "", "data");
                localStorage.setItem("notify","Hết hạn đăng nhập. Vui lòng đăng nhập lại!!!");
                logout();
                window.location="/login";
            }
            await OnLocalStorage("remove", "onLogin", "", "data", wait);
        }
    }

    const onLoading = async () => {

        const wait = async () => {

            if(!username){

                const timer = 1500;
                const interval = 1000;

                for (let i = 0; i < timer / interval; i++) {
                    await new Promise(resolve => setTimeout(resolve, interval));
                    console.log(`wait ${(i + 1) * interval / 1000}s`);
                }
            }
        }

        const object_function = [
            {
                "wait function": wait,
            }
        ];

        setLoading(true);
        const data = await OnLocalStorage("get", "onLoading", "", "data");
        console.log("LocalStorage data: ", data);
        await OnLocalStorage("remove", "onLoading", "", "data", object_function);
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
                    <Count timer={timer}/>
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
