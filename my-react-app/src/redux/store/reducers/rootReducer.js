import io from "socket.io-client";
import {auth_name} from "../../../model/secrectName";

const socket = io.connect(process.env.REACT_APP_API_HOSTNAME, {
    extraHeaders: {
        [auth_name] : `${process.env.REACT_APP_AUTH_METHOD} ${process.env.REACT_APP_ACCESS_KEY}`,
    },
});

const initState = {

    data : [

        {socket},
    ]
}

const rootReducer = (state = initState, action) =>{

    return state;
}

export default rootReducer;