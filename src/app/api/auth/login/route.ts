import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabaseClient"; // Supabase connection

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        // Fetch user from database
        const { data: user, error } = await supabase
            .from("users")
            .select("id, full_name, password, role")
            .eq("email", email)
            .single();

        if (error || !user) throw new Error("User not found");

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        // Return user details with role
        return NextResponse.json({
            id: user.id,
            name: user.full_name,
            role: user.role, // "fundraiser" or "donor"
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}