"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface DonationDetail {
    id: string;
    donor_id: string;
    amount: number;
    payment_status: string;
    created_at: string;
    users: { full_name: string };
}

export default function DonationDetails({ params }: { params: { campaignId: string } }) {
    const [donations, setDonations] = useState<DonationDetail[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        async function fetchDonations() {
            try {
                const res = await fetch(`/api/donations/${params.campaignId}`);
                const data = await res.json(); // Don't cast yet

                if (!res.ok) {
                    throw new Error(data?.error || "Failed to load donations");
                }

                // Ensure the data is actually an array before using it
                if (!Array.isArray(data)) {
                    throw new Error("Unexpected response format");
                }

                // ✅ Map and convert data to match `DonationDetail` type
                const donations: DonationDetail[] = data.map((item) => ({
                    id: String(item.id),  // Ensure string type
                    donor_id: String(item.donor_id),  // Ensure string type
                    amount: Number(item.amount) || 0,  // Ensure it's a number
                    payment_status: String(item.payment_status),  // Ensure string type
                    created_at: String(item.created_at),  // Ensure string type
                    users: {
                        full_name: String(item.users?.full_name || "Anonymous")  // Handle missing user name
                    },
                }));

                // ✅ Set state with properly formatted data
                setDonations(donations);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchDonations();
    }, [params.campaignId]);


    return (
        <div className="p-6">
            <button onClick={() => router.back()} className="text-blue-600 hover:underline mb-4">← Back</button>
            <h2 className="text-xl font-bold mb-4">Donation Details</h2>

            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Donor</th>
                            <th className="p-3 border text-right">Amount</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id} className="hover:bg-gray-50">
                                <td className="p-3 border">{donation.users.full_name}</td>
                                <td className="p-3 border text-right">${donation.amount.toFixed(2)}</td>
                                <td className={`p-3 border ${donation.payment_status === "completed" ? "text-green-600" : "text-red-600"}`}>
                                    {donation.payment_status}
                                </td>
                                <td className="p-3 border">{new Date(donation.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}