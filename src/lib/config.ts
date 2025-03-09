import dotenv from "dotenv";

// Load environment variables manually in non-Next.js environments

/*if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
}
*/

// Load the correct `.env` file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || "development"}`;
dotenv.config({ path: envFile });
console.log(`Loaded environment variables from: ${envFile}`);

// Export config variables
export const config = {
    SUPABASE_URL: process.env.SUPABASE_URL || "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "",
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "",
};
