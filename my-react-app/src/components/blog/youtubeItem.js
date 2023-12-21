import React from "react";
import Home from "../home/home";
import RenderEffect from "../../feature/renderEffect";

function YoutubeItem(props){

    return(
        <div >
            <h1 className="youtube-title">
                <span>{RenderEffect(props.title, 30)||null}</span>
                <span style={{color:props.colorLan}}>
                </span>
                <br/>
                <span className={"post-item-blog"} id={"post-item-blog" + props.index}>
                    Post {props.index} created at {props.createdAT}
                </span>
            </h1>
            <div className="youtube-item">
                <img width={"100%"} src={props.image} alt=""/>
            </div>
            <div className="youtube-footer">
                <div className="youtube-info">
                    <h4 className="youtube-author">
                        {props.author || "author not passed in."}
                    </h4>
                    <p style={{width: "100%"}}>{props.content || "content not passed in"}</p>
                </div>
            </div>
        </div>
    );
}

export default YoutubeItem;
