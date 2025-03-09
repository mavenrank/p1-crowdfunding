"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface Campaign {
    id: string;
    title: string;
    description: string;
    fundraising_goal: number;
    total_raised: number;
    progress: number;
    image_url: string;
    created_at: string;
    categories?: { name: string } | null;
}

const MyCampaigns = () => {
    const { data: session } = useSession();
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!session?.user?.id) return;

        const fetchCampaigns = async () => {
            try {
                const res = await fetch(`/api/campaigns/user?user_id=${session.user.id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error);
                setCampaigns(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCampaigns();
    }, [session?.user?.id]);

    if (loading) return <p className="text-center text-gray-600">Loading campaigns...</p>;
    if (error) return <p className="text-center text-red-600">{error}</p>;

    return (
        <div className="p-6">
            { /*<h2 className="text-2xl font-bold mb-6">My Campaigns</h2> */}

            {campaigns.length === 0 ? (
                <p className="text-gray-600 text-center">
                    You haven’t started any campaigns yet.
                    <Link href="/campaigns/new" className="text-blue-600 hover:underline">
                        Start a new campaign!
                    </Link>
                </p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {campaigns.map((campaign) => (
                        <div key={campaign.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
                            {/* Campaign Image */}
                            <img
                                src={campaign.image_url}
                                alt={campaign.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
                            />

                            {/* Campaign Info */}
                            <div className="p-4">
                                <h3 className="text-lg font-bold">{campaign.title}</h3>
                                <p className="text-gray-600 text-sm truncate">{campaign.description}</p>
                                
                                {/* Category */}
                                {campaign.categories && (
                                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded mt-2">
                                        {campaign.categories.name}
                                    </span>
                                )}

                                {/* Progress Bar */}
                                <div className="relative pt-3">
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2 bg-blue-600 rounded-full"
                                            style={{ width: `${campaign.progress}%` }}
                                        ></div>
                                    </div>
                                    <p className="text-sm text-gray-700 mt-1">
                                        Raised ${campaign.total_raised.toLocaleString()} / ${campaign.fundraising_goal.toLocaleString()}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="mt-4 flex justify-between items-center">
                                    <Link href={`/campaigns/${campaign.id}`} className="text-blue-600 text-sm hover:underline">
                                        View Details
                                    </Link>
                                    <Link
                                        href={`/campaigns/edit/${campaign.id}`}
                                        className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyCampaigns;