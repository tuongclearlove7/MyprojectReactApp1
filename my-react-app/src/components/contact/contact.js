import React, {useRef, useEffect, useState, useContext} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import Swal from "sweetalert2";
import {UserContext} from "../../feature/userContext";
import loading_img from "../../loading.gif";
import styles from "../auth/loginStyle.module.css";


function Contact(props){


    const [loadingSendMail, setLoadingSendMail] = useState(false);
    const { RedirectAccount, setTitlePage } = useContext(UserContext);
    const [user_name, setUser_name] = useState("");
    const [email, setEmail] = useState("");
    const [msgEmail, setMsgEmail] = useState("");

    useEffect(() => {

        setTitlePage(props.title);

    }, [props.title]);

    const form = useRef();

    const notifySuccess = (text) => toast.success(text, {

        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });

    const notifyError = (text) => toast.error(text, {

        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",

    });

    const sendEmail = async (e) => {

        e.preventDefault();
        setLoadingSendMail(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (!user_name || !email || !msgEmail) {

            notifyError("Vui lòng nhập vào!");

        }else{

            const usernameSpace = 2;
            const usernameSpaceLimited = new RegExp(`\\s{${usernameSpace},}`);

            if(usernameSpaceLimited.test(user_name)){

                notifyError(`Vui lòng nhập vào tên không được phép cách quá ${usernameSpace-1} khoảng trắng!`);

            }else{

                const msgEmailSpace = 11;
                const msgEmailSpaceLimited = new RegExp(`\\s{${msgEmailSpace},}`);

                if(msgEmailSpaceLimited.test(msgEmail)){

                    notifyError(`Vui lòng nhập vào nội dung email không được phép cách quá ${msgEmailSpace-1} khoảng trắng!`);

                }else{

                    if(user_name === " "){

                        notifyError("Vui lòng nhập vào!");

                    }else{

                        emailjs.sendForm(process.env.REACT_APP_SERVICE_EMAIL_ID,
                            process.env.REACT_APP_TEMPLATE_EMAIL_ID,
                            form.current, process.env.REACT_APP_PUBLIC_KEY_EMAIL
                        ).then(async (result) => {

                                setLoadingSendMail(true);
                                console.log(result.text);
                                notifySuccess("Cảm ơn bạn đã gửi email cho tôi. Tôi sẽ liên hệ lại sớm nhất có thể!");
                            }
                        ).catch((error) => {

                            notifyError("Gửi Email lỗi!");
                            console.log(error.text);

                        }).finally(()=>{

                            setLoadingSendMail(false);
                        });
                    }
                }
            }
        }
        setLoadingSendMail(false);
    };

    return (
        <div className={"contact-container"}>
            <div className={"contact-me"}>
                <div className={`title-send-mail`}>
                    <h2>Liên hệ tôi</h2>
                </div>
                <StyledContactForm>
                    <form ref={form} onSubmit={sendEmail}>
                        <label>Tên</label>
                        <input type="text"
                               name="user_name"
                               placeholder={"Nhập vào tên của bạn..."}
                               onChange={(event) => {
                                   setUser_name(event.target.value);
                               }}/>
                        <label>Email</label>
                        <input type="email"
                               name="user_email"
                               placeholder={"Nhập vào Email của bạn..."}
                               onChange={(event) => {
                                   setEmail(event.target.value);
                               }}/>
                        <label>Lời nhắn</label>
                        <textarea name="message"
                                  placeholder={"Nhập vào nội dung tin nhắn..."}
                                  onChange={(event) => {
                                      setMsgEmail(event.target.value);
                                  }}/>
                        <button type={"submit"}>
                            <span>Gửi</span>
                            {loadingSendMail && (
                                <span style={{padding:"7px 5px"}}>
                                     <img src={loading_img} className="App-user-logo" alt="logo" />
                                </span>
                            )}
                        </button>
                    </form>
                </StyledContactForm>
            </div>
        </div>
    );
};

export default Contact;

const StyledContactForm = styled.div`
  width: 100%;

  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
    
    button{
    
     margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
      width:100%;
      border-radius:5px;
      
    
    }
  }
`;
