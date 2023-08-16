import { MAIN_LOGIN_PROVIDER } from "@/pages/api/auth/[...nextauth]";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  const { data: session, status } = useSession();

  return (
    <>
      <header>
        <div className="navbar bg-slate-700">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 rounded-box w-52"
              >
                <li>
                  <Link href="/">Home</Link>
                </li>
                {status === "authenticated" && (
                  <li>
                    <Link href={`/stats/${session.user.login}`}>Stats</Link>
                  </li>
                )}
              </ul>
            </div>
            <Link href="/" className="btn btn-ghost normal-case text-xl">
              GitHub Stats
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/">Home</Link>
              </li>
              {status === "authenticated" && (
                <li>
                  <Link href={`/stats/${session.user.login}`}>Stats</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar-end">
            {status === "authenticated" ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      src={session.user.image ?? ""}
                      alt={session.user.name ?? ""}
                      width={40}
                      height={40}
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-700 rounded-box w-52"
                >
                  <li>
                    <a>
                      Settings
                      <span className="badge">Soon</span>
                    </a>
                  </li>
                  <li>
                    <a onClick={() => signOut()}>Logout</a>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                onClick={() => signIn(MAIN_LOGIN_PROVIDER)}
                className="btn"
              >
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
