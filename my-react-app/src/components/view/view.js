import React from "react";


function View(props){

    return(
        <div className="feature">
            <img src={props.image} alt={props.image || "Image not passed in."}  className='feature-image'/>
            <h1 className='feature-title'>{props.title || "Title not passed in."}</h1>
            {props.children}
            <p className='feature-desc'>
                {props.description || "Description not passed in."}
            </p>
        </div>
    );
}

export default View;