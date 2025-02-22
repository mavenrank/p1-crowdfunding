"use client";
import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign in to your account</h1>
      <button onClick={() => signIn("google")} className="mt-4 bg-red-500 text-white p-2 rounded">
        Sign in with Google
      </button>
      <button onClick={() => signIn("facebook")} className="mt-2 bg-blue-600 text-white p-2 rounded">
        Sign in with Facebook
      </button>
    </div>
  );
}