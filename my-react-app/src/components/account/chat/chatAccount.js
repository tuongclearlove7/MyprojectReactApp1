import React, {useEffect, useRef, useState} from "react";
import Chat from "./chat";
import io from 'socket.io-client';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { roomNameData } from "../../../model/roomNameData";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderEffect from "../../../feature/renderEffect";
import Swal from "sweetalert2";
import StatusLogin from "../../../feature/statusLogin";
import Cookies from "js-cookie";
import {Reconnect} from "../../../feature/reconntect";
import logo from "../../../logo.svg";
const socket = io.connect(process.env.REACT_APP_API_HOSTNAME, {
    extraHeaders: {
        Authorization : `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
    },
});

function ChatAccount(props) {

    const [showChat, setShowChat] = useState(false);
    const username = Cookies.get('username');
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const socketRef = useRef(socket);
    const text = RenderEffect("Hãy nhập tên và chọn phòng!");

    useEffect(() => {

        const handleUser = function (data) {

            console.log(data);
        };

        socketRef.current.on(process.env.REACT_APP_JOIN_ROOM, handleUser);

        return () => {

            socketRef.current.off(process.env.REACT_APP_JOIN_ROOM, handleUser);
        };
    }, []);

    const joinRoom = function () {

        console.log({room,username})
        socket.emit(process.env.REACT_APP_JOIN_ROOM, {room, username});
        setShowChat(true);
    }

    return (
        <div>
            {!showChat ? (
                <div className="joinChatContainer">
                    <header className="App-chat-logo">
                        <img src={logo} className="App-logo" alt="logo" />
                    </header>
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
                    <Chat socket={socket}
                          username={username}
                          room={room}
                          setShowChat={setShowChat}
                          setRoom={setRoom}
                    />
                </div>
            )}
            <ToastContainer />
        </div>
    );
}

export default ChatAccount;
