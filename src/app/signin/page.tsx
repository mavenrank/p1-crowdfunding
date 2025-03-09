"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignIn = async () => {
        setError("");

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });

        if (res?.error) {
            setError("Invalid email or password. Please try again.");
        } else {
            router.push("/dashboard"); // Redirect to the dashboard after successful login
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-4 text-gray-500">Sign In</h2>

                {/* Error Message */}
                {error && <p className="text-red-500 text-center">{error}</p>}

                {/* Email & Password Sign In */}
                <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-2 border rounded-md mb-3 text-gray-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded-md mb-3 text-gray-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    onClick={handleSignIn}
                >
                    Sign In
                </button>

                {/* Divider */}
                <div className="my-4 text-center text-gray-500">or</div>

                {/* Social Logins */}
                <div className="space-y-3">
                    <button
                        onClick={() => signIn("google")}
                        className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100"
                    >
                        <FaGoogle className="text-red-500" /> Sign in with Google
                    </button>
                    <button
                        onClick={() => signIn("apple")}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-black text-white hover:bg-gray-900"
                    >
                        <FaApple className="text-white" /> Sign in with Apple
                    </button>
                    <button
                        onClick={() => signIn("facebook")}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-[#1877F2] text-white hover:bg-[#165dbb]"
                    >
                        <FaFacebook className="text-white" /> Sign in with Facebook
                    </button>
                </div>

                {/* Links */}
                <div className="mt-4 text-center">
                    <a href="/forgot-password" className="text-blue-600 hover:underline">
                        Forgot Password?
                    </a>
                    <p className="mt-2 text-blue-600">
                        New user?{" "}
                        <a href="/signup" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}