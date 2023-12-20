import React, {useContext, useEffect, useRef, useState} from "react";
import Chat from "./chat";
import io from 'socket.io-client';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { roomNameData } from "../../model/roomNameData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderEffect from "../../feature/renderEffect";
import Swal from "sweetalert2";
import StatusLogin from "../../feature/statusLogin";
import logo from "../../logo.svg";
import {UserContext} from "../../feature/UserContext";


function ChatContainer(props) {

    const { RedirectAccount, setTitlePage } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const socketRef = useRef(props.socket);
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
    const notifyWelcome = () => toast.info(`Xin chào, chào mừng bạn đến với trang chủ của WEB-CHAT.\n
    Chúc bạn có trải nghiệm tốt nhất với website của tôi`, {

        position: "top-center",
        autoClose: 900,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });

    useEffect(() => {

        RedirectAccount();
        setTitlePage(props.title);
        notifyWelcome();

    }, [props.title]);

    useEffect(() => {

        const handleUser = function (data) {

            console.log(data);
        };

        socketRef.current.on(process.env.REACT_APP_JOIN_ROOM, handleUser);

        return () => {

            socketRef.current.off(process.env.REACT_APP_JOIN_ROOM, handleUser);
        };
    }, []);


    const text = RenderEffect("Hãy nhập tên và chọn phòng!");

    const joinRoom = function () {

        const invalid = /[@.!#$%^&*()_+=[\]{};'`:"\\|,<>/?]/;
        const space = 2;
        const spaceLimited = new RegExp(`\\s{${space},}`);
        const characters = username.split('');
        const num_char_limited = 16;

        if (!username || !room) {

            notify('Vui lòng nhập vào tên của bạn và chọn phòng!');

        } else if (invalid.test(username) || invalid.test(room)) {

            notify('Vui lòng nhập không nhập vào ký tự!');

        } else if (spaceLimited.test(username) || spaceLimited.test(room)) {

            notify(`Vui lòng nhập vào tên không được phép cách quá ${space-1} khoảng trắng!`);

        } else {

            if (characters.length > num_char_limited) {

                notify(`Vui lòng nhập vào tên dưới ${num_char_limited} ký tự!`);

            } else {

                if(room === "Chọn phòng"){

                    notify('Vui lòng nhập chọn phòng!');

                }else{

                    if(username === " "){

                        notify('Vui lòng nhập vào!');

                    }else {

                        if (!props.socket.connected) {

                            notify("Lỗi xác thực!");

                        }else{

                            props.socket.emit(process.env.REACT_APP_JOIN_ROOM, {room, username});
                            props.setU(username);
                            props.setR(room);
                            props.setShowChat(true);
                        }
                    }
                }
            }
        }
    }

    return (
        <div>
            {!props.showChat ? (
                <div className="joinChatContainer">
                    <h4 className={`render`}>
                        {text}
                    </h4>
                    <header>
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
                    <input
                        type="text"
                        placeholder="Nhập tên của bạn..."
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
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
                    <button onClick={joinRoom}>VÀO PHÒNG</button>
                </div>
                ) : (
                    <div className="chat-container">
                        <Chat socket={props.socket}
                            username={username}
                            room={room}
                            setShowChat={props.setShowChat}
                            title={props.title}
                            setRoom={setRoom}
                            setUsername={setUsername}
                        />
                    </div>
                )}
            <ToastContainer />
        </div>
    );
}

export default ChatContainer;
