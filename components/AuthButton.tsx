import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  // TODO
  const profilePictureUrl = null;

  return user ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        className="w-10 h-10 rounded-full bg-primary hover:cursor-pointer"
      >
        {profilePictureUrl !== null ? (
          <img src={profilePictureUrl} />
        ) : (
          <MdAccountCircle size={40} color="0000" />
        )}
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral rounded-box w-52"
      >
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>
        <li>
          <Link href={"/settings"}>Settings</Link>
        </li>
        <li>
          <form action={signOut}>
            <button>Sign out</button>
          </form>
        </li>
      </ul>
    </div>
  ) : (
    <Link href="/login">
      <button className="btn btn-primary">Login</button>
    </Link>
  );
}
