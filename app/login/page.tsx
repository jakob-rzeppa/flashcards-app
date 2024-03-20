"use client";

import React, { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import BackgroundBox from "@/components/BackgroundBox";
import Button from "@/components/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    const res = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (res.error) {
      alert("Please try again!");
    } else {
      router.push("/login/verification");
    }
  };

  const handleSignIn = async () => {
    const res = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (res.error) {
      alert("Please try again!");
    } else {
      router.push("/");
    }
  };

  return (
    <BackgroundBox>
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-4">Login / Sign Up</h1>
        <input
          className="mb-4 w-full text-lg py-1 px-2 outline-none bg-neutral-800 focus:bg-neutral-700 rounded-md"
          type="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 w-full text-lg py-1 px-2 outline-none bg-neutral-800 focus:bg-neutral-700 rounded-md"
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button classes="my-2 mr-2" shape="box" onClick={handleSignIn}>
          Sign In
        </Button>
        <Button classes="my-2" shape="box" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </BackgroundBox>
  );
}

export default LoginPage;
