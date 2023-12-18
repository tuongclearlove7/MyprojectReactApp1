import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate ,Link} from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import Home from "../home/home";
import ChatContainer from "./chatContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import {Reconnect} from "../../feature/reconntect";


function Chat({socket, username, room, setShowChat, title, setRoom, setUsername}){

    const [currentMsg, setCurrentMsg] = useState("");
    const [userList, setUserList] = useState([]);
    const [messageList, setMessageList] = useState([]);
    const [userJoinRoomList, setUserJoinRoomList] = useState([]);
    const [userLeaveRoomList, setUserLeaveRoomList] = useState([]);
    const navigate = useNavigate();
    const socketRef = useRef(socket);

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

    const leaveRoom = async () => {

        socket.emit(process.env.REACT_APP_LEAVE_ROOM, { room, username });
        navigate('/');
        setShowChat(false);
        setRoom("");
        setUsername("");
        socket.disconnect();
        await Reconnect(socket);

    };

    useEffect(() => {

        navigate('/chat');
        document.title = title;

    }, [title]);

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

        if(username !== "" && room !== ""){

            Swal.fire({
                title: `Xin chào ${username}`,
                text: `Chào mừng bạn đến với phòng ${room} tại WEB-CHAT`,
                icon: 'success'
            }).then((result) => {

                if (result.isConfirmed) {

                    console.log('Button was clicked');
                }
            }).catch((error)=>{

                console.log(error);
            });

        }else{

            leaveRoom().then(res => {

                console.log(res);

            }).catch(error=>{

                console.log(error)
            });
        }
    }, []);

    useEffect(() => {

        socket.on(process.env.REACT_APP_ROOM_USERS, (data) => {

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

        socket.on(process.env.REACT_APP_USER_LEFT_ROOM, (data) => {

            setUserLeaveRoomList((list) => [...list, data]);

        });

        return () => {

            socket.off(process.env.REACT_APP_USER_LEFT_ROOM);
        };
    }, []);

    const sendMessage = async ()=>{

        if(currentMsg !== ""){

            const messageData = {

                room : room,
                author : username,
                message : currentMsg,
                time : new Date(Date.now()).getHours() +
               ":" +   new Date(Date.now()).getMinutes(),
            }

            await socket.emit(process.env.REACT_APP_SEND_MESSAGE, messageData);
            setMessageList((list)=> [...list, messageData])
            setCurrentMsg("");
        }
    }

    return (

        <div className="chat-window">
            <b>Nhắn tin ngay</b>
            <div className="chat-header">
                <div style={{padding:"10px", float:"left"}}>
                    <b style={{color:"white"}}>Phòng: </b>
                    <span style={{color:"white"}} id="room">
                    {room}
                    </span>
                </div>
                <div style={{padding:"10px", float:"right",}}>
                    <span style={{ color: 'white', cursor: 'pointer' }}
                        onClick={leaveRoom}>
                        Rời phòng
                    </span>
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
                                            <li style={{ color: "white", listStyle: "none" }} key={data.id}>
                                                {data.username}
                                            </li>
                                        ))
                                    ) : (
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
                    {messageList.map((messageContent)=>{
                        return (
                        <div>
                            <div className="message" id={username=== messageContent.author ? "you" : "other"}>
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
                   onChange={function(event){
                       setCurrentMsg(event.target.value);
                   }}
                   onKeyPress={(event)=>{
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