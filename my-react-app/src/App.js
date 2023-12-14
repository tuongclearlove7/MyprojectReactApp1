import './App.css';
import {youtubeData} from "./model/youtubeData";
import {tableData} from "./model/tableData";
import CompanyItem from "./components/company/companyItem";
import YoutubeItem from "./components/youtube/youtubeItem";
import Toggle from "./components/state/toggle";
import View from "./components/view/view";
import Chat from "./components/chat/chat";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect("https://web-chat.up.railway.app/");

function App() {

    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);


    const joinRoom = function () {

        if(username !== "" && room !== ""){

            socket.emit("join_room", room);
            setShowChat(true);
        }
    }

    return (
        <div className="App">
            {!showChat ? (
            <div className="joinChatContainer">
                <h3>Join A chat</h3>
                <input type="text"
                       placeholder="join..."
                       onChange={function(event){
                           setUsername(event.target.value);
                       }}
                />
                <input type="text"
                       placeholder="room..."
                       onChange={function(event){
                           setRoom(event.target.value);
                       }}
                />
                <button onClick={joinRoom}>Join A room</button>

            </div>
            ) : (
            <Chat
                socket={socket}
                username={username}
                room={room}
            />
            )}
        </div>
    );
}

export default App;
