import {useEffect, useState} from "react";
import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {auth_name} from "../model/secrectName";
import axios from "axios";


const UserContext = React.createContext({ username: null, auth: false });

const UserProvider = ({ children }) => {

    const [myUser, setMyUser] = React.useState({username:null, auth: false});
    const navigate = useNavigate();

    const setTitlePage = title => document.title = title;

    const RedirectAccount = () =>{

        const username = Cookies.get('username');

        if(username){

            window.confirm('Bấm đăng xuất ra ngoài để trải nghiệm!');
            navigate("/account");
        }
    }

    const GetStatusLogin = async (url, env, func)=>{

        try{

            const response = await axios.get(url, {
                headers: {
                    [auth_name]: env,
                },
            });

            console.log(response);

            if(typeof func === 'object'){

                console.log(func);
            }

        }catch (error){

            console.error("Error fetching data:", error);

            if (typeof func === 'function') {

                func();

            } else {

                console.log(func);

                return func;
            }
        }
    }


    const FetchAPI = async (hostname, setData, auth_name, env) =>{

        try {
            const response = await axios.get(hostname, {
                headers: {

                    [auth_name]: env,
                },
            });

            setData(response.data);
            console.log(response.data);

        } catch (error) {

            console.error("Error fetching data:", error);
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
            FetchAPI,
            GetStatusLogin
        }}>{children}
        </UserContext.Provider>
    );
};

export {

    UserContext,
    UserProvider
};