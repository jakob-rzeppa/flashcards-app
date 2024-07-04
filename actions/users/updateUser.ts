import { createClient } from "@/utils/supabase/client";

export async function updateUser(id: string, name: string | null, public_library: boolean) {
    const supabase = createClient();

    if (!name && public_library) throw new Error("Public_library cant be true if there is no name defined!");

    const {data, error} = await supabase.from("users").update({name, public_library}).eq("id", id);

    if (error) {
        throw new Error(error.message);
    }
}