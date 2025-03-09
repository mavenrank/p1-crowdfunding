import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string;
      image?: string; // ✅ Ensure image field exists
    };
  }

  interface JWT {
    id: string;
    image?: string; // ✅ Ensure image field exists in JWT
  }
}