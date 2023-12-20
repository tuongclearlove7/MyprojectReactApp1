import React, {useContext, useEffect, useState} from "react";
import styles from "./registerStyle.module.css";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import RegisterMobileForm from "../../mobileComponents/auth/registerMobileForm";
import {UserContext} from "../../feature/UserContext";

function Register(props){

    const { RedirectAccount, setTitlePage } = useContext(UserContext);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [data, setData] = useState({

        firstName:"",
        lastName:"",
        email:"",
        password:""
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

        RedirectAccount();
        setTitlePage(props.title);

    }, [props.title]);

    const handleChange = ({ currentTarget: input }) => {

        setData({...data, [input.name]:input.value});
    }

    const handleSubmit = async (e)=>{

        e.preventDefault();

        try {

            const url = `${process.env.REACT_APP_API_HOSTNAME}auth-api/register/store`;
            const { data: res } = await axios.post(url, data, {
                headers: {
                    Authorization: `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
                },
            });
            localStorage.setItem("register_success", "Tạo tài khoản thành công")
            window.location = "/login";
            console.log("register now");

        }catch (error) {

            if(error.response && error.response.status >= 400 && error.response.status <= 500){

                console.log(error.response);
                notifyError(error.response.data.message);
                setError(error.response.data.message);
            }
        }
    }

    return(<div>
            <div className="register-container">
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1>Đăng nhập ngay</h1>
                        <Link to="/login">
                            <button type="button" className={styles.white_btn}>
                                ĐĂNG NHẬP
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
                            <button type="submit" className={styles.green_btn}>
                                ĐĂNG KÝ
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