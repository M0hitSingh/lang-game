import axios from "axios"
import {BaseUrl} from '../baseUrl';

axios.defaults.baseURL = BaseUrl;

export const signup = async (data)=>{
    return await axios.post("/auth/signup",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

export const login = async (data)=>{
    return await axios.post("/auth/login",data)
    .then((res)=>{
        return Promise.resolve(res.data)
    })
    .catch((err)=>{
        console.log(err);
        return Promise.reject(err)
    })
}

