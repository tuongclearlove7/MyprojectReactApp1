import React, {useState} from 'react';
import View from "./View";

const Learn = () => {

    const [turn, setTurn] = useState(false);

    return (
        <div>
            {/*<button onClick={e=>*/}
            {/*    setTurn(true)}>*/}
            {/*    TEST API*/}
            {/*</button>*/}
            {/*{turn && }*/}
            <View/>
        </div>
    );
};

export default Learn;