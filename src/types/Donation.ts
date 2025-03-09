//List View of Donations
export interface Donation {
    campaign_id: string;
    campaign_title: string | "Unknown";
    total_donated: number;
}