import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Account from "../account";
import {UserContext} from "../../../feature/userContext";


function HeaderAccount(props){

    const [hideHeader, setHideHeader] = useState(false);
    const { logout, myUser} = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {

        if (location.pathname === '/' ||
            location.pathname === '/home' ||
            location.pathname === '/chat' ||
            location.pathname === '/company' ||
            location.pathname === '/contact' ||
            location.pathname === '/login' ||
            location.pathname === '/register') {

            setHideHeader(true);
        }

    }, [location.pathname]);

    return (
        <div>
            {!hideHeader && (
                <div className="header-account">
                    <div>
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to={"/account"}>
                                    {props.username ? props.username.toUpperCase() : ""}
                                </Link>
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#navbarSupportedContent"
                                    aria-controls="navbarSupportedContent"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/account">
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/account/info">
                                                Thông tin
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" to="/account/chat">
                                                Phòng chat
                                            </Link>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false">
                                                Lựa chọn
                                            </a>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <Link className="dropdown-item" to="/account">
                                                        Trang chủ
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    <button className="btn btn-outline-success" type="submit" onClick={props.handleLogout}>
                                        ĐĂNG XUẤT
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </div>

    );
}

export default HeaderAccount;