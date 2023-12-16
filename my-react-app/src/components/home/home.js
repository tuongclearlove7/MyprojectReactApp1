import React, {useEffect} from "react";
import logo from '../../logo.svg';
import '../../App.css';
import CompanyItem from "../company/companyItem";

//component
function Home(props){

    useEffect(() => {
        document.title = props.title;
    }, []);

    return(
        <div className="home-container">
            {/*<CompanyItem/>*/}
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    HỌC REACTJS CÙNG TUONG{props.learn}
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    HỌC ReactJS
                </a>
            </header>
        </div>
    );
}

export default Home;