import React, {useEffect} from "react";
import logo from '../../../logo.svg';
import '../../../App.css';
import Cookies from "js-cookie";
import Count from "../../../feature/count";


function DashBoard(props) {

    const username = Cookies.get('username');
    const admin = Cookies.get('role_admin');

    return (
        <div className="home-container">
            <header className="App-header">
                <Count timer={props.timer}/>
                <img src={logo} className="App-dash-logo" alt="logo"/>
                <span style={{color:"black"}}>
                    <span style={{color:"#00d000"}}>
                        {admin && ("ADMIN ")}
                    </span>
                    {username ? username.toUpperCase() : "Không có thông tin!"}
                </span>
            </header>
        </div>
    );
}

export default DashBoard;