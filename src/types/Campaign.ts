export interface Campaign {
    id: string;
    title: string;
    description: string;
    fundraising_goal: number;
    image_url: string;
    total_raised: number;
    progress: number;
    created_at: string;
    categories: { name: string } | null;
  }  