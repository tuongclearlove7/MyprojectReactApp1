import React, {useRef, useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from "styled-components";
import {RedirectAccount} from "../../feature/redirectAccount";
import styles from "../../components/auth/registerStyle.module.css";


function RegisterMobileForm(props){


    return (
        <div className={"register-mobile-container"}>
            <div className={"contact-me"}>
                <div className={`title-send-mail`}>
                    <h2>TẠO TÀI KHOẢN</h2>
                </div>
                <StyledContactForm>
                    <form className={"mobile-form-register"} onSubmit={props.handleSubmit}>
                        <input
                            type="text"
                            placeholder="Họ"
                            name="firstName"
                            onChange={props.handleChange}
                            value={props.firstName}
                            required
                        />
                        <br/>
                        <input
                            type="text"
                            placeholder="Tên"
                            name="lastName"
                            onChange={props.handleChange}
                            value={props.lastName}
                            required
                        />
                        <br/>
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            onChange={props.handleChange}
                            value={props.email}
                            required
                        />
                        <br/>
                        <input
                            type="password"
                            placeholder="Mật khẩu"
                            name="password"
                            onChange={props.handleChange}
                            value={props.password}
                            required
                        />
                        <input type="submit" value="ĐĂNG KÝ" />
                    </form>
                </StyledContactForm>
            </div>
        </div>
    );
}

export default RegisterMobileForm;

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

    input[type=submit] {
      margin-top: 2rem;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
