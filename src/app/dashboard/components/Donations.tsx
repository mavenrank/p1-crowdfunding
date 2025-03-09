"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {Donation} from "@/types/Donation";

export default function Donations() {
    const { data: session } = useSession();
    const [donations, setDonations] = useState<Donation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!session || !session.user?.id) return;

        async function fetchDonations() {
            try {
                //const userId = localStorage.getItem("userId"); // Assume userId is stored locally
                //if (!userId) throw new Error("User ID not found");
                if (!session || !session.user?.id) {
                    throw new Error("Session or user ID not found");
                }
                const res = await fetch(`/api/donations?userId=${session.user.id}`);
                const data = await res.json(); // Don't cast yet
                if (!res.ok) {
                    throw new Error(data?.error || "Failed to load donations");
                }
                // Ensure the data is actually an array before using it
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format");
                }
                // Convert `data` into `Donation[]` type
                const donations: Donation[] = data.map((item) => ({
                    campaign_id: String(item.campaign_id), // Ensure it's a string
                    campaign_title: String(item.campaign_title || "Unknown"), // Handle potential missing title
                    total_donated: Number(item.total_donated) || 0, // Ensure it's a number
                }));
                setDonations(donations);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchDonations();
    }, []);

    return (
        <div className="p-6">
    <h2 className="text-xl font-bold mb-4 text-black">My Donations</h2>

    {loading && <p className="text-center">Loading...</p>}
    {error && <p className="text-red-500 text-center">{error}</p>}

    <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead>
                <tr className="bg-black text-white"> 
                    <th className="p-3 border">Campaign</th>
                    <th className="p-3 border text-right">Total Donated</th>
                    <th className="p-3 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                {donations.map((donation) => (
                    <tr key={donation.campaign_id} className="hover:bg-blue-100 transition">
                        <td className="p-3 border text-black">{donation.campaign_title}</td>
                        <td className="p-3 border text-right font-semibold text-[#007bff]">${donation.total_donated.toFixed(2)}</td> 
                        <td className="p-3 border">
                            <Link href={`/dashboard/donations/${donation.campaign_id}`} className="text-[#007bff] hover:underline">
                                View Details
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
</div>);
}
