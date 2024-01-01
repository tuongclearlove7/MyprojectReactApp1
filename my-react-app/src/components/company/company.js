import React, {useContext, useEffect, useState} from 'react';
import CompanyItem from "../company/companyItem";
import Header from "../header/header";
import {UserContext} from "../../feature/userContext";

//component
function Company(props) {

    const {setTitlePage} = useContext(UserContext);

    useEffect(() => {

        setTitlePage(props.title);

    }, [props.title, setTitlePage]);

    return (
        <div className="home-container">
            <CompanyItem title={props.title}/>
        </div>
    );
}

export default Company;