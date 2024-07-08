"use client";

import { useRouter } from 'next/navigation';
import React from 'react'

interface Props {
    user: {
        id: string;
        name: string | null;
        public_library: boolean;
    }
}

function UserCard({user}: Props) {
    const router = useRouter();

    const onClick = () => {
        router.push(`/library?user=${user.id}`);
    }

    return (
        <div className="bg-base-200 p-8 rounded-lg cursor-pointer hover:bg-base-300" onClick={onClick}>
            <h1>{user.name ? user.name : "(" + user.id + ")"}</h1>
        </div>
    )
}

export default UserCard