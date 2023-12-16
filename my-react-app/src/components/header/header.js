import React, {useEffect} from "react";
import { ToastContainer, toast } from 'react-toastify';
import {Link, useNavigate} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import {Reconnect} from "../../feature/reconntect";


function Header(props) {

    const navigate = useNavigate();
    const sizeIcon = "25px";
    const r_m = props.r;
    const u_m = props.u;

    const leaveRoom = async () => {

        props.socket.emit(process.env.REACT_APP_LEAVE_ROOM, {r_m, u_m});
        props.setShowChat(false);
        props.socket.disconnect();
        await Reconnect(props.socket);
    };

    return (
        <div className="header">
            <div className={"my-info"} style={{padding:"20px",}}>
                <span className={"list-icon"}>
                     <li style={{listStyle:"none"}}>
                        <a style={{fontSize:sizeIcon}} className="fa fa-github" href="https://github.com/tuongclearlove7" ></a>
                        <a style={{fontSize:sizeIcon}} className="fa fa-facebook" href={"https://www.facebook.com/Ytttuong1"}></a>
                        <a style={{fontSize:sizeIcon}} className="fa fa-linkedin" href={`https://www.linkedin.com/in/tuong-tran-the-391688293/`}></a>
                        <a style={{fontSize:sizeIcon}} className="fa fa-instagram" href={``}></a>
                         <b>Theo dõi tôi</b>
                    </li>
                </span>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to={"/home"} onClick={async ()=>{await leaveRoom();}}>
                        WEB-CHAT
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                            style={{ "--bs-scroll-height": "100px" }}>
                            <li className="nav-item">
                                <a className="nav-link" href={"/"} onClick={async ()=>{await leaveRoom();}}>
                                    TRANG CHỦ
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={async ()=>{await leaveRoom();}} to="company">
                                    CÔNG TY
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link"  to="chat">NHẮN TIN</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={async ()=>{await leaveRoom();}} to="blog">
                                    BÀI VIẾT
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" onClick={async ()=>{await leaveRoom();}} to="contact">
                                    LIÊN HỆ
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    LỰA CHỌN
                                </a>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to={"chat"}>NHẮN TIN</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={async ()=>{await leaveRoom();}} to={"company"}>
                                            CÔNG TY
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={async ()=>{await leaveRoom();}} to={"blog"}>
                                            BÀI VIẾT
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Tìm kiếm"
                                aria-label="Search"
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Tìm
                            </button>
                        </form>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </div>
    );
}

export default Header;
