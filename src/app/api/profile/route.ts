import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";
import { Campaign } from "@/types/Campaign";
import { Donation } from "@/types/Donation";

export async function PUT(req: Request) {
    const { userId, profileData } = await req.json();

    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    await supabase.from("users").update(profileData).eq("id", userId);

    return NextResponse.json({ message: "Profile updated successfully" });
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) return NextResponse.json({ error: "User ID is required" }, { status: 400 });

    // Fetch user info
    const { data: user, error: userError } = await supabase.from("users").select("*").eq("id", userId).single();
    if (userError) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let profile: { full_name: string; avatar_url: string; bio?: string } = { full_name: user.full_name, avatar_url: user.avatar_url };
    let campaigns: Campaign[] = [];
    let donations: Donation[] = [];

    if (user.role === "fundraiser") {
        const { data: fundraiserData } = await supabase.from("fundraisers_details").select("*").eq("user_id", userId).single();
        if (fundraiserData) profile = { ...profile, bio: fundraiserData.bio };

        const { data: campaignsData } = await supabase.from("campaigns").select("id, title, total_raised, description, fundraising_goal, image_url, progress").eq("created_by", userId);
        //campaigns = campaignsData || [];
        campaigns = campaignsData as Campaign[] || [];
    } else {
        // Fetch Donations with Campaign Title
        const { data: donationsData } = await supabase
            .from("donations")
            .select("amount, campaigns(title, id)")
            .eq("donor_id", userId);

        // Format Donations Properly
        donations = donationsData?.map((donation: any) => ({
            campaign_title: donation.campaigns?.title || "Unknown Campaign",
            total_donated: donation.amount,
        })) as Donation[] || [];

    }
    return NextResponse.json({ user, profile, campaigns, donations });
}