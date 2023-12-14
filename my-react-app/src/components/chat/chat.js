import React, {useEffect, useState} from 'react';
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, room}){

    const [currentMsg, setCurrentMsg] = useState("");
    const [messageList, setMessageList] = useState([]);

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
    
    useEffect(function () {

        socket.on("receive_message", function (data) {

            setMessageList((list)=> [...list, data])
        })
    }, [socket]);

    return (

        <div className="chat-window">
            <b>Live Chat</b>
            <div className="chat-header">
                <div style={
                    {
                        padding:"10px",
                        float:"right",
                    }
                }>
                    <a style={
                        {
                            color: "white",
                            textDecoration:"none"
                        }
                    } href="/">Leave room</a>
                </div>
            </div>
            <div className="chat-content">
                <ScrollToBottom className="message-container">
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
        </div>
    );
}

export default Chat;