import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import {youtubeData} from "./model/youtubeData";
import {tableData} from "./model/tableData";
import CompanyItem from "./components/company/companyItem";
import YoutubeItem from "./components/youtube/youtubeItem";
import Toggle from "./components/state/toggle";
import View from "./components/view/view";
import Chat from "./components/chat/chat";
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

function App() {

    const webName = "CLEARLOVE7";
    const [showChat, setShowChat] = useState(false);

    return (
        <div className="App">
            <div className="container">
                <Header setShowChat={setShowChat} />
                <Routes>
                    <Route path="/" element={<ChatContainer title={`HOME - ${webName}`} showChat={showChat} setShowChat={setShowChat} />} />
                    <Route path="/chat" element={<ChatContainer title={`CHAT - ${webName}`} showChat={showChat} setShowChat={setShowChat} />} />
                    <Route path="/company" element={<Company  title={`COMPANY - ${webName}`} />}/>
                    <Route path="/blog" element={<Blog  title={`BLOG - ${webName}`} />}/>
                </Routes>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
