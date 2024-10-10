import React, { useEffect } from 'react';
import { auth } from 'src/auth';

export default async function Dashboard() {
    const session = await auth();
    return <div>{session?.user?.access_token}</div>;
}
