"use client";

import { useEffect, useState } from "react";

type CampaignStats = {
    id: string;
    title: string;
    total_raised: number;
    fundraising_goal: number;
    image_url: string;
};

type DonationStats = {
    campaign_title: string;
    amount: number;
    donor_name: string;
    created_at: string;
};



export default function StatsPage() {
    const [stats, setStats] = useState({
        totalRaised: 0,
        totalCampaigns: 0,
        totalDonations: 0,
    });
    const [topCampaigns, setTopCampaigns] = useState<CampaignStats[]>([]);
    const [recentDonations, setRecentDonations] = useState<DonationStats[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            try {
                const response = await fetch("/api/stats");
                const data = await response.json();
                if (!response.ok) throw new Error(data.error || "Failed to fetch stats");

                setStats({
                    totalRaised: data.totalRaised,
                    totalCampaigns: data.totalCampaigns,
                    totalDonations: data.totalDonations,
                });
                setTopCampaigns(data.topCampaigns);
                setRecentDonations(data.recentDonations);
            } catch (error) {
                console.error("Error loading stats:", error);
            }
            setLoading(false);
        }

        fetchStats();
    }, []);

    if (loading) return <p className="text-center">Loading...</p>;

    return (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            {/* Header */}
            <h1 className="text-4xl font-bold text-center text-black mb-6">Platform Statistics</h1>

            {/* Overall Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mt-6">
                <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-3xl font-bold text-[#007bff]">${stats.totalRaised.toLocaleString()}</h3>
                    <p className="text-gray-600">Total Funds Raised</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-3xl font-bold text-[#007bff]">{stats.totalCampaigns.toLocaleString()}</h3>
                    <p className="text-gray-600">Active Campaigns</p>
                </div>
                <div className="p-6 bg-gray-100 rounded-lg shadow-sm">
                    <h3 className="text-3xl font-bold text-[#007bff]">{stats.totalDonations.toLocaleString()}</h3>
                    <p className="text-gray-600">Total Donations</p>
                </div>
            </div>

            {/* Top Funded Campaigns */}
            <section className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Top Funded Campaigns</h2>
                {topCampaigns.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {topCampaigns.map((campaign) => (
                            <div key={campaign.id} className="p-4 bg-white shadow-md rounded-lg">
                                <img src={campaign.image_url} alt={campaign.title} className="w-full h-40 object-cover rounded-lg" />
                                <h3 className="text-xl font-semibold text-black mt-3">{campaign.title}</h3>
                                <p className="text-gray-600">Raised: ${campaign.total_raised.toLocaleString()} / ${campaign.fundraising_goal.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No campaigns found.</p>
                )}
            </section>

            {/* Recent Donations */}
            <section className="mt-12">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Recent Donations</h2>
                {recentDonations.length > 0 ? (
                    <ul className="mt-6 space-y-4">
                        {recentDonations.map((donation, index) => (
                            <li key={index} className="border p-4 rounded shadow-md flex justify-between">
                                <span className="text-black font-semibold">{donation.donor_name}</span>
                                <span className="text-gray-600">{donation.campaign_title}</span>
                                <span className="text-green-600 font-bold">${donation.amount.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500 text-center mt-4">No donations yet.</p>
                )}
            </section>
        </div>
    );
}