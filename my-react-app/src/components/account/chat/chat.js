import React, {useEffect, useState, useRef, useContext} from 'react';
import {Routes, Route, useNavigate, Link} from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {Reconnect} from "../../../feature/reconntect"
import logo from "../../../logo.svg";
import {UserContext} from "../../../feature/userContext";


function Chat(props) {

    const [userJoinRoomList, setUserJoinRoomList] = useState([]);
    const [userLeaveRoomList, setUserLeaveRoomList] = useState([]);
    const [currentMsg, setCurrentMsg] = useState("");
    const [userList, setUserList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const {OnLocalStorage} = useContext(UserContext);
    const socketRef = useRef(props.socket);
    const navigate = useNavigate();

    const notify = (text, time) => toast.success(text, {

        position: "top-center",
        autoClose: time,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });

    useEffect(() => {

        socketRef.current = props.socket;

    }, [props.socket]);

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

        if (props.username !== "" && props.room !== "") {

            Swal.fire({
                title: `Xin chào ${props.username}`,
                text: `Chào mừng bạn đến với phòng ${props.room} tại WEB-CHAT`,
                icon: 'success'
            }).then((result) => {

                if (result.isConfirmed) {

                    console.log('Button was clicked');
                }
            }).catch((error) => {

                console.log(error);
            });

        } else {

            leaveRoom().then(res => {

                console.log(res);

            }).catch(error => {

                console.log(error)
            });
        }
    }, []);

    useEffect(() => {

        props.socket.on(process.env.REACT_APP_ROOM_USERS, (data) => {

            setUserList(data.users)
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

        props.socket.on(process.env.REACT_APP_USER_LEFT_ROOM, (data) => {

            setUserLeaveRoomList((list) => [...list, data]);
        });

        return () => {

            props.socket.off(process.env.REACT_APP_USER_LEFT_ROOM);
        };
    }, []);

    const sendMessage = async () => {

        if (currentMsg !== "") {

            const messageData = {

                room: props.room,
                author: props.username,
                message: currentMsg,
                time: new Date(Date.now()).getHours() +
                    ":" + new Date(Date.now()).getMinutes(),
            }

            await props.socket.emit(process.env.REACT_APP_SEND_MESSAGE, messageData);
            setMessageList((list) => [...list, messageData])
            setCurrentMsg("");
        }
    }
    const leaveRoom = async () => {

        props.socket.emit(process.env.REACT_APP_LEAVE_ROOM, {room: props.room, username: props.username});
        navigate('/account/chat');
        props.setShowChat(false);
        props.setRoom("");
        props.socket.disconnect();
        await Reconnect(props.socket);
    };

    return (

        <div className="chat-window">
            <b>Nhắn tin ngay</b>
            <div className="chat-header">
                <div style={{padding: "10px", float: "left"}}>
                    <b style={{color: "black"}}>Phòng: </b>
                    <span style={{color: "black"}} id="room">
                    {props.room}
                    </span>
                </div>
                <div style={{margin: "2.5px", float: "right",}}>
                    <button className={"btn btn-danger"} style={{cursor: 'pointer'}}
                            onClick={leaveRoom}>
                        Rời phòng
                    </button>
                </div>
            </div>
            <div className="chat-content">
                <ScrollToBottom className="message-container">
                    <div className="user-join" id={props.username ? "you" : "other"}>
                        <div className="message-meta">
                            <div className={"list-user"}>
                                <p id="user">Người dùng:</p>
                                <ul>
                                    {userList.length > 0 ? (
                                        userList.map((data) => (
                                            <li style={{color: "black", listStyle: "none"}} key={data.id}>
                                                <img src={logo} className="App-user-logo" alt="logo"/>
                                                {`${data.username} - đang online`}
                                            </li>))) : (
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
                                <div className="message"
                                     id={props.username === messageContent.author ? "you" : "other"}>
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
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input
                    type="text"
                    placeholder="Hey..."
                    value={currentMsg}
                    onChange={function (event) {
                        setCurrentMsg(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>

        </div>
    );
}

export default Chat;