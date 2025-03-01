import dotenv from "dotenv";

// Load environment variables manually in non-Next.js environments

/*if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}
*/

// Load the correct `.env` file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });

// Export config variables
export const config = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
};
