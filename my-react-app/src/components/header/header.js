import React from "react";
import {Link, useNavigate} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


// Component
function Header(props) {

    const navigate = useNavigate();

    const leaveRoom = () => {

        props.setShowChat(false);
    };
    const sizeIcon = "25px";

    return (
        <div className="header">
            <div className={"my-info"} style={{padding:"20px",}}>
                <span className={"list-icon"}>
                     <li style={{listStyle:"none"}}>
                        <a style={{fontSize:sizeIcon}} className="fa fa-github" href="https://github.com/tuongclearlove7" ></a>
                        <a style={{fontSize:sizeIcon}} className="fa fa-facebook" href={"https://www.facebook.com/Ytttuong1"}></a>
                        <a style={{fontSize:sizeIcon}} className="fa fa-linkedin" href={`https://www.linkedin.com/in/tuong-tran-the-391688293/`}></a>
                        <a style={{fontSize:sizeIcon}} className="fa fa-instagram" href={``}></a>
                         <b>FOLLOW ME</b>
                    </li>
                </span>
            </div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        WEB-CHAT
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarScroll"
                        aria-controls="navbarScroll"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarScroll">
                        <ul
                            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
                            style={{ "--bs-scroll-height": "100px" }}
                        >
                            <li className="nav-item">
                                <a className="nav-link" href={"/"} onClick={leaveRoom} >TRANG CHỦ</a>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="company">CÔNG TY</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="chat">NHẮN TIN</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="blog">BÀI VIẾT</Link>
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
                                        <Link className="dropdown-item" to={"company"}>CÔNG TY</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to={"blog"}>BÀI VIẾT</Link>
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
        </div>
    );
}

export default Header;
