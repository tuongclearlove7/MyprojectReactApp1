import React, {useContext, useEffect, useState} from "react";
import styles from "./registerStyle.module.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import RegisterMobileForm from "../../mobileComponents/auth/registerMobileForm";
import {UserContext} from "../../feature/userContext";
import {auth_name} from "../../model/secrectName";
import loading_img from "../../loading.gif";

function Register(props) {

    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const {setTitlePage, HandleLoading} = useContext(UserContext);
    const [error, setError] = useState("");
    useNavigate();
    const [data, setData] = useState({

        firstName: "",
        lastName: "",
        email: "",
        password: "",
        is_online: 0,
    });
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

        setTitlePage(props.title);

    }, [props.title, setTitlePage]);

    const handleChange = ({currentTarget: input}) => {

        setData({...data, [input.name]: input.value});
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setLoadingRegister(true)
            const url = `${process.env.REACT_APP_API_LOCALHOST}/auth-api/register/store`;
            const {data: res} = await axios.post(url, data, {
                headers: {
                    [auth_name]: `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
                },
            });
            localStorage.setItem("register_success", "Tạo tài khoản thành công");
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location = "/login";

        } catch (error) {

            if (error.response && error.response.status >= 400 && error.response.status <= 500) {

                console.log(error.response);
                await new Promise(resolve => setTimeout(resolve, 1000));
                notifyError(error.response.data.message);
                setError(error.response.data.message);
            }
        } finally {

            setLoadingRegister(false);
        }
    }

    return (
        <div>
            <div className="register-container">
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1>Đăng nhập ngay</h1>
                        <Link onClick={() => HandleLoading("/login", setLoadingLogin, 750)}>
                            <button type="button" className={styles.white_btn}>
                                <span>
                                    ĐĂNG NHẬP
                                </span>
                                {loadingLogin && (
                                    <span style={{display: "block"}}>
                                         <img src={loading_img} className="App-user-logo" alt="logo"/>
                                    </span>
                                )}
                            </button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1>TẠO TÀI KHOẢN</h1>
                            <input
                                type="text"
                                placeholder="Họ"
                                name="firstName"
                                onChange={handleChange}
                                value={data.firstName}
                                required
                                className={styles.input}
                            />
                            <input
                                type="text"
                                placeholder="Tên"
                                name="lastName"
                                onChange={handleChange}
                                value={data.lastName}
                                required
                                className={styles.input}
                            />
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
                            <input
                                type="hidden"
                                name="is_online"
                                onChange={handleChange}
                                value={data.is_online}
                                required
                                className={styles.input}
                            />
                            <button type="submit" className={styles.green_btn}>
                                <span>
                                    ĐĂNG KÝ
                                </span>
                                {loadingRegister && (
                                    <span style={{display: "block"}}>
                                        <img src={loading_img} className="App-user-logo" alt="logo"/>
                                    </span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <RegisterMobileForm
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                firstName={data.firstName}
                lastName={data.lastName}
                email={data.email}
                password={data.password}
            />
        </div>
    );
}

export default Register;