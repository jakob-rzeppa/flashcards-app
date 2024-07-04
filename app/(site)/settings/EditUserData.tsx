"use client";

import { updateUser } from '@/actions/users/updateUser';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

interface Props {
    userData: {
        id: string;
        name: string | null;
        public_library: boolean;
    }
}

function EditUserData({userData}: Props) {
    const router = useRouter();

    const [username, setUsername] = useState(userData.name ? userData.name : "");
    const [isPublicLibrary, setIsPublicLibrary] = useState(userData.public_library);

    const onSave = () => {
        updateUser(userData.id, username, isPublicLibrary)
            .then(() => {
                router.push("/")
            })
            .catch(() => {
                router.refresh();
            })
    }

    return (
        <div className='flex flex-col m-8 max-w-96 mx-auto gap-4'>
        <input type="email" placeholder='username' className='input input-primary' value={username} onChange={(e) => setUsername(e.target.value)} />
        <div className="form-control">
            <label className="label cursor-pointer">
                <span className="label-text">Public Library</span>
                <input type="checkbox" className="checkbox checkbox-primary" disabled={!username} checked={isPublicLibrary} onChange={(e) => setIsPublicLibrary(e.target.checked)} />
            </label>
        </div>
        <button className='btn btn-primary' onClick={onSave}>Save</button>
    </div>
    )
}

export default EditUserData