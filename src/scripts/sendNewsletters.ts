import { createClient } from "@supabase/supabase-js";
import sgMail from "@sendgrid/mail";
import { config } from "@/lib/config";

sgMail.setApiKey(config.SENDGRID_API_KEY);
const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_SERVICE_ROLE_KEY);

export async function sendMonthlyNewsletters() {
    // ✅ Get all newsletters for this month
    const { data: newsletters } = await supabase
        .from("newsletters")
        .select("id, topic_id, subject, content")
        .gte("sent_at", new Date().toISOString().slice(0, 7) + "-01");

    if (!newsletters || !newsletters.length) return;

    for (const newsletter of newsletters) {
        // ✅ Get all subscribers of the topic
        const { data: subscribers } = await supabase
            .from("newsletter_subscriptions")
            .select("email")
            .eq("topic_id", newsletter.topic_id);

        if (subscribers?.length) {
            const emails = subscribers.map((s) => s.email);
            const msg = {
                to: emails,
                from: "no-reply@yourplatform.com",
                subject: newsletter.subject,
                html: newsletter.content,
            };
            await sgMail.sendMultiple(msg);
        }
    }
}