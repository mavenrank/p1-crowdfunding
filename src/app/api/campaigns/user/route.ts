import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);
const BUCKET_NAME = "campaign-assets";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const user_id = searchParams.get("user_id");

        if (!user_id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // Fetch campaigns for the user
        const { data, error } = await supabase
            .from("campaigns")
            .select(`
                id, title, description, fundraising_goal, created_at,
                categories(name),
                campaign_details(cover_image),
                donations(amount)
            `)
            .eq("created_by", user_id) // Filter by user ID
            .order("created_at", { ascending: false });

        if (error) throw error;

        // Construct campaign image URLs and progress
        const campaigns = data.map((campaign) => {
            const totalRaised = campaign.donations ? campaign.donations.reduce((sum, d) => sum + (d.amount || 0), 0) : 0;
            const progress = Math.min((totalRaised / (campaign.fundraising_goal || 1)) * 100, 100);

            const image_url = campaign.campaign_details[0]?.cover_image
                ? `${config.SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${campaign.id}/${campaign.campaign_details[0].cover_image}`
                : "/placeholder.jpg";

            return {
                ...campaign,
                image_url,
                total_raised: totalRaised,
                progress,
                fundraising_goal: campaign.fundraising_goal ?? 0,
            };
        });

        return NextResponse.json(campaigns);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Failed to fetch user campaigns" }, { status: 500 });
    }
}