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

    const OnLocalStorage = async (on, key, value, dataKey, f) => {

        switch (on) {
            
            case 'set':
                localStorage.setItem(key, value);
                break;

            case 'get':
                return {[dataKey]: localStorage.getItem(key)};

            case 'remove':
                if (typeof f === "function") {
                    await f();
                    console.log("remove");
                    localStorage.removeItem(key);
                }
                break;

            default:
                break;
        }
    };

    const HandleLoading = async (page, setLoading, timeLoading)=>{

        if(typeof setLoading === "function"){

            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, timeLoading));
            navigate(page)
            setLoading(false);
        }
    }

    const RedirectAccount = () =>{

        const username = Cookies.get('username');

        if(username){

            window.confirm('Bấm đăng xuất ra ngoài để trải nghiệm!');
            navigate("/account");
        }
    }

    const GetStatusLogin = async (url, env, f)=>{

        try{
            const response = await axios.get(url, {
                headers: {
                    [auth_name]: env,
                },
            });

            console.log(response);

            if(typeof f === 'object'){

                console.log(f);
            }

        }catch (error){

            console.warn("Error fetching data:", error.request);

            if (typeof f === 'function') {

                f();

            } else {

                console.log(f);

                return f;
            }
        }
    }

    const ExpiredLogin = () => {

        localStorage.setItem("notify","Hết hạn đăng nhập. Vui lòng đăng nhập lại!!!");
        logout();
        window.location="/login"

    };


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

            console.warn("Error fetching data: ", error.request);
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
            GetStatusLogin,
            ExpiredLogin,
            HandleLoading,
            OnLocalStorage

        }}>{children}
        </UserContext.Provider>
    );
};

export {

    UserContext,
    UserProvider
};