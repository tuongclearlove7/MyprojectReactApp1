import React, {useContext, useEffect, useState} from "react";
import styles from "./loginStyle.module.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, selectToken } from '../../redux/authSlice';
import LoginMobileForm from "../../mobileComponents/auth/loginMobileForm";
import {ReMoveStoreSuccess} from "../../feature/removeStore";
import {UserContext} from "../../feature/userContext";
import {auth_name} from "../../model/secrectName";
import logo from "../../logo.svg";

function Login(props){

    const [data, setData] = useState({ email: "", password: "" });
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const [error, setError] = useState("");
    const { login, HandleLoading } = useContext(UserContext);
    const { RedirectAccount, setTitlePage } = useContext(UserContext);
    const navigate = useNavigate();
    const hostname = process.env.REACT_APP_API_HOSTNAME;
    const notifyError = (text, time) => toast.error(text, {
            position: "top-center",
            autoClose: time,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
    });


    useEffect(() => {

        ReMoveStoreSuccess(localStorage.getItem("register_success"),2000, 2000);
        setTitlePage(props.title);

    }, [props.title]);

    const handleLoading = async ()=>{

        HandleLoading("/register", setLoadingRegister, 700);
    }


    const handleChange = ({ currentTarget: input }) => {

        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoadingLogin(true);
            const url = `${hostname}auth-api/login`;
            const { data: res } = await axios.post(url, data, {
                headers: {
                    [auth_name]: `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
                },
            });

            await new Promise(resolve => setTimeout(resolve, 1000));
            login(res.username, res.email, res.data);
            window.location="/account";
            // navigate("/account");

        } catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {

                await new Promise(resolve => setTimeout(resolve, 1000));
                notifyError(error.response.data.message,2000);
            }
        }
        finally {

            setLoadingLogin(false);
        }
    }

    return(
        <div>
            <div className="login-container">
                <div className={styles.login_form_container}>
                    <div className={styles.left}>
                        <form className={styles.form_container} onSubmit={handleSubmit} >
                            <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                            />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                            />
                            <button type="submit" className={styles.green_btn}>
                                <span>
                                    ĐĂNG NHẬP
                                </span>
                                {loadingLogin && (
                                    <span id={styles.rou_logo}>
                                         <img src={"https://media.tenor.com/JeNT_qdjEYcAAAAj/loading.gif"} className="App-user-logo" alt="logo" />
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                    <div className={styles.right}>
                        <h1>Đăng ký ngay</h1>
                        <button type="button" onClick={handleLoading} className={styles.white_btn}>
                            ĐĂNG KÝ
                            {loadingRegister && (
                                <span id={styles.rou_logo}>
                                     <img src={"https://media.tenor.com/JeNT_qdjEYcAAAAj/loading.gif"} className="App-user-logo" alt="logo" />
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <LoginMobileForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                email={data.email}
                password={data.password}
            />
        </div>
    );
}

export default Login;