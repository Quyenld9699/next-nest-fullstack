'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React from 'react';

export default function Layout1({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div>
            <div style={{ height: '55px', background: 'pink', display: 'flex', placeItems: 'center', justifyContent: 'space-around' }}>
                <Link href={'/dashboard'}>Dashboard</Link>
                <div>Layout1</div>
                <RouterLoginRegister />
            </div>
            {children}
        </div>
    );
}

function RouterLoginRegister() {
    const pathname = usePathname();
    return pathname === '/auth/login' ? <Link href={'/auth/register'}>Register</Link> : <Link href={'/auth/login'}>Login</Link>;
}
