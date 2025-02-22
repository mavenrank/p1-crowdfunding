import { useEffect, useState } from "react";
import  Button from "@/components/ui/Button";
import Link from "next/link";
import CampaignCard from "@/components/CampaignCard";

interface Campaign {
  id: number;
  title: string;
  description: string;
}

export default function Home() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    async function fetchCampaigns() {
      const response = await fetch("https://mockapi.example.com/campaigns");
      const data = await response.json();
      setCampaigns(data);
    }
    fetchCampaigns();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation */}
      <nav className="bg-blue-600 text-white p-4 text-center text-xl font-bold">
        Crowdfunding Platform
      </nav>
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-4">Crowdfunding Campaigns</h1>
        <Link href="/create">
          <Button className="mb-4">Create Campaign</Button>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-4">
        &copy; 2025 Crowdfunding Inc. All rights reserved.
      </footer>
    </div>
  );
}