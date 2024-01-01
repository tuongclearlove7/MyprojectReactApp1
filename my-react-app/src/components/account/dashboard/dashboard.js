import React, {useEffect} from "react";
import logo from '../../../logo.svg';
import '../../../App.css';
import Cookies from "js-cookie";


function DashBoard(props) {

    const username = Cookies.get('username');

    return (
        <div className="home-container">
            <header className="App-header">
                <img src={logo} className="App-dash-logo" alt="logo"/>
                <p>
                    {username ? username.toUpperCase() : "Không có thông tin!"}
                </p>
            </header>
        </div>
    );
}

export default DashBoard;