"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [message, setMessage] = useState("Verifying...");

    useEffect(() => {
        async function verifyUser() {
            const token = searchParams.get("token");

            if (!token) {
                setMessage("Invalid verification link.");
                return;
            }

            fetch(`/api/auth/verify?token=${token}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setMessage("Account verified! Redirecting...");
                        setTimeout(() => router.push("/signin"), 3000);
                    } else {
                        //setMessage(data.message);
                        setMessage(`❌ ${data.error}`);
                    }
                })
                .catch(() => setMessage("Something went wrong. Try again later."));
        }
        verifyUser();
    }, []);

    return (
        <div className="max-w-md mx-auto text-center p-6">
            <h2 className="text-2xl font-bold">{message}</h2>
        </div>
    );
}