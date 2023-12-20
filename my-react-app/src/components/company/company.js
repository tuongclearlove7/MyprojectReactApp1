import React, {useContext, useEffect, useState} from 'react';
import CompanyItem from "../company/companyItem";
import Header from "../header/header";
import {UserContext} from "../../feature/UserContext";

//component
function Company(props){

    const { RedirectAccount, setTitlePage } = useContext(UserContext);

    useEffect(() => {

        RedirectAccount();
        setTitlePage(props.title);

    }, [props.title]);

    return(
        <div className="home-container">
            <CompanyItem title={props.title} />
        </div>
    );
}

export default Company;