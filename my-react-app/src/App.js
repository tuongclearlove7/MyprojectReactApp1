import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ScrollToTop from "react-scroll-to-top";
import {youtubeData} from "./model/youtubeData";
import {tableData} from "./model/tableData";
import CompanyItem from "./components/company/companyItem";
import YoutubeItem from "./components/youtube/youtubeItem";
import Toggle from "./components/state/toggle";
import View from "./components/view/view";
import Chat from "./components/chat/chat";
import Contact from "./components/contact/contact";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./components/home/home";
import Company from "./components/company/company";
import Youtube from "./components/youtube/blog";
import ChatContainer from "./components/chat/chatContainer";
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Blog from "./components/youtube/blog";
const socket = io.connect(process.env.REACT_APP_API_HOSTNAME);

function App() {

    const authorWebName = "CLEARLOVE7";
    const [showChat, setShowChat] = useState(false);
    let [u, setU] = useState("");
    let [r, setR] = useState("");

    return (
        <div className="App">
            <div className="container">
                <Header u={u} r={r} socket={socket} setShowChat={setShowChat} />
                <Routes>
                    <Route path="/" element={<ChatContainer setU={setU} setR={setR} socket={socket} title={`HOME - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat} />} />
                    <Route path="/chat" element={<ChatContainer setU={setU} setR={setR}  socket={socket} title={`CHAT - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat} />} />
                    <Route path="/company" element={<Company  title={`COMPANY - ${authorWebName}`} />}/>
                    <Route path="/blog" element={<Blog  title={`BLOG - ${authorWebName}`} />}/>
                    <Route path="/contact" element={<Contact  title={`CONTACT - ${authorWebName}`} />}/>
                </Routes>
                <ScrollToTop smooth color="#6f00ff" />
                <Footer/>
            </div>
        </div>
    );
}

export default App;
