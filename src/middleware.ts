import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Redirect to login if not authenticated
    if (!token) return NextResponse.redirect(new URL("/signin", req.url));

    return NextResponse.next();
}

// Protect all API routes under /api/private
// Protect API and dashboard routes
export const config = {
    //matcher: "/api/private/:path*",
    matcher: ["/dashboard/:path*", "/profile/:path*"],
};