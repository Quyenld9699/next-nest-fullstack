import { Button } from 'antd';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { auth } from 'src/auth';
import Logout from 'src/components/Logout/Logout';

export default async function Layout2({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await auth();
    return (
        <div>
            <div style={{ height: '55px', background: 'green', display: 'flex', placeItems: 'center', justifyContent: 'space-around' }}>
                <Link href={'/auth/login'}>Login</Link>
                <div>Layout2</div>
                <Link href={'/auth/register'}>Register</Link>
            </div>
            <div>
                <h3 style={{ margin: '8px', textAlign: 'right' }}>Welcome: {session?.user?.username || session?.user?.email || 'Username'}</h3>
                <div style={{ textAlign: 'right' }}>
                    <Logout />
                </div>
            </div>
            {children}
        </div>
    );
}
