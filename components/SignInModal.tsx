"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Redirect on success
import { signIn } from "next-auth/react";
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function SignInModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) return null;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Store error messages
    const router = useRouter();

    const handleSignIn = async () => {
        console.log("Signing in...");
        setError(""); // Reset error message

        const res = await signIn("credentials", {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });

        if (res?.error) {
            setError("Invalid email or password. Please try again.");
        } else {
            router.push("/dashboard"); // Redirect to dashboard after successful login
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                {/* Close Button */}
                <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800" onClick={onClose}>
                    ✖
                </button>

                {/* Title */}
                <h2 className="text-gray-500 text-3xl font-bold text-center mb-4">Sign In</h2>

                {/* Sign In Buttons */}
                <div className="space-y-3">
                    <button onClick={() => signIn("google")} className="w-full flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100">
                        <FaGoogle className="text-red-500" /> Sign in with Google
                    </button>
                    <button onClick={() => signIn("apple")} className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-black text-white hover:bg-gray-900">
                        <FaApple className="text-white" />  Sign in with Apple
                    </button>
                    <button onClick={() => signIn("facebook")} className="w-full flex items-center justify-center gap-2 p-3 rounded-md bg-[#1877F2] text-white hover:bg-[#165dbb]">
                        <FaFacebook className="text-white" />  Sign in with Facebook
                    </button>
                </div>

                {/* Divider */}
                <div className="my-4 text-center text-gray-500">or</div>

                {/* Email Sign In */}
                <input
                    type="email"
                    placeholder="Email Address"
                    className="text-gray-600 w-full p-2 border rounded-md mb-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="text-gray-600 w-full p-2 border rounded-md mb-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {/* Error Message */}
                {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

                <button className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
                    onClick={handleSignIn}>
                    Sign In
                </button>

                {/* Links */}
                <div className="mt-4 text-center">
                    <a href="#" className="text-blue-600 hover:underline">Forgot Password?</a>
                    <p className="mt-2 text-gray-500">
                        New user? <a href="#" className="text-blue-600 hover:underline">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
