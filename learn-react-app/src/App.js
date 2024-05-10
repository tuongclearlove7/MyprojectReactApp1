import logo from './logo.svg';
import avatar from './thaorose.jpg';
import './App.css';
import View from "./components/learn/View";
import {useState} from "react";
import { Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import Home from "./components/Home";
import Learn from "./components/learn/Learn";
import Header from "./components/Header";

function App() {

  return (
    <div className="App">
        <div className={"container"}>
            <Header/>
            <br/>
            <div>
                <img className={"avatar"} src={avatar} alt="avatar"/>
            </div>
            <br/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/waiting-room" element={<Home/>}/>
                <Route path="/api" element={<Learn/>}/>
            </Routes>
            <br/>
            <div>
                <footer><h3></h3></footer>
            </div>
        </div>


    </div>
  );
}

export default App;
