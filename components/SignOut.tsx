"use client";

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react'

function SignOut() {
    const router = useRouter();
    const supabase = createClient();
    
  const signOut = async () => {
    console.log("logging out...")
    supabase.auth.signOut()
        .then(() => {
            console.log("logged out!")
            return router.push("/login");
        })
        .catch((error) => {
            console.error("could not log out!", error);
        })
  };

  return (
    <button onClick={signOut}>Sign out</button>
  )
}

export default SignOut