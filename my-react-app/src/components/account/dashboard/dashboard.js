import React, {useEffect} from "react";
import logo from '../../../logo.svg';
import '../../../App.css';
import Cookies from "js-cookie";


function DashBoard(props){

    const username = Cookies.get('username');

    useEffect(() => {

        if(username){

            document.title = `Tài khoản ${username}`;
        }
    }, []);

    return(
        <div className="home-container">
            <header className="App-header">
                <img src={logo} className="App-dash-logo" alt="logo" />
                <p>
                    {username ? username.toUpperCase() : "Không có thông tin!"}
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Học tử khối electron cùng TUONGCLEARLOVE7
                </a>
            </header>
        </div>
    );
}

export default DashBoard;