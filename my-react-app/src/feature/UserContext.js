import {useEffect, useState} from "react";
import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";


const UserContext = React.createContext({ username: null, auth: false });

const UserProvider = ({ children }) => {

    const [myUser, setMyUser] = React.useState({username:"", auth: false});
    const navigate = useNavigate();

    const setTitlePage = title => document.title = title;

    const RedirectAccount = () =>{

        const username = Cookies.get('username');

        if(username){

            window.confirm('Bấm đăng xuất ra ngoài để trải nghiệm!');
            navigate("/account");
        }
    }

    const login = (username, email, token) => {

        Cookies.set("token", token, { expires: Date.now() + 30000, path: "/" });
        Cookies.set("username", username, { expires: Date.now() + 30000, path: "/" });
        Cookies.set("email", email, { expires: Date.now() + 30000, path: "/" });
        localStorage.setItem("username", username);

        setMyUser((myUser)=>({
            username: username,
            auth: true,
        }));
    };

    const logout = () => {

        Cookies.remove("token");
        Cookies.remove('username');
        Cookies.remove('email');
        localStorage.removeItem("username");

        setMyUser((myUser)=>({
            username: null,
            auth: true,
        }));
    };

    return (
        <UserContext.Provider value={{
            myUser,
            login,
            logout,
            RedirectAccount,
            setTitlePage,
        }}>{children}
        </UserContext.Provider>
    );
};

export {

    UserContext,
    UserProvider
};