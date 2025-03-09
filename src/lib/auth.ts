//Session Management Hook
import { createClient } from "@supabase/supabase-js";
import { config } from "@/lib/config";
import { useEffect, useState } from "react";

const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);

export function useSession() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function getUser() {
            const { data, error } = await supabase.auth.getUser();
            if (data?.user) {
                setUser({
                    id: data.user.id,
                    email: data.user.email,
                    avatar_url: data.user.user_metadata.avatar_url || null, // ✅ Store avatar
                });
            } else {
                setUser(null);
            }
        }
        getUser();
    }, []);

    return { user };
}

export async function signOut() {
    await supabase.auth.signOut();
    window.location.reload(); // ✅ Refresh page after sign-out
}