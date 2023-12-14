import React, { useEffect, useState, useRef } from 'react';
import { Routes, Route, useNavigate ,Link} from 'react-router-dom';
import ScrollToBottom from "react-scroll-to-bottom";
import Home from "../home/home";
import ChatContainer from "./chatContainer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Chat({socket, username, room, onLeaveRoom, title, setRoom, setUsername}){

    const [currentMsg, setCurrentMsg] = useState("");
    const [messageList, setMessageList] = useState([]);
    const navigate = useNavigate();
    const socketRef = useRef(socket);
    const notify = () => toast.success(`Xin chào, chào mừng ${username} đến với phòng ${room}`, {

        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

    });

    const leaveRoom = () => {

        navigate('/');
        onLeaveRoom();
        setRoom("");
        setUsername("");
    };

    useEffect(() => {

        console.log(title);
        navigate('/chat');
        document.title = title;

    }, [title]);

    useEffect(() => {

        if(username !== "" && room !== ""){

            notify();

        }else{

            leaveRoom();
        }
    }, []);

    useEffect(() => {

        socketRef.current = socket;

    }, [socket]);

    useEffect(() => {

        const handleReceiveMessage = function (data) {

            console.log(data);
            setMessageList((list) => [...list, data]);
        };

        socketRef.current.on("receive_message", handleReceiveMessage);

        return () => {

            socketRef.current.off("receive_message", handleReceiveMessage);
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

            console.log(messageData);

            await socket.emit("send_message", messageData);
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
                    <span style={{color:"white"}} id="room">{room}</span>
                </div>
                <div style={{padding:"10px", float:"right",}}>
                    <span
                        style={{ color: 'white', cursor: 'pointer' }}
                        onClick={leaveRoom}>
                        Rời phòng
                    </span>
                </div>
            </div>
            <div className="chat-content">
                <ScrollToBottom className="message-container">
                    <div className="user-join" id={username ? "you" : "other"}>
                        <div className="message-meta">
                            <p id="user">Người dùng {username}</p>
                        </div>
                    </div>
                    {messageList.map((messageContent)=>{
                        return (
                            <div className="message" id={username=== messageContent.author ? "you" : "other"}>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>

                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{messageContent.author}</p>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div className="chat-footer">
                <input type="text"
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