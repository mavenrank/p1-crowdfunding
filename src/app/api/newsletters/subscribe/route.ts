import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email, topicId } = await req.json();
    //console.log("Received Subscription Request:", { email, topicId }); // ✅ Debugging
    if (!topicId) {
        console.error("Error: Topic ID is missing!");
        return NextResponse.json({ error: "Invalid topic ID." }, { status: 400 });
    }
    const { data: existingSubscription } = await supabase
        .from("newsletter_subscriptions")
        .select("*")
        .eq("email", email)
        .eq("topic_id", topicId)
        .single();

    if (existingSubscription) {
        return NextResponse.json({ error: "Already subscribed to this topic." }, { status: 400 });
    }
    const { error } = await supabase.from("newsletter_subscriptions").insert([{ email, topic_id: topicId }]);
    if (error) {
        return NextResponse.json({ error: "Failed to subscribe." }, { status: 500 });
    }
    return NextResponse.json({ message: "Subscribed successfully!" }, { status: 200 });
}