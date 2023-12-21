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
import {UserContext} from "../../feature/UserContext";

function Login(props){

    const [data, setData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(UserContext);
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
        RedirectAccount();
        setTitlePage(props.title);

    }, [props.title]);

    const handleChange = ({ currentTarget: input }) => {

        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const url = `${hostname}auth-api/login`;
            const { data: res } = await axios.post(url, data, {
                headers: {
                    Authorization: `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
                },
            });

            login(res.username, res.email, res.data);
            navigate("/account")

        } catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {

                notifyError(error.response.data.message,2000);
            }
        }
    }

    return(
        <div>
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