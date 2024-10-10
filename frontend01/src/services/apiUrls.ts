import { register } from 'module';
import { BACKEND_URL } from './baseUrl';

export const apiUrls = {
    login: `${BACKEND_URL}/auth/login`,
    register: `${BACKEND_URL}/auth/register`,
    verifyEmail: `${BACKEND_URL}/auth/verify-email`,
    resendVerifyEmail: `${BACKEND_URL}/auth/resend-verify-email`,
};
