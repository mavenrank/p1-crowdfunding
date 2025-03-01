import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // ✅ Ensure ID always exists
      email: string;
      name?: string;
    };
  }
}