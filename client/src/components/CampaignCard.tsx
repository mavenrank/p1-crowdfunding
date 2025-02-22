import { Card, CardContent } from "@/components/ui/Card"
import  Button from "@/components/ui/Button"; 
import Link from "next/link";

interface CampaignProps {
  campaign: {
    id: number;
    title: string;
    description: string;
  };
}

export default function CampaignCard({ campaign }: CampaignProps) {
  return (
    <Card className="p-4">
      <CardContent>
        <h2 className="text-xl font-semibold">{campaign.title}</h2>
        <p className="text-gray-600">{campaign.description}</p>
        <Link href={`/campaign/${campaign.id}`}>
          <Button className="mt-2">View Campaign</Button>
        </Link>
      </CardContent>
    </Card>
  );
}
