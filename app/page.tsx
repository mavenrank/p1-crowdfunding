"use client";

import { useEffect, useState } from "react";
import CampaignCard from "@/components/CampaignCard";

export default function LandingPage() {
    const [campaigns, setCampaigns] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchCampaigns() {
            try {
                const res = await fetch("/api/campaigns");
                const data = await res.json();

                if (!res.ok) throw new Error(data.error || "Failed to load campaigns");
                setCampaigns(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCampaigns();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Explore Campaigns</h2>
            {loading && <p className="text-center">Loading campaigns...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>
        </div>
    );
}
