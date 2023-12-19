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
import ChatContainer from "./components/chat/chatContainer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, selectToken } from './redux/authSlice';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import Blog from "./components/youtube/blog";
import Account from "./components/account/account";
import StatusLogin from "./feature/statusLogin";
import {ReMoveStore} from "./feature/removeStore";
import {toast} from "react-toastify";

const socket = io.connect(process.env.REACT_APP_API_HOSTNAME, {
    extraHeaders: {
        Authorization : `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
    },
});

function App() {

    const authorWebName = "CLEARLOVE7";
    const [showChat, setShowChat] = useState(false);
    const user = Cookies.get('token');
    let [u, setU] = useState("");
    let [r, setR] = useState("");

    socket.on('connect_error', (error) => {

        console.error('Connection error:', error.message);
    });

    socket.on('connect', () => {

        console.log("Socket connected");
    });

    useEffect(() => {

        localStorage.setItem("showHeader", "false");
    }, []);

    ReMoveStore("notify",2000,2000);

    return (
        <div className="App">
            <div className="container">
                <Header u={u} r={r} socket={socket}  setShowChat={setShowChat}/>
                <Routes>
                    <Route path="/" element={<ChatContainer socket_url={process.env.REACT_APP_API_LOCALHOST}
                    setU={setU} setR={setR} socket={socket} title={`HOME - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat} />}/>
                    <Route path="/chat" element={<ChatContainer  socket_url={process.env.REACT_APP_API_LOCALHOST}
                     setU={setU} setR={setR}  socket={socket} title={`CHAT - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat} />}/>
                    <Route path="/home" element={<Home title={`HOME - ${authorWebName}`} learn={`${authorWebName}`}/>}/>
                    {user && <Route path="/account/*" exact element={<Account socket_url={process.env.REACT_APP_API_LOCALHOST}
                    setU={setU} setR={setR}  socket={socket} title={`CHAT - ${authorWebName}`} showChat={showChat}
                    setShowChat={setShowChat}/>}/>}
                    <Route path="/account" element={<Account exact element={<Home/>}/>}/>
                    <Route path="/company" element={<Company  title={`COMPANY - ${authorWebName}`} />}/>
                    <Route path="/blog" element={<Blog  title={`BLOG - ${authorWebName}`} />}/>
                    <Route path="/contact" element={<Contact  title={`CONTACT - ${authorWebName}`} />}/>
                    <Route path="/login" element={<Login  title={`LOGIN - ${authorWebName}`} />}/>
                    <Route path="/register" element={<Register  title={`REGISTER - ${authorWebName}`} />}/>
                </Routes>
                <ScrollToTop smooth color="#6f00ff" />
                <Footer/>
            </div>
        </div>
    );
}

export default App;
