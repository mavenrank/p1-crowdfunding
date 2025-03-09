import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

//detailed view of donations for a specific campaign
export async function GET(req: Request, { params }: { params: { campaignId: string } }) {
    try {
        const { campaignId } = params;

        if (!campaignId) {
            return NextResponse.json({ error: "Campaign ID is required" }, { status: 400 });
        }

        // Fetch all donations for a specific campaign
        const { data, error } = await supabase
            .from("donations")
            .select("id, donor_id, amount, payment_status, created_at, users(full_name)")
            .eq("campaign_id", campaignId)
            .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Failed to fetch donations" }, { status: 500 });
    }
}