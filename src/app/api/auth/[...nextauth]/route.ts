import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { supabase } from "@/lib/supabaseClient"; // ✅ Supabase instance
import bcrypt from "bcrypt"; // ✅ Import bcrypt for password hashing

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        // Validate user from Supabase
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", email)
          .single();

        if (error || !data) throw new Error("User not found");

        // Validate password
        const isValid = await bcrypt.compare(password, data.password);
        if (!isValid) throw new Error("Invalid credentials");

        return { id: data.id, email: data.email, name: data.full_name, image: data.profile_picture };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {  // ✅ Ensure session.user exists before assignment
        session.user.id = token.id as string;
        session.user.image = token.image as string; // ✅ Add image field
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {token.id = user.id; // ✅ Assign user ID if available
      token.image = user.image || null;
      } // ✅ Ensure image is stored in token
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };