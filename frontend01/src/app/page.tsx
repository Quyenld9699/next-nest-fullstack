import { Button } from 'antd';
import Link from 'next/link';

export default function Home() {
    console.log(process.env.AUTH_SECRET);
    return (
        <main>
            <div style={{ textAlign: 'center' }}>
                <ul>
                    <li>
                        <Link href={'/auth/login'}>Login</Link>
                    </li>
                    <li>
                        <Link href={'/auth/register'}>Register</Link>
                    </li>
                    <li>
                        <Link href={'/dashboard'}>Dashboard</Link>
                    </li>
                </ul>
            </div>
        </main>
    );
}
