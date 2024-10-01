'use client';
import { Button, Input } from 'antd';
import React from 'react';

export default function Login() {
    return (
        <div>
            <div style={{ maxWidth: '300px', margin: '20px auto' }}>
                <Input placeholder="Email" name="email" /> <br /> <br />
                <Input.Password placeholder="Password" name="password" />
                <br /> <br />
                <Button type="primary">Login</Button>
            </div>
        </div>
    );
}
