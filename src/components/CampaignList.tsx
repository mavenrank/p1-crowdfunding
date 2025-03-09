"use client";

import { useState, useEffect } from "react";
import CampaignCard from "./CampaignCard";
import { Campaign } from "@/types/Campaign";   // ✅ Import Campaign type

const CampaignList = () => {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]); // ✅ Use typed state
    const [page, setPage] = useState(1);
    const [limit] = useState(9); // ✅ Configurable limit
    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / limit);

    useEffect(() => {
        const fetchCampaigns = async () => {
            const res = await fetch(`/api/campaigns?page=${page}&limit=${limit}`);
            const data = await res.json();
            setCampaigns(data.campaigns);
            setTotal(data.total);
        };

        fetchCampaigns();
    }, [page]);

    return (
        <div className="p-6">
            {/* Campaign Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {campaigns.map((campaign) => (
                    <CampaignCard key={campaign.id} campaign={campaign} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    className={`px-4 py-2 rounded-md ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    ← Previous
                </button>
                
                <span className="text-lg font-semibold">{page} / {totalPages}</span>

                <button
                    className={`px-4 py-2 rounded-md ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};

export default CampaignList;