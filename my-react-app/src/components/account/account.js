import HeaderAccount from "./header/header";
import React, {useContext, useEffect, useRef, useState} from "react";
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
import ListUser from "./admin/ListUser";
import {connect} from "react-redux";


const Account = (props) => {

    const [renderMyUser, setRenderMyUser] = React.useState({username: null, status: false});
    const {OnLocalStorage, HandleLoading, setTitlePage, myUser} = useContext(UserContext);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [room, setRoom] = useState("");
    const {logout, ExpiredLogin, socket} = useContext(UserContext);
    const username = Cookies.get('username');
    const email = Cookies.get('email');
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const timer = 61000000;


    useEffect(() => {

        if (!username) {

            setTitlePage(props.title);
            setRenderMyUser({
                username,
                status: false,
            });

        } else {

            console.log(myUser);
            setRenderMyUser({
                username: myUser.username,
                status: true,
            });

            if (socket) {
                socket.emit('user_login', email);
            }
            setTitlePage(`Tài khoản ${username}`);
        }
    }, [props.token, username, myUser, socket]);

    useEffect(() => {
        const handleDataListUser = (data) => {

        };

        socket.on("send_data_list_user", handleDataListUser);

        return () => {
            socket.off("send_data_list_user", handleDataListUser);
        };
    }, [socket]);

    useEffect(() => {

        onLoading().then(r => r);
        countDownLogin().then();

    }, []);

    const countDownLogin = async () => {

        if (username) {

            const wait = async () => {

                const interval = 1000;

                for (let i = 0; i < timer / interval; i++) {

                    const data = (i + 1) * interval / 1000;
                    OnLocalStorage("set", "countdown", data, "data");
                    await new Promise(resolve => setTimeout(resolve, interval));
                }

                ExpiredLogin();
            }
            await OnLocalStorage("remove", "onLogin", "", "data", wait);
        }
    }

    const onLoading = async () => {

        const wait = async () => {

            if (!username) {

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
        await OnLocalStorage("get", "onLoading", "", "data");
        await OnLocalStorage("remove", "onLoading", "", "data", object_function);
        setLoading(false);

    };

    const handleLogout = () => {

        const confirmLogout = window.confirm('Bạn có chắc chắn muốn đăng xuất?');

        if (confirmLogout) {

            socket.emit('user_login_leave_room', {room: 'global', email: email});
            logout();
            window.location = "/login"
        }
    };

    return (
        <div className={"account-container"}>
            {!myUser.auth && (
                <div>
                {loading ? (
                    <div className={"load-logo-center"}>
                        <img src={logo} className="loading-logo-account" alt="logo"/>
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
                )}
            </div>)
            }
            {myUser.auth && (
                <div className={"account"}>
                    <StatusLogin/>
                    <HeaderAccount room={room} username={username} handleLogout={handleLogout}/>
                    <div className="account-container">
                        <Routes>
                            <Route index element={<DashBoard timer={timer} />} />
                            <Route path="/list-user" element={<ListUser/>} />
                            <Route path="/info" element={<Info email={email} username={username} />} />
                            <Route path="/chat" element={
                                <ChatAccount
                                    setRoom={setRoom}
                                    socket_url={process.env.REACT_APP_API_LOCALHOST}
                                    setU={props.setU}
                                    setR={props.setR}
                                    socket={props.socket}
                                    showChat={props.showChat}
                                    setShowChat={props.setShowChat}
                                />}
                            />
                        </Routes>

                    </div>
                </div>
            )}
        </div>
    );
};



export default Account;
