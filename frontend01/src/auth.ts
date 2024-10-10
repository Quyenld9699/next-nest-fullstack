import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { IUser } from './types/next-auth';
import { InActiveAcounntError, InvalidEmailPasswordError } from './utils/error';
import { login } from './services/callApi';
import { ReturnStatusCode } from './constants';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user: IUser | null = null;

                // logic to verify if user exists in your database
                // call backend API
                try {
                    const response = await login(credentials.email as string, credentials.password as string);
                    console.log('response', response);
                    user = {
                        _id: response.user.id,
                        email: response.user.email,
                        isVerify: true,
                        role: response.user.role,
                        username: response.user.name,
                        type: 'credentials',
                        access_token: response.access_token,
                    };
                } catch (error) {
                    const err = (((error as any)?.response?.data || null) as { message: string; statusCode: ReturnStatusCode }) || null;
                    if (err?.statusCode === ReturnStatusCode.UNAUTHORIZED) {
                        throw new InvalidEmailPasswordError();
                    }
                    if (err?.statusCode === ReturnStatusCode.NOT_ACTIVATE_ACCOUNT) {
                        throw new InActiveAcounntError();
                    }
                }

                if (!user) {
                    throw new InvalidEmailPasswordError();
                }

                // return user object with their profile data
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                // User is available during sign-in
                token.user = user as IUser;
            }
            return token;
        },
        session({ session, token }) {
            (session.user as IUser) = token.user;
            return session;
        },
        authorized: async ({ auth }) => {
            // Check if user is authorized
            return !!auth;
        },
    },
});
