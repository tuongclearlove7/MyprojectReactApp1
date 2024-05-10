import logo from './logo.svg';
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
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/api" element={<Learn/>}/>
            </Routes>
        </div>


    </div>
  );
}

export default App;
