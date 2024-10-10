'use client';
import { Button, Input, Modal, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ReturnStatusCode } from 'src/constants';
import { resendVerifyEmail, verifyEmail } from 'src/services/callApi';
import { authenticate } from 'src/utils/actions';

export default function Login() {
    const [dataLogin, setDataLogin] = useState<{ email: string; password: string }>({ password: '', email: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [code, setCode] = useState<{ id: string; code: string }>({ id: '', code: '' });
    const router = useRouter();

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode((prev) => {
            return { ...prev, code: e.target.value };
        });
    };

    const handleChange = (key: string, value: string) => {
        setDataLogin({ ...dataLogin, [key]: value });
    };

    async function handleSubmit() {
        try {
            const response = await authenticate(dataLogin.email, dataLogin.password);
            if (response.error) {
                console.log('data', response);
                notification.error({ message: response.error });

                if (response.code === ReturnStatusCode.NOT_ACTIVATE_ACCOUNT) {
                    setIsModalOpen(true);
                    // setCode({ id: response.id, code: '' });
                }
            } else {
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Failed to sign in', error);
        }
    }

    async function handleVerify() {
        try {
            const response = await verifyEmail({ id: code.id, code: code.code });
            console.log('data', response);
            notification.success({ message: 'Verify success!' });
            router.push('/dashboard');
        } catch (error) {
            console.error('Failed to verify', error);
            notification.error({ message: (error as any)?.response?.data?.message || (error as Error).message });
        }
    }

    async function handleResendEmail() {
        try {
            const response = await resendVerifyEmail({ email: dataLogin.email });
            console.log('data', response);
            setCode((prev) => ({ ...prev, id: response.id }));
            notification.success({ message: 'Resend verify code success!' });
        } catch (error) {
            console.error('Failed to sign in', error);
            notification.error({ message: (error as any)?.response?.data?.message || (error as Error).message });
        }
    }

    return (
        <div>
            <div style={{ maxWidth: '300px', margin: '20px auto' }}>
                <Input value={dataLogin.email} placeholder="Email" name="email" onChange={(e) => handleChange('email', e.target.value)} /> <br /> <br />
                <Input.Password placeholder="Password" name="password" onChange={(e) => handleChange('password', e.target.value)} />
                <br /> <br />
                <Button type="primary" onClick={handleSubmit}>
                    Login
                </Button>
            </div>

            <Modal title="Verify email" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Button onClick={handleResendEmail}>Resend Verify Code</Button>
                <br />
                <br />
                <Input value={code.code} placeholder="Enter verify code..." onChange={handleCodeChange} />
                <br />
                <br />
                <Button type="primary" onClick={handleVerify}>
                    Submit{' '}
                </Button>
            </Modal>
        </div>
    );
}
