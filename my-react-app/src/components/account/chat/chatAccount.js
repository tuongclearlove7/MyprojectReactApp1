import React, {useContext, useEffect, useRef, useState} from "react";
import Chat from "./chat";
import io from 'socket.io-client';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import {roomNameData} from "../../../model/roomNameData";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RenderEffect from "../../../feature/renderEffect";
import Swal from "sweetalert2";
import StatusLogin from "../../../feature/statusLogin";
import Cookies from "js-cookie";
import {Reconnect} from "../../../feature/reconntect";
import logo from "../../../logo.svg";
import {auth_name} from "../../../model/secrectName";
import {connect} from "react-redux";
import {UserContext} from "../../../feature/userContext";


function ChatAccount(props) {

    const [socket, setSocket] = useState(null);
    useEffect(() => {

        const isSocket = props.dataReduxStore[0]?.socket;

        if (isSocket) {

            setSocket(isSocket);
        }

    }, [props.dataReduxStore]);
    const navigate = useNavigate();
    const username = Cookies.get('username');
    const [room, setRoom] = useState("");
    const {OnLocalStorage} = useContext(UserContext);
    const [showChat, setShowChat] = useState(false);
    const text = RenderEffect("Hãy nhập tên và chọn phòng!");

    const joinRoom = function () {

        if (!room || room === "" || room === "Chọn phòng") {

            navigate("/account/chat");
            window.confirm("Vui lòng chọn phòng!");

        } else {

            props.setRoom(room);
            console.log({room, username})
            socket.emit(process.env.REACT_APP_JOIN_ROOM, {room, username});
            setShowChat(true);
        }
    }

    return (
        <div>
            {!showChat ? (
                <div className="joinChatContainer">
                    <header className="App-chat-logo">
                        <img src={logo} className="App-logo" alt="logo"/>
                    </header>
                    <select className="form-select" defaultValue="Chọn phòng"
                            aria-label="Default select example"
                            onChange={(event) => {
                                setRoom(event.target.value);
                            }}>
                        <option>Chọn phòng</option>
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
            <ToastContainer/>
        </div>
    );
}

const mapStateToProps = (state) => {

    return {

        dataReduxStore: state.data,
    }
}

export default connect(mapStateToProps)(ChatAccount);
