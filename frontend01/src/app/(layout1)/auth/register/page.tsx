'use client';
import { Button, Input } from 'antd';
import React from 'react';

export default function Register() {
    return (
        <div>
            <div style={{ maxWidth: '300px', margin: '20px auto' }}>
                <Input placeholder="Email" name="email" /> <br /> <br />
                <Input placeholder="Name" name="full_name" /> <br /> <br />
                <Input.Password placeholder="Password" name="password" />
                <br /> <br />
                <Button type="primary">Register</Button>
            </div>
        </div>
    );
}
