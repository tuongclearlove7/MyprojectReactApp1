import React, {useEffect} from "react";
import logo from '../../logo.svg';
import '../../App.css';
import CompanyItem from "../company/companyItem";
import {RedirectAccount} from "../../feature/redirectAccount";
import Cookies from "js-cookie";


function Home(props){

    useEffect(() => {

        const username = Cookies.get('username');

        if(username){

            RedirectAccount();
        }

        document.title = `HOME - CLEARLOVE7`;

    }, []);

    return(
        <div className="home-container">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    HỌC REACTJS CÙNG TUONG{props.learn}
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    HỌC ReactJS
                </a>
            </header>
        </div>
    );
}

export default Home;