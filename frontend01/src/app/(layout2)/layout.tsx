import Link from 'next/link';
import React from 'react';

export default function Layout2({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <div style={{ height: '55px', background: 'green', display: 'flex', placeItems: 'center', justifyContent: 'space-around' }}>
                <Link href={'/auth/login'}>Login</Link>
                <div>Layout2</div>
                <Link href={'/auth/register'}>Register</Link>
            </div>
            {children}
        </div>
    );
}
