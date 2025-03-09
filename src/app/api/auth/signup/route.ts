import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/utils/sendEmail";

export async function POST(req: Request) {
  try {
    const { fullName, email, password, role } = await req.json();
    const enableVerification = process.env.ENABLE_EMAIL_VERIFICATION === "true";

    // Check if the user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .single();

    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = enableVerification ? crypto.randomUUID() : null; // Generate token only if needed

    // Insert user into database
    const { data, error } = await supabase
      .from("users")
      .insert([{ full_name: fullName, email, password: hashedPassword, role: role || "donor", verification_token: token }])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // Send email verification only if enabled
    if (enableVerification && token) {
      await sendVerificationEmail(email, token);
      return NextResponse.json({ message: "User created successfully. Check your email to verify your account." }, { status: 201 });
    }

    // Send verification email - TODO: Uncomment this line after setting up email provider
    // const { error: emailError } = await supabase.auth.admin.inviteUserByEmail(email);
    // if (emailError) throw emailError;
    // return NextResponse.json({ message: "User created! Check your email to verify your account." });
    return NextResponse.json({ message: "User created successfully", user: data }, { status: 201 });

  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 400 });
  }
}

