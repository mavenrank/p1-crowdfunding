"use client";

import { useSession } from "next-auth/react";
import ProfilePage from "@/components/ProfilePage";

export default function Settings() {
    const { data: session } = useSession();
    const userId = session?.user?.id || ""; // ✅ Extract user ID from session and provide a default value

    if (!session) {
        return <p className="text-center text-red-500">User not found. Please log in.</p>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Settings</h2>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <ProfilePage userId={userId} /> {/* ✅ Pass userId to ProfilePage */}
            </div>
        </div>
    );
}