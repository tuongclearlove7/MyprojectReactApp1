import React from "react";

function YoutubeItem(props){

    return(
        <div className='youtube-item'>
            <h1 className="youtube-title">
                {props.title || "title not passed in."}
            </h1>
            <div className="youtube-item">
                <img width={props.width} src={props.image} alt=""/>
            </div>
            <div className="youtube-footer">
                <div className="youtube-info">
                    <h4 className="youtube-author">
                        {props.author || "author not passed in."}
                    </h4>
                    <p>{props.content || "content not passed in"}</p>
                </div>
            </div>
        </div>
    );
}

export default YoutubeItem;
