import React, {useEffect, useState} from "react";
import styles from "./loginStyle.module.css";
import {Link} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, selectToken } from '../../redux/authSlice';

function Login(props){

    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
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

        document.title = props.title;
    }, []);

    const handleChange = ({ currentTarget: input }) => {

        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/login`;
            const { data: res } = await axios.post(url, data, {
                headers: {
                    Authorization: `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
                },
            });

            Cookies.set("token", res.data, { expires: Date.now() + 30000, path: "/" });
            Cookies.set("username", res.username, { expires: Date.now() + 30000, path: "/" });
            Cookies.set("email", res.email, { expires: Date.now() + 30000, path: "/" });
            localStorage.setItem("username", res.username);
            window.location = "/account";

        } catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {

                notifyError(error.response.data.message,2000)
            }
        }
    };

    return(
        <div className="login-container">
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
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
                            ĐĂNG NHẬP
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Đăng ký ngay</h1>
                    <Link to="/register">
                        <button type="button" className={styles.white_btn}>
                            ĐĂNG KÝ
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Login;