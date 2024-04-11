import Link from "next/link";
import AuthButton from "../AuthButton";

export default function Header() {
  return (
    <div className="navbar border-b border-b-neutral-content px-4 py-2">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Homepage</Link>
            </li>
            <li>
              <Link href="/library/">Library</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center text-xl">Flashcards App</div>
      <div className="navbar-end gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search for Stack"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <AuthButton />
      </div>
    </div>
  );
}
