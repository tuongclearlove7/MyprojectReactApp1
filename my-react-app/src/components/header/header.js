import React, {useContext, useEffect, useState} from "react";
import {ToastContainer, toast} from 'react-toastify';
import {Link, useLocation, useNavigate} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import {Reconnect} from "../../feature/reconntect";
import Cookies from "js-cookie";
import RenderEffect from "../../feature/renderEffect";
import {UserContext} from "../../feature/userContext";
import ChildHeader from "./childHeader";
import {connect} from "react-redux";


function Header(props) {

    const location = useLocation();
    const username = Cookies.get('username');

    if (location.pathname === '/' ||
        location.pathname === '/home' ||
        location.pathname === '/chat' ||
        location.pathname === '/blog' ||
        location.pathname === '/company' ||
        location.pathname === '/contact' ||
        location.pathname === '/login' ||
        location.pathname === '/register'||
        location.pathname === "/weather") {

        return (
            <div>
                <ChildHeader r={props.r} u={props.u} setShowChat={props.setShowChat}/>
            </div>
        );
    }

    if(!username){

        return (
            <div>
                <ChildHeader r={props.r} u={props.u} setShowChat={props.setShowChat}/>
            </div>
        );
    }
}


const mapStateToProps = (state) => {

    return {

        dataReduxStore: state.data,
    }
}

export default connect(mapStateToProps)(Header);
