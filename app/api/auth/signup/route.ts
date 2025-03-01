import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

// Supabase setup
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function POST(req: Request) {
  try {
    const { fullName, email, password } = await req.json();

    // Check if the user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const { data, error } = await supabase
      .from("users")
      .insert([{ full_name: fullName, email, password: hashedPassword, role: "donor" }])
      .select()
      .single();

    if (error) throw error;
    
    // Send verification email
    const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(email);

    if (emailError) throw emailError;

    return NextResponse.json({ message: "User created! Check your email to verify your account." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
