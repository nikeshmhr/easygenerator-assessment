import axios, { AxiosResponse } from "axios";
import { Inputs as SignInInputs } from "./signin";
import { Inputs as SignUpInputs } from "./signup";

const axiosInstance = axios.create(
    {
        baseURL: process.env.REACT_APP_BACKEND,
    }
)

function getToken() {
    return window.localStorage.getItem('accessToken');
}

export function signin(data: SignInInputs) {
    return axiosInstance.post<SignInInputs, AxiosResponse<{ access_token: string }>>('/auth/login', data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

export function signup(data: SignUpInputs) {
    return axiosInstance.post<SignUpInputs, AxiosResponse<{ name: string, email: string, _id: string }>>('/users', data, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    })
}

export function getProfile() {
    return axiosInstance.get<any, AxiosResponse<{ name: string, email: string }>>('/users/me', {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}


export default axiosInstance;