import { Button, Input } from 'antd';
import React from 'react';
import VerifyAccount from 'src/components/VerifyAccount/VerifyAccount';

export default function Verify({ params }: { params: { id: string } }) {
    const { id } = params;
    return <VerifyAccount id={id} />;
}
