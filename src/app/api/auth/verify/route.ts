import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ success: false, message: "Invalid token." }, { status: 400 });
  }

  // 🔹 Find user by token
  const { data, error } = await supabase.from("users").select("*").eq("verification_token", token).single();

  if (!data) {
    return NextResponse.json({ success: false, message: "Invalid or expired token." }, { status: 400 });
  }

  // 🔹 Update user to mark as verified
  await supabase.from("users").update({ is_verified: true, verification_token: null }).eq("email", data.email);

  return NextResponse.json({ success: true, message: "Account verified! You can now log in." }, { status: 200 });
}