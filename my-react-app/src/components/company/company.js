import React, {useEffect, useState} from 'react';
import CompanyItem from "../company/companyItem";
import Header from "../header/header";

//component
function Company(props){

    useEffect(() => {
        document.title = props.title;
    }, []);

    return(
        <div className="home-container">
            <CompanyItem title={props.title} />
        </div>
    );
}

export default Company;