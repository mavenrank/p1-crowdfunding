import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

export async function GET() {
    try {
        // Total Funds Raised
        const { data: totalRaisedData, error: raisedError } = await supabase
            .from("donations")
            .select("amount");

        const totalRaised = raisedError ? 0 : totalRaisedData.reduce((sum, donation) => sum + donation.amount, 0);

        // Total Campaigns
        const { count: totalCampaigns, error: campaignError } = await supabase
            .from("campaigns")
            .select("*", { count: "exact", head: true });

        // Total Donations
        const { count: totalDonations, error: donationError } = await supabase
            .from("donations")
            .select("*", { count: "exact", head: true });

        // Top Funded Campaigns
        const { data: topCampaigns, error: topCampaignsError } = await supabase
            .from("campaigns")
            .select("id, title, total_raised, fundraising_goal, image_url")
            .order("total_raised", { ascending: false })
            .limit(5);

        // ✅ Corrected Recent Donations Query
        /*const { data: recentDonations, error: recentDonationsError } = await supabase
            .from("donations")
            .select("amount, created_at, users!inner(full_name AS donor_name), campaigns!inner(title AS campaign_title)")
            .order("created_at", { ascending: false })
            .limit(5);
        */

        // ✅ Corrected Recent Donations Query
        // ✅ Call Supabase Function (RPC) to Get Recent Donations
        const { data: recentDonations, error: rpcError } = await supabase.rpc("get_recent_donations");

        if (rpcError) {
            console.error("RPC Error:", rpcError);
            return NextResponse.json({ error: "Failed to fetch recent donations" }, { status: 500 });
        }

        //console.log("Recent Donations:", recentDonations);
        /* if (recentDonationsError) {
            console.error("Error fetching recent donations:", recentDonationsError);
        }
        */

        // ✅ Format Donations Correctly
        const donationsFormatted = recentDonations?.map((donation: { campaign_title: string; amount: number; donor_name: string; created_at: string }) => ({
            campaign_title: donation?.campaign_title || "Unknown Campaign",  // ✅ Now campaign_title is a direct field
            amount: donation?.amount || 0,
            donor_name: donation?.donor_name || "Anonymous",  // ✅ Now donor_name is a direct field
            created_at: donation?.created_at,
        })) || [];

        return NextResponse.json({
            totalRaised,
            totalCampaigns: totalCampaigns || 0,
            totalDonations: totalDonations || 0,
            topCampaigns: topCampaigns || [],
            recentDonations: donationsFormatted,
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 });
    }
}
