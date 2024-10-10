'use client';
import { Button, Input, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { verifyEmail } from 'src/services/callApi';

export default function VerifyAccount({ id }: { id: string }) {
    const [code, setCode] = React.useState('');
    const router = useRouter();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    };

    async function handleSubmit() {
        console.log('submit', { id, code });
        try {
            const response = await verifyEmail({ id, code });
            console.log('data', response);
            notification.success({ message: 'Verify success!' });
            router.push('/auth/login');
        } catch (error) {
            console.error('Failed to verify', error);
            notification.error({ message: (error as any)?.response?.data?.message || (error as Error).message });
        }
    }

    return (
        <div style={{ maxWidth: '500px', margin: '20px auto' }}>
            <h4>Verify user: {id}</h4>
            <p style={{ marginTop: '8px' }}>Code was sent to your email! Please check!</p>
            <br />
            <br />
            <Input name="code" placeholder="enter verify code..." value={code} onChange={handleInputChange} />
            <br />
            <br />

            <Button type="primary" onClick={handleSubmit}>
                Verify
            </Button>
        </div>
    );
}
