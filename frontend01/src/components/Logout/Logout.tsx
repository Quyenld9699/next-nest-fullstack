'use client';
import { Button } from 'antd';
import { signOut } from 'next-auth/react';
import React from 'react';

export default function Logout() {
    return (
        <Button color="red" onClick={() => signOut()}>
            Logout
        </Button>
    );
}
