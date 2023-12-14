import React from "react";
import RenderEffect from "../../feature/renderEffect";

function YoutubeItem(props){

    return(
        <div >
            <h1 className="youtube-title">
                <span>{RenderEffect(props.title1)||null}</span>
                <span style={{color:props.colorLan}}>
                    <a style={{color:props.colorLan, textDecoration:"none"}} href={props.slug}>
                        {RenderEffect(props.title2) || null}
                    </a>
                </span>
                <span>{RenderEffect("cùng ")}</span>
                <span>{RenderEffect(props.title3) || null}</span>
            </h1>
            <div className="youtube-item">
                <img width={"100%"} src={props.image} alt=""/>
            </div>
            <div className="youtube-footer">
                <div className="youtube-info">
                    <h4 className="youtube-author">
                        {props.author || "author not passed in."}
                    </h4>
                    <p style={{width: "70%"}}>{props.content || "content not passed in"}</p>
                </div>
            </div>
        </div>
    );
}

export default YoutubeItem;
