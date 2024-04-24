import React, {useContext, useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import Account from "../account";
import {UserContext} from "../../../feature/userContext";
import {connect} from "react-redux";
import {Reconnect} from "../../../feature/reconntect";
import Cookies from "js-cookie";


function HeaderAccount(props) {

    const [hideHeader, setHideHeader] = useState(false);
    const [socket, setSocket] = useState(null);
    const {logout, myUser} = useContext(UserContext);
    const username = Cookies.get('username');
    const admin = Cookies.get('role_admin');
    const location = useLocation();

    useEffect(() => {

        const isSocket = props.dataReduxStore[0]?.socket;

        if (isSocket) {

            setSocket(isSocket);
        }

        if (location.pathname === '/' ||
            location.pathname === '/home' ||
            location.pathname === '/chat' ||
            location.pathname === '/company' ||
            location.pathname === '/contact' ||
            location.pathname === '/login' ||
            location.pathname === '/register') {

            setHideHeader(true);
        }

    }, [location.pathname, socket]);

    const leaveRoom = async () => {

        const room = props.room;
        socket.emit(process.env.REACT_APP_LEAVE_ROOM, {room, username});
        socket.disconnect();
        await Reconnect(socket);
    };

    return (
        <div>
            {!hideHeader && (
                <div className="header-account">
                    <div>
                        <nav className="navbar navbar-expand-lg bg-body-tertiary">
                            <div className="container-fluid">
                                <Link className="navbar-brand" to={"/account"} onClick={async () => {
                                    await leaveRoom();
                                }}>
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
                                            <Link className="nav-link active" onClick={async () => {
                                                await leaveRoom();
                                            }} to="/account">
                                                Trang chủ
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link active" onClick={async () => {
                                                await leaveRoom();
                                            }} to="/account/info">
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
                                                    <Link className="dropdown-item" to="/account" onClick={async () => {
                                                        await leaveRoom();
                                                    }}>
                                                        Trang chủ
                                                    </Link>
                                                </li>
                                                {admin && (
                                                    <li>
                                                        <Link className="dropdown-item" to="/account/list-user" onClick={async () => {
                                                            await leaveRoom();
                                                        }}>
                                                            Danh sách người dùng
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </li>
                                    </ul>
                                    <button className="btn btn-outline-success" type="submit"
                                            onClick={props.handleLogout}>
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

const mapStateToProps = (state) => {

    return {

        dataReduxStore: state.data,
    }
}

export default connect(mapStateToProps)(HeaderAccount);