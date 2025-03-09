"use client";

import CampaignList from "@/components/CampaignList";

export default function LandingPage() {
    return (
        <div className="container mx-auto p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Explore Campaigns</h2>
            
            {/* ✅ Use CampaignList Component */}
            <CampaignList />
        </div>
    );
}