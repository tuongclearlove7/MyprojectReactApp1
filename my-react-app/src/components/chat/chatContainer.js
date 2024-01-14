import React, {useContext, useEffect, useRef, useState} from "react";
import Chat from "./chat";
import io from 'socket.io-client';
import {Routes, Route, useNavigate, Link, useLocation} from 'react-router-dom';
import {roomNameData} from "../../model/roomNameData";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderEffect from "../../feature/renderEffect";
import Swal from "sweetalert2";
import StatusLogin from "../../feature/statusLogin";
import logo from "../../logo.svg";
import {UserContext} from "../../feature/userContext";
import styles from "../auth/loginStyle.module.css";
import {connect} from "react-redux";

function ChatContainer(props) {

    const [socket, setSocket] = useState(null);
    useEffect(() => {

        const isSocket = props.dataReduxStore[0]?.socket;

        if (isSocket) {

            setSocket(isSocket);
        }

    }, [props.dataReduxStore]);
    const {setTitlePage, OnLocalStorage} = useContext(UserContext);
    const [loadingPage, setLoadingPage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const socketRef = useRef({
        on: () => {
        }, off: () => {
        }
    });
    const navigate = useNavigate();
    const location = useLocation();
    const notify = (text) => toast.error(text, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const notifyWelcome = () => toast.info(`Xin chào, chào mừng bạn đến với trang chủ của WEB-CHAT.\nChúc bạn có trải nghiệm tốt nhất với website của tôi`, {
        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const text = RenderEffect("Hãy nhập tên và chọn phòng!", 50);

    useEffect(() => {

        if (socket) {

            socket.on('connect_error', (error) => {

                console.error('Connection error:', error.message);
            });

            socket.on('connect', () => {

                console.log("Socket connected");
            });
        }

        setTitlePage(props.title);

        if (location.pathname === '/chat') {

            notifyWelcome();
        }

    }, [props.title, location.pathname, socket]);


    useEffect(() => {

        if (socket) {

            const handleUser = function (data) {

                console.log(data);
            };

            socketRef.current.on(process.env.REACT_APP_JOIN_ROOM, handleUser);

            return () => {

                socketRef.current.off(process.env.REACT_APP_JOIN_ROOM, handleUser);
            };
        }

    }, [socket]);


    useEffect(() => {


        onLoading().then(r => r);

    }, []);

    const onLoading = async () => {

        setLoadingPage(true);

        const wait = async () => {

            await new Promise(resolve => setTimeout(resolve, 1000));
        }

        await OnLocalStorage("get", "onLoading", "", "data");
        await OnLocalStorage("remove", "onLoading", "", "data", wait);

        setLoadingPage(false);

    };

    const joinRoom = async () => {

        const invalid = /[@.!#$%^&*()_+=[\]{};'`:"\\|,<>/?]/;
        const space = 2;
        const spaceLimited = new RegExp(`\\s{${space},}`);
        const characters = username.split('');
        const num_char_limited = 16;
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if (!username || !room) {

            notify('Vui lòng nhập vào tên của bạn và chọn phòng!');

        } else if (invalid.test(username) || invalid.test(room)) {

            notify('Vui lòng nhập không nhập vào ký tự!');

        } else if (spaceLimited.test(username) || spaceLimited.test(room)) {

            notify(`Vui lòng nhập vào tên không được phép cách quá ${space - 1} khoảng trắng!`);

        } else {

            if (characters.length > num_char_limited) {

                notify(`Vui lòng nhập vào tên dưới ${num_char_limited} ký tự!`);

            } else {

                if (room === "Chọn phòng") {

                    notify('Vui lòng nhập chọn phòng!');

                } else {

                    if (username === " ") {

                        notify('Vui lòng nhập vào!');

                    } else {

                        if (!socket.connected) {

                            notify("Lỗi xác thực!");

                        } else {

                            socket.emit(process.env.REACT_APP_JOIN_ROOM, {room, username});
                            props.setU(username);
                            props.setR(room);
                            props.setShowChat(true);
                        }
                    }
                }
            }
        }
        setLoading(false);
    }

    return (
        <div>
            {loadingPage ? (
                <div className={"load-logo-center"}>
                    <img src={logo} className="loading-logo-account" alt="logo"/>
                </div>
            ) : (
                <div>

                    {!props.showChat ? (
                        <div className="joinChatContainer">
                            <h4 className={`render`}>
                                {text}
                            </h4>
                            <input type="text" placeholder="Nhập tên của bạn..."
                                   onChange={(event) => {
                                       setUsername(event.target.value);
                                   }}/>
                            <select
                                className="form-select"
                                aria-label="Default select example"
                                onChange={(event) => {
                                    setRoom(event.target.value);
                                }}>
                                <option selected>Chọn phòng</option>
                                {roomNameData.map((item, index) => {
                                    if ('room' in item) {
                                        return item.room.map((roomName, roomIndex) => (
                                            <option key={`${index}-${roomIndex}`} value={roomName}>
                                                {roomName}
                                            </option>
                                        ));
                                    }
                                    return null;
                                })}
                            </select>
                            <button onClick={joinRoom}>
                        <span>
                            VÀO PHÒNG
                        </span>
                                {loading && (
                                    <span>
                                          <img src={logo} className="App-loading-logo" alt="logo"/>
                                    </span>
                                )}
                            </button>
                        </div>
                    ) : (
                        <div className="chat-container">
                            <Chat socket={socket}
                              username={username}
                              room={room}
                              setShowChat={props.setShowChat}
                              title={props.title}
                              setRoom={setRoom}
                              setUsername={setUsername}
                            />
                        </div>
                    )}
                </div>
            )}
            <ToastContainer/>
        </div>
    );
}

const mapStateToProps = (state) => {

    return {

        dataReduxStore: state.data,
    }
}

export default connect(mapStateToProps)(ChatContainer);
