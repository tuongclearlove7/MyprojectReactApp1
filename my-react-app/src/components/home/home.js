import React, {useContext, useEffect} from "react";
import logo from '../../logo.svg';
import '../../App.css';
import CompanyItem from "../company/companyItem";
import Cookies from "js-cookie";
import {UserContext} from "../../feature/UserContext";

function Home(props){

    const { RedirectAccount, setTitlePage } = useContext(UserContext);

    useEffect(() => {

        RedirectAccount();
        setTitlePage(`HOME - CLEARLOVE7`);

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