import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

export async function GET() {
    const { data, error } = await supabase.from("newsletter_topics").select("*");
    if (error) return NextResponse.json({ error: "Failed to fetch topics" }, { status: 500 });
    return NextResponse.json(data);
}