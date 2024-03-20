"use client";

import React, { useEffect, useState } from "react";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import BackgroundBox from "@/components/BackgroundBox";
import Button from "@/components/Button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const supabase = createClientComponentClient();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    }

    getUser();
  });

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

  const handleLogOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (user) {
    return (
      <BackgroundBox>
        <h1>Already logged in</h1>
        <Button shape="box" onClick={handleLogOut}>
          Log out
        </Button>
      </BackgroundBox>
    );
  }

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
