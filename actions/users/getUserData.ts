import { createClient } from "@/utils/supabase/server";

export default async function getUserData() {
    const supabase = createClient();

    const user = await supabase.auth.getUser();

    if (user.error) {
        console.error(user.error);
        return null;
    }

    const userId = user.data.user.id;

    const userData = await supabase.from("users").select("*").eq("id", userId);

    if (userData.error) {
        console.error(userData.error);
        return null;
    }

    return userData.data[0];
}