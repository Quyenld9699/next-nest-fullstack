import axios from 'axios';
import { apiUrls } from './apiUrls';

export type TDataLogin = {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
    };
};
export async function login(email: string, password: string): Promise<TDataLogin> {
    const response = await axios.post(apiUrls.login, { username: email, password });
    return response.data;
}

export type TInputRegister = {
    email: string;
    password: string;
    name: string;
};
export async function register(dataPost: TInputRegister) {
    const response = await axios.post(apiUrls.register, dataPost);
    return response.data;
}

export type TInputVerifyEmail = {
    code: string;
    id: string;
};
export async function verifyEmail(dataPost: TInputVerifyEmail) {
    const response = await axios.post(apiUrls.verifyEmail, dataPost);
    return response.data;
}

export async function resendVerifyEmail(dataPost: { email: string }): Promise<{ id: string; email: string }> {
    const response = await axios.post(apiUrls.resendVerifyEmail, dataPost);
    return response.data;
}
