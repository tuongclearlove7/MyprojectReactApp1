import React from "react";


function Info(props){

    return(
        <div className="info-container">
            <img width={"30%"} height={"20%"} src={props.image || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt={props.image || "149/149071.png"}  className='feature-image'/>
            <h1 className='feature-title'>Họ tên: {props.username || "Title not passed in."}</h1>
            {props.children}
            <p className='feature-desc'>
                Email: {props.email || "Description not passed in."}
            </p>
        </div>
    );
}

export default Info;