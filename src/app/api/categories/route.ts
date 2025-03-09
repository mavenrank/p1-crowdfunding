import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase
  .from("categories")
  .select("id, name, icon_name, sub_categories(name)"); // ✅ Fetch subcategories
  //console.log(data);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json(data);
}