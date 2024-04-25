import Cookies from 'js-cookie';
import {redirect} from 'react-router-dom'
import { AUTH } from './constants'

export function isLogin()
{
    let token = Cookies.get(AUTH.ACCESS_TOKEN) ;
    //console.log('Route protection: '+token);
    if(!token)
        return redirect('/');
    return null;
}

export function getToken()
{
    let token = Cookies.get(AUTH.ACCESS_TOKEN) ;
    return token;
    //console.log('getToken: '+token);
    // if (token){
    //     return token;
    // } else {
    //     return redirect('/');
    // }
}


export function removeToken()
{
    Cookies.remove(AUTH.ACCESS_TOKEN);
    Cookies.remove(AUTH.ID_TOKEN);
    Cookies.remove(AUTH.REFRESH_TOKEN);
}