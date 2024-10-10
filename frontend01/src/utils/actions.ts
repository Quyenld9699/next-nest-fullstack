'use server';

import { signIn } from 'src/auth';
import { CustomAuthError } from './error';

export async function authenticate(email: string, password: string) {
    try {
        const response = await signIn('credentials', { email, password, redirect: false });
        return response;
    } catch (error) {
        if ((error as Error).name == 'InvalidEmailPasswordError') {
            return { error: (error as CustomAuthError).message, code: (error as CustomAuthError).code };
        } else if ((error as Error).name == 'InActiveAcounntError') {
            return { error: (error as CustomAuthError).message, code: (error as CustomAuthError).code };
        } else {
            return { error: 'Failed to sign in', code: 0 };
        }
    }
}
