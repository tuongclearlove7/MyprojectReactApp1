//rsc
import React, {useContext, useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {auth_name} from "../../../model/secrectName";
import {UserContext} from "../../../feature/userContext";


const ListUser = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const { RedirectAccount, setTitlePage, FetchAPI} = useContext(UserContext);
    const admin = Cookies.get('role_admin');
    const username = Cookies.get('username');
    const navigate = useNavigate();
    const hostname = `${process.env.REACT_APP_API_LOCALHOST}admin/list-users`;

    useEffect(() => {

        if(admin){
            const env = `${process.env.REACT_APP_AUTH_METHOD} ${admin}`
            FetchAPI(hostname, setListUsers, auth_name, env).then();
        }
    }, [admin]);

    console.log(listUsers);

    if(admin){

        return (
            <div className={'container-list-user'}>
                <div className={'layout-left'} >
                    {username}
                </div>
                <div className={'list-users'}>
                    <h3>Danh sách người dùng</h3>
                    <div className={'users'}>
                        <b>
                            {listUsers && listUsers.user && listUsers.user.map((user) => (
                                <div key={user.email}>
                                    <span>{user.firstName} {user.lastName}
                                    </span>
                                    <span style={user.is_online === 0? {color: 'red'} : {color:'#02d602'}}>
                                        {user.is_online === 0 ?' Offline' : ' Online'}
                                    </span>
                                </div>
                            ))}
                        </b>
                        <b>
                            {listUsers && listUsers.admin && listUsers.admin.map((admin) => (
                                <div key={admin.email}>
                                    <span style={{color:'#FF6F00',}}>Admin </span>
                                    <span>{`${admin.firstName}`} {`${admin.lastName}`}</span>
                                    <span style={admin.is_online === 0 ? {color: 'red'} : {color:'#02d602'}}>
                                        {admin.is_online === 0 ?  ' Offline' : ' Online'}
                                    </span>
                                </div>
                            ))}
                        </b>
                    </div>
                </div>
            </div>
        );
    }else{
        navigate('/account');
    }
};

export default ListUser;
