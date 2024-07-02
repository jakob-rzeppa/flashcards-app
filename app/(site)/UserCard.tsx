"use client";

import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    user: {
        email: string | null;
        id: string;
        public_library: boolean;
        username: string | null;
    }
}

function UserCard({user}: Props) {
    const router = useRouter();

    const onClick = () => {
        router.push(`/library?user=${user.id}`);
    }

    return (
        <div className="bg-base-200 p-8 rounded-lg cursor-pointer hover:bg-base-300" onClick={onClick}>
            <h1>{user.username ? user.username : user.email}</h1>
        </div>
    )
}

export default UserCard