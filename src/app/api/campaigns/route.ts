import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config"; // ✅ Import config module
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

// Define bucket name
const BUCKET_NAME = "campaign-assets";

export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "6"); // Default: 9 campaigns per page
        const start = (page - 1) * limit;
        //console.log(page, limit, start);
        const end = start + limit - 1;

        // Fetch total count
        const { count, error: countError } = await supabase
            .from("campaigns")
            .select("*", { count: "exact", head: true });

        if (countError) throw countError;

        // Fetch campaigns along with category & media details
        const { data, error } = await supabase
            .from("campaigns")
            .select(`
            id, title, description, fundraising_goal, created_at,
            categories(name),
            campaign_details(cover_image),
            donations(amount)
        `)
            .order("created_at", { ascending: false }).range(start, end);//pagination   

        if (error) throw error;
        //console.log(data);

        // Construct image URLs
        const campaignsWithImageUrls = data.map((campaign) => {
            const totalRaised = campaign.donations ? campaign.donations.reduce((sum, d) => sum + (d.amount || 0), 0) : 0;
            const progress = Math.min((totalRaised / (campaign.fundraising_goal || 1)) * 100, 100); // Avoid divide by zero
            const image_url = campaign.campaign_details[0]?.cover_image
                ? `${config.SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${campaign.id}/${campaign.campaign_details[0].cover_image}`
                : "/placeholder.jpg"; // Default if no image
            return {
                ...campaign,
                image_url,
                total_raised: totalRaised,
                progress,
                fundraising_goal: campaign.fundraising_goal ?? 0,
            };
        });
        //console.log(campaignsWithImageUrls);
        return NextResponse.json(
            {
            campaigns : campaignsWithImageUrls,
            total: count, // ✅ Return total count for frontend pagination
            page,
            limit
            }
        );
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Failed to fetch campaigns" }, { status: 500 });
    }
}