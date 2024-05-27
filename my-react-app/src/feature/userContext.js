import {useEffect, useState} from "react";
import React from "react";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {auth_name} from "../model/secrectName";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_API_HOSTNAME, { //process.env.REACT_APP_API_LOCALHOST
    extraHeaders: {
        [auth_name] : `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
    },
});

const UserContext = React.createContext({ username: null, auth: false });


const UserProvider = ({children}) => {

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
                if (Array.isArray(f)) {

                    for (const obj of f) {

                        for (const key in obj) {

                            if (Object.hasOwnProperty.call(obj, key)
                                && typeof obj[key] === "function") {

                                await obj[key]();
                            }
                        }
                    }
                } else if (typeof f === "object") {

                    for (const key in f) {

                        if (Object.hasOwnProperty.call(f, key)
                            && typeof f[key] === "function") {

                            await f[key]();
                        }
                    }
                } else if (typeof f === "function") {

                    await f();
                }

                localStorage.removeItem(key);

                break;
            default:
                break;
        }
    };

    const Execute_array_obj_func = async (f) => {

        if (Array.isArray(f)) {

            for (const obj of f) {

                for (const key in obj) {

                    if (Object.hasOwnProperty.call(obj, key)
                        && typeof obj[key] === "function") {

                        await obj[key]();
                    }
                }
            }
        }
    }

    const Execute_obj_func = async (f) => {

        if (typeof f === "object") {

            for (const key in f) {

                if (Object.hasOwnProperty.call(f, key)
                    && typeof f[key] === "function") {

                    await f[key]();
                }
            }
        }
    }


    const HandleLoading = async (page, setLoading, timeLoading) => {

        if (typeof setLoading === "function") {

            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, timeLoading));
            navigate(page)
            setLoading(false);
        }
    }

    const RedirectAccount = () => {

        const username = Cookies.get('username');

        if (username) {

            window.confirm('Bấm đăng xuất ra ngoài để trải nghiệm!');
            navigate("/account");
        }
    }

    const GetStatusLogin = async (url, env, f) => {

        try {
            const response = await axios.get(url, {
                headers: {
                    [auth_name]: env,
                },
                mode: 'cors',
                withCredentials: "include",
            });

            if (typeof f === 'object') {

                return f;
            }
            
            return response;

        } catch (error) {

            await OnLocalStorage("remove", "countdown", "", "data");
            await OnLocalStorage("remove", "onLogin", "", "data");

            console.warn(error);

            if (typeof f === 'function') {

                f();

            } else {

                return f;
            }

            return error.request;
        }
    }

    const ExpiredLogin = () => {

        console.log("logout");
        OnLocalStorage("remove", "countdown", "", "data").then(r => r);
        localStorage.setItem("notify", "Hết hạn đăng nhập. Vui lòng đăng nhập lại!!!");
        logout();
        window.location = "/login";

    };


    const FetchAPI = async (hostname, setData, auth_name, env) => {

        try {
            const response = await axios.get(hostname, {
                headers: {

                    [auth_name]: env,
                },
            });

            setData(response.data);

        } catch (error) {

            console.warn("Error fetching data: ", error.request);
        }
    }

    const login = (username, email) => {

        Cookies.set("username", username, { expires: Date.now() + 3000000, path: "/" });
        Cookies.set("email", email, { expires: Date.now() + 3000000, path: "/" });

        setMyUser((myUser)=>({
            username: username,
            auth: true,
        }));
    };

    const logout = () => {

        document.cookie.split(";").forEach(function(c) { 
            
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
        });

        setMyUser((myUser)=>({
            username: null,
            auth: false,
        }));
    };

    return (
        <UserContext.Provider value={{
            socket,
            myUser,
            login,
            logout,
            FetchAPI,
            setTitlePage,
            ExpiredLogin,
            HandleLoading,
            OnLocalStorage,
            GetStatusLogin,
            RedirectAccount,
            Execute_obj_func,
            Execute_array_obj_func

        }}>{children}
        </UserContext.Provider>
    );
};

export {

    UserContext,
    UserProvider
};