'use client';
import { Button, Input, notification } from 'antd';
import { useRouter } from 'next/navigation';
import React from 'react';
import { register } from 'src/services/callApi';

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        email: '',
        fullName: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    async function handleSubmit() {
        try {
            const response = await register({
                email: formData.email,
                name: formData.fullName,
                password: formData.password,
            });
            console.log('data', response);
            router.push('/auth/verify/' + response?._id);
        } catch (error) {
            console.log('Failed to sign in', error);
            notification.error({ message: (error as any)?.response?.data?.message || (error as Error).message });
        }
    }

    return (
        <div>
            <div style={{ maxWidth: '300px', margin: '20px auto' }}>
                <Input placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                <br /> <br />
                <Input placeholder="Name" name="fullName" value={formData.fullName} onChange={handleChange} />
                <br /> <br />
                <Input.Password placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
                <br /> <br />
                <Button type="primary" onClick={handleSubmit}>
                    Register
                </Button>
            </div>
        </div>
    );
}
