import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ScrollToTop from "react-scroll-to-top";
import {youtubeData} from "./model/youtubeData";
import {tableData} from "./model/tableData";
import CompanyItem from "./components/company/companyItem";
import YoutubeItem from "./components/blog/youtubeItem";
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
import React, {useState, useEffect, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import Blog from "./components/blog/blog";
import Account from "./components/account/account";
import StatusLogin from "./feature/statusLogin";
import {ReMoveStore} from "./feature/removeStore";
import {toast} from "react-toastify";
import {UserContext} from "./feature/userContext";
import {auth_name} from "./model/secrectName";
import Weather from "./components/weather/weather";


function App() {

    const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/account`;//process.env.REACT_APP_API_LOCALHOST
    const authorWebName = "CLEARLOVE7";
    const [showChat, setShowChat] = useState(false);
    const [showHeader, setShowHeader] = useState(false);
    const email = Cookies.get('email');
    const username = Cookies.get('username');
    let [u, setU] = useState("");
    let [r, setR] = useState("");
    const { myUser, login, GetStatusLogin} = useContext(UserContext);

    useEffect(() => {

        if(username){

            login(username, email);
        }
    }, []);

    GetStatusLogin(url,{"Current user: ": myUser});

    return (
        <div className="App">
            <div className="container">
                <Header u={u} r={r}  setShowChat={setShowChat}/>
                <Routes>
                    <Route path="/" element={<ChatContainer socket_url={process.env.REACT_APP_API_LOCALHOST}
                    setU={setU} setR={setR}  title={`HOME - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat} />}/>
                    <Route path="/chat" element={<ChatContainer  socket_url={process.env.REACT_APP_API_LOCALHOST}
                    setU={setU} setR={setR} title={`CHAT - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat} />}/>
                    <Route path="/home" element={<Home title={`HOME - ${authorWebName}`} learn={`${authorWebName}`}/>}/>
                    <Route path="/account/*" exact element={<Account  socket_url={process.env.REACT_APP_API_LOCALHOST}
                    setU={setU} setR={setR} title={`CHAT - ${authorWebName}`} showChat={showChat} setShowChat={setShowChat}/>}/>
                    <Route path="/company" element={<Company  title={`COMPANY - ${authorWebName}`} />}/>
                    <Route path="/blog" element={<Blog  title={`BLOG - ${authorWebName}`} />}/>
                    <Route path="/contact" element={<Contact  title={`CONTACT - ${authorWebName}`} />}/>
                    <Route path="/login" element={<Login  title={`LOGIN - ${authorWebName}`} />}/>
                    <Route path="/register" element={<Register  title={`REGISTER - ${authorWebName}`} />}/>
                    <Route path="/weather" element={<Weather  title={`WEATHER - ${authorWebName}`} />}/>
                </Routes>
                <ScrollToTop smooth color="#6f00ff" />
                <Footer/>
            </div>
        </div>
    );
}

export default App;
