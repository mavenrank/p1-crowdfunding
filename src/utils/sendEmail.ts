import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send email verification based on provider
export async function sendVerificationEmail(email: string, token: string) {
    const emailProvider = process.env.EMAIL_PROVIDER || "supabase"; // Default to Supabase
    const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/verify?token=${token}`;

    if (emailProvider === "resend") {
        return sendResendEmail(email, verificationUrl);
    } else {
        return sendSupabaseEmail(email);
    }
}

// 🔹 Send email via Resend
async function sendResendEmail(email: string, verificationUrl: string) {
    try {
        await resend.emails.send({
            from: "no-reply@yourapp.com",
            to: email,
            subject: "Verify Your Account",
            html: `<p>Click the link to verify your account:</p>
                   <a href="${verificationUrl}">Verify Now</a>`,
        });
        console.log("Verification email sent via Resend");
    } catch (error) {
        console.error("Resend email failed:", error);
    }
}

// 🔹 Send email via Supabase
async function sendSupabaseEmail(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email`,
    });

    if (error) {
        console.error("Supabase email verification failed:", error.message);
    } else {
        console.log("Verification email sent via Supabase");
    }
}
