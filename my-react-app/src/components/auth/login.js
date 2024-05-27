import React, {useContext, useEffect, useState} from "react";
import styles from "./loginStyle.module.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import Cookies from "js-cookie";
import 'react-toastify/dist/ReactToastify.css';
import LoginMobileForm from "../../mobileComponents/auth/loginMobileForm";
import {ReMoveStore, ReMoveStoreSuccess} from "../../feature/removeStore";
import {UserContext} from "../../feature/userContext";
import {auth_name} from "../../model/secrectName";
import logo from "../../logo.svg";
import loading_img from "../../loading.gif";
import {connect, useDispatch} from 'react-redux';


function Login(props) {

    const [loadingRegister, setLoadingRegister] = useState(false);
    const [data, setData] = useState({email: "", password: ""});
    const [csrfTokenState, setCsrfTokenState] = useState('');
    const [loadingLogin, setLoadingLogin] = useState(false);
    const {OnLocalStorage, setTitlePage} = useContext(UserContext);
    const {login, HandleLoading} = useContext(UserContext);
    const hostname = process.env.REACT_APP_API_HOSTNAME;//process.env.REACT_APP_API_LOCALHOST
    const url = `${hostname}/auth-api/login`;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);
    useEffect(() => {

        const isSocket = props.dataReduxStore[0]?.socket;

        if (isSocket) {

            setSocket(isSocket);
        }

    }, [props.dataReduxStore]);

    useEffect(() => {

        ReMoveStore("notify", 2000, 2000);
        ReMoveStoreSuccess(localStorage.getItem("register_success"), 2000, 2000);
        setTitlePage(props.title);

    }, [props.title, setTitlePage]);

    useEffect(() => {

        getCallToForm().then(r => r);
    }, []);

    async function getCallToForm() {

        axios.get(url, {

            mode:'cors',
            withCredentials: 'include',

        }).then(response => {

            setCsrfTokenState(response.data.csrf);
        })
        .catch(error => {

            if (error.response && error.response.status === 401) {

                setCsrfTokenState(error.response.data.csrf);

            } else {
                console.error('Error:', error.message);
            }
        });
    }

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

    const handleLoading = async () => {

        HandleLoading("/register", setLoadingRegister, 700);
    }


    const handleChange = ({currentTarget: input}) => {

        setData({...data, [input.name]: input.value});
    };

    const onSetLocalStorage = (page) => {

        OnLocalStorage("set", "onLogin", true, "data");
        navigate(page);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoadingLogin(true);
            const {data: res} = await axios.post(url, {data, csrf_token : csrfTokenState} , {
                headers: {
                    [auth_name]: `${process.env.REACT_APP_AUTH_METHOD} ${csrfTokenState}`,
                    'Content-Type': 'application/json',
                },
                mode: 'cors',
                withCredentials: 'include',
            });

            await new Promise(resolve => setTimeout(resolve, 1000));

            login(res.username, res.email, res.data);

            if(res.role_admin){
                Cookies.set("role_admin", res.role_admin, { expires: Date.now() + 3000000, path: "/" });
            }

            onSetLocalStorage("/account");

        } catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {

                await new Promise(resolve => setTimeout(resolve, 1000));
                notifyError(error.response.data.message, 2000);
            }
        } finally {

            setLoadingLogin(false);
        }
    }

    return (
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
                            <span>
                                ĐĂNG NHẬP
                            </span>
                            {loadingLogin && (
                            <span id={styles.rou_logo}>
                                 <img src={loading_img} className="App-user-logo" alt="logo"/>
                            </span>)}
                        </button>
                    </form>
                </div>
                <div className={styles.right}>
                    <h1>Đăng ký ngay</h1>
                    <button type="button" onClick={handleLoading} className={styles.white_btn}>
                        ĐĂNG KÝ
                        {loadingRegister && (
                        <span id={styles.rou_logo}>
                             <img src={loading_img} className="App-user-logo" alt="logo"/>
                        </span>)}
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
    </div>);
}

const mapStateToProps = (state) => {

    return {

        dataReduxStore: state.data,
    }
}

export default connect(mapStateToProps)(Login);