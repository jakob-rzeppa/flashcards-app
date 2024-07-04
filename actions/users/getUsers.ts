import { createClient } from "@/utils/supabase/server";

export default async function getUsers() {
    const supabase = createClient();

    const {data, error} = await supabase
        .from("users")
        .select("*");

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}