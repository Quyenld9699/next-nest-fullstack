import { JWT } from 'next-auth/jwt';

interface IUser {
    _id: string;
    username: string;
    email: string;
    isVerify: boolean;
    type: string;
    role: string;
    access_token: string;
}

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `auth`, contains information about the active session.
     */
    interface Session {
        user: IUser;
        access_token: string;
        refresh_token: string;
        access_expires: number;
        error: string;
    }
}

declare module 'next-auth/jwt' {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        access_token: string;
        refresh_token: string;
        user: IUser;
        access_expires: number;
        error: string;
    }
}
