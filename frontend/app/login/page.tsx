"use client";
import {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import {useAuthContext} from "@/app/context/AuthContext";
import {isAssetError} from "next/dist/client/route-loader";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const router = useRouter();
  const { isAuthenticated, login } = useAuthContext();

  useEffect(() => {
      if (isAuthenticated) {
          router.replace('/');
      }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();

      try{
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });

          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Login failed');

          login(data.access_token);
          router.push('/')
      }
      catch (err: any) {
          setError(err.message)
      }

  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border px-2 py-1 mb-2 block w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-2 py-1 mb-2 block w-full"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}
