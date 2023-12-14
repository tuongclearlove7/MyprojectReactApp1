import React, { useEffect, useState } from "react";
import Chat from "./chat";
import io from 'socket.io-client';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { roomNameData } from "../../model/roomNameData";
import { ToastContainer, toast } from 'react-toastify';
import RenderEffect from "../../feature/renderEffect";
import 'react-toastify/dist/ReactToastify.css';
const socket = io.connect("https://web-chat.up.railway.app/");

// const socket = io.connect("http://localhost:8000/");

// component
function ChatContainer(props) {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const navigate = useNavigate();
    const notify = () => toast.error('Vui lòng nhập vào tên của bạn và chọn phòng!', {

        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });


    useEffect(() => {

        console.log(props.title);
        document.title = props.title;

    }, [props.title]);

    const text = RenderEffect("Hãy nhập tên và chọn phòng!");

    const joinRoom = function () {

        if (username !== "" && room !== "") {

            socket.emit("join_room", room);
            props.setShowChat(true);

        }else{

            notify();
        }
    }

    const leaveRoom = function () {

        props.setShowChat(false);
        navigate('/');
    }

    return (
        <div>
            {!props.showChat ? (
                <div className="joinChatContainer">
                    <h4 className={`render`}>
                        {text}
                    </h4>
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
                        {roomNameData.map((roomName, index) => (
                            <option key={index} value={roomName}>
                                {roomName}
                            </option>
                        ))}
                    </select>
                    <button onClick={joinRoom}>VÀO PHÒNG</button>
                </div>
            ) : (
                <div className="chat-container">
                    <Chat
                        socket={socket}
                        username={username}
                        room={room}
                        onLeaveRoom={leaveRoom}
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
