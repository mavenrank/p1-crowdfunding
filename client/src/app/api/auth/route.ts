import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Example: Handle authentication logic
  if (body.email === "test@example.com" && body.password === "password") {
    return NextResponse.json({ success: true, message: "Login successful" });
  } else {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }
}