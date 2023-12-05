import React, {useState} from "react";
import "./toggleStyle.css"

function Toggle(props) {

    const state = useState(false);
    const [on, setOn] = useState(false);
    let active = `toggle ${on ? 'active feature-desc' : ''}`;
    const handleToggle =()=>{

        setOn(on => {

            return !on;
        })
    }
    console.log(on);

    return(
        <div>
            <div className={active}
                 onClick={handleToggle}>
                <div className={`spinner ${on ? 'active' : ''}`}></div>
            </div>
        </div>
    );
}

export default Toggle;