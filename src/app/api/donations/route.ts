import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config"; // ✅ Import config module

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

// (rolled-up totals)
export async function GET(req: Request) {
    try {
        // Extract user ID from query params
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        // ✅ Use RPC to call the function with the userId
        const { data, error } = await supabase
            .rpc("get_donations_summary", { user_id: userId }) // Call the function with the donor_id
            .order("total_donated", { ascending: false });

        if (error) throw error;
        //console.log("Donation roll up", data);
        return NextResponse.json(data); // Return fetched data
    } catch (err: any) {
        return NextResponse.json({ error: err.message || "Failed to fetch donations" }, { status: 500 });
    }
}