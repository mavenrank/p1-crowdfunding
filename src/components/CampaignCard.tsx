import Link from "next/link";

import SegmentedProgressBar from "@/components/ui/SegmentedProgressBar";
import { Campaign } from "@/types/Campaign";

interface CampaignProps {
    campaign: Campaign;
}

// Function to determine badge color based on category
const getCategoryColor = (category: string | null) => {
    const colors: { [key: string]: string } = {
        "Technology": "bg-blue-500 text-white",
        "Health & Wellness": "bg-green-500 text-white",
        "Environment": "bg-yellow-500 text-black",
        "Education": "bg-purple-500 text-white",
        "Arts": "bg-red-500 text-white",
        "Community": "bg-pink-500 text-white",
    };
    return category && colors[category] ? colors[category] : "bg-gray-500 text-white";
};

export default function CampaignCard({ campaign }: CampaignProps) {

    const progress = (campaign.total_raised / campaign.fundraising_goal) * 100; // Calculate % progress

    return (
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-80 transition-transform transform hover:scale-105 hover:shadow-lg">

            {/* Category Badge */}
            {campaign.categories?.name && (
                <span className={`absolute top-2 left-2 px-3 py-1 text-sm font-semibold rounded-full ${getCategoryColor(campaign.categories.name)}`}>
                    {campaign.categories.name}
                </span>
            )}

            {/* Campaign Image */}
            <img
                src={campaign.image_url}
                alt={campaign.title}
                className="w-full h-40 object-cover"
                onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            />

            {/* Campaign Content */}
            <div className="p-4">
                <h3 className="text-gray-600 font-bold">{campaign.title}</h3>
                <p className="text-gray-600 text-sm truncate">{campaign.description}</p>
                <p className="text-blue-600 font-semibold mt-2">
                    Goal: ${campaign.fundraising_goal.toLocaleString()}
                </p>

                {/* Progress Bar */}
                <SegmentedProgressBar progress={progress} />

                {/* View Campaign Button */}
                <Link href={`/campaign/${campaign.id}`}>
                    <span className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                        View Campaign
                    </span>
                </Link>
            </div>
        </div>
    );
}
