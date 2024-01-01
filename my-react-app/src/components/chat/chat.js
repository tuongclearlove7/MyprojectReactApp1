import React, {useEffect, useState, useRef, useContext} from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import Home from "../home/home";
import ChatContainer from "./chatContainer";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {Reconnect} from "../../feature/reconntect";
import logo from "../../logo.svg";
import chatNowImg from "../../typing.gif";
import {roomNameData} from "../../model/roomNameData";
import {UserContext} from "../../feature/userContext";


function Chat({socket, username, room, setShowChat, title, setRoom, setUsername}) {

    const [currentMsg, setCurrentMsg] = useState("");
    const [userList, setUserList] = useState([]);
    const [statusMsgChatNow, setStatusMsgChatNow] = useState(false);
    const [msgChatNow, setMsgChatNow] = useState("");
    const [messageList, setMessageList] = useState([]);
    const [userJoinRoomList, setUserJoinRoomList] = useState([]);
    const [userLeaveRoomList, setUserLeaveRoomList] = useState([]);
    const prevRoom = useRef(room);
    const prevUsername = useRef(username);
    const navigate = useNavigate();
    const socketRef = useRef(socket);


    useEffect(() => {

        socketRef.current = socket;

    }, [socket]);

    useEffect(() => {

        const handleUserJoin = function (data) {

            setUserJoinRoomList((list) => [...list, data]);
        };

        socketRef.current.on("user_join_room", handleUserJoin);

        return () => {

            socketRef.current.off("user_join_room", handleUserJoin);
        };
    }, []);

    useEffect(() => {

        if (username !== "" && room !== "") {

            Swal.fire({
                title: `Xin chào ${username}`,
                text: `Chào mừng bạn đến với phòng ${room} tại WEB-CHAT`,
                icon: 'success'
            }).then((result) => {

                if (result.isConfirmed) {

                    console.log('Button was clicked');
                }
            }).catch((error) => {

                console.log(error);
            });

        } else {

            leaveRoom().then(r => r);
        }
    }, []);

    useEffect(() => {

        socket.on(process.env.REACT_APP_ROOM_USERS, (data) => {

            setUserList(data.users)
        });
    }, []);

    useEffect(() => {

        socket.on("user_guest_chat_now", async (data) => {

            setStatusMsgChatNow(data.status);
            setMsgChatNow(data.message);
            await new Promise(resolve => setTimeout(resolve, 10000));
            setStatusMsgChatNow(false);
        });
    }, []);


    useEffect(() => {

        const handleReceiveMessage = function (data) {

            console.log(data);
            setMessageList((list) => [...list, data]);
        };

        socketRef.current.on(process.env.REACT_APP_RECEIVE_MESSAGE, handleReceiveMessage);

        return () => {

            socketRef.current.off(process.env.REACT_APP_RECEIVE_MESSAGE, handleReceiveMessage);
        };
    }, []);


    useEffect(() => {

        socket.on(process.env.REACT_APP_USER_LEFT_ROOM, (data) => {

            setUserLeaveRoomList((list) => [...list, data]);

        });

        return () => {

            socket.off(process.env.REACT_APP_USER_LEFT_ROOM);
        };
    }, []);

    const leaveRoom = async () => {

        socket.emit(process.env.REACT_APP_LEAVE_ROOM, {room, username});
        navigate('/');
        setShowChat(false);
        setRoom("");
        setUsername("");
        socket.disconnect();
        await Reconnect(socket);

    };

    const confirmLeaveRoom = (f) => {

        const confirm = window.confirm("Hỏi lại lần cuối bạn có muốn rời khỏi phòng không?");

        if (confirm) {

            (async () => {

                socket.emit(process.env.REACT_APP_LEAVE_ROOM, {room, username});
                navigate('/');
                setShowChat(false);
                setRoom("");
                setUsername("");
                socket.disconnect();
                await Reconnect(socket);
            })();
        }
    }

    const chatNow = async (event) => {

        const msgNow = event.target.value;
        setCurrentMsg(msgNow);

        const data_chat_now = {

            room: room,
            author: username,
            message: msgNow,
            time: new Date(Date.now()).getHours() +
                ":" + new Date(Date.now()).getMinutes(),
        }

        await socket.emit("user_chat_now", data_chat_now);
    }

    const sendMessage = async () => {

        if (currentMsg !== "") {

            const messageData = {

                room: room,
                author: username,
                message: currentMsg,
                time: new Date(Date.now()).getHours() +
                    ":" + new Date(Date.now()).getMinutes(),
            }

            await socket.emit(process.env.REACT_APP_SEND_MESSAGE, messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMsg("");
        }
    }

    return (
        <div className="chat-window">
            <b>Nhắn tin ngay</b>
            <div className="chat-header">
                <div style={{padding: "10px", float: "left"}}>
                    <b style={{color: "black"}}>Phòng: </b>
                    <span style={{color: "black"}} id="room">
                     {room}
                    </span>
                </div>
                <div style={{margin: "2.5px", float: "right",}}>
                    <button className={"btn btn-danger"} style={{cursor: 'pointer'}}
                            onClick={confirmLeaveRoom}>
                        Rời phòng
                    </button>
                </div>
            </div>
            <div className="chat-content">
                <ScrollToBottom className="message-container">
                    <div className="user-join" id={username ? "you" : "other"}>
                        <div className="message-meta">
                            <div className={"list-user"}>
                                <p id="user">Người dùng:</p>
                                <ul>
                                    {userList.length > 0 ? (
                                        userList.map((data) => (
                                            <li style={{color: "black", listStyle: "none"}} key={data.id}>
                                                <img src={logo} className="App-user-logo" alt="logo"/>
                                                {`${data.username} - đang online`}
                                            </li>
                                        ))) : (
                                        <div>
                                            <p>No users available</p>
                                        </div>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {userJoinRoomList.map((userJoinRoom, index) => (
                        <div key={index} className="message" id={"you"}>
                            <div className="message-content">
                                <p>{userJoinRoom.username} đã vào phòng</p>
                            </div>
                        </div>
                    ))}
                    {userLeaveRoomList.map((userLeaveRoom, index) => (
                        <div key={index} className="message" id={"you"}>
                            <div className="message-content">
                                <p>{userLeaveRoom.username} đã rời khỏi phòng</p>
                            </div>
                        </div>
                    ))}
                    {messageList.map((messageContent) => {
                        return (
                            <div>
                                <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                    <div className="message-content">
                                        <p>{messageContent.message}</p>
                                    </div>
                                    <div className="message-meta">
                                        <p id="time">{messageContent.time}</p>
                                        <p id="author">{messageContent.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {statusMsgChatNow === true ? (
                        <div className="message" id={"you"}>
                            <div className="message-chat-now">
                                <p style={{paddingRight: "10px"}}>{msgChatNow}</p>
                                <img width={"10%"} height={"10%"} src={chatNowImg} alt=""/>
                            </div>
                        </div>
                    ) : ""}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Hey..."
                    value={currentMsg}
                    onChange={chatNow}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
            <Routes>
                <Route path="/chat" element={<ChatContainer/>}/>
            </Routes>
        </div>
    );
}

export default Chat;