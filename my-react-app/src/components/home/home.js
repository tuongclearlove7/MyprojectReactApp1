import React, {useContext, useEffect} from "react";
import logo from '../../logo.svg';
import '../../App.css';
import CompanyItem from "../company/companyItem";
import Cookies from "js-cookie";
import {UserContext} from "../../feature/userContext";

function Home(props){

    const { RedirectAccount, setTitlePage } = useContext(UserContext);

    useEffect(() => {

        setTitlePage(`HOME - CLEARLOVE7`);

    }, []);


    return(
        <div className="home-container">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    HỌC REACT JS CÙNG TUONG{props.learn}
                </p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    HỌC React JS
                </a>
            </header>
        </div>
    );
}

export default Home;