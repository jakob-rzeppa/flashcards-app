import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import SignOut from "./SignOut";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        className="hover:cursor-pointer avatar rounded-full w-10 h-10 bg-primary"
      >
        <CgProfile className="w-full h-full text-primary-content" />
      </div>
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 text-base-content"
      >
        <li>
          <Link href={"/settings"}>Settings</Link>
        </li>
        <li>
          <SignOut />
        </li>
      </ul>
    </div>
  ) : (
    <Link href="/login">
      <button className="btn btn-primary">Login</button>
    </Link>
  );
}
