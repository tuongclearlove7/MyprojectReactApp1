import Cookies from "js-cookie";

export const RedirectAccount = () =>{

    const username = Cookies.get('username');

    if(username){

        window.confirm('Bấm đăng xuất ra ngoài để trải nghiệm!');
        window.location = "/account";
    }
}