import { MAIN_LOGIN_PROVIDER } from "@/pages/api/auth/[...nextauth]";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeSelector, Dropdown } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <header>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
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
            <ThemeSelector />
            {status === "authenticated" ? (
              <Dropdown
                align="dropdown-end"
                renderButton={
                  <label className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <Image
                        src={session.user.image ?? ""}
                        alt={session.user.name ?? ""}
                        width={40}
                        height={40}
                        priority
                      />
                    </div>
                  </label>
                }
                items={[
                  {
                    renderItem: (
                      <span>
                        Settings
                        <span className="badge">Soon</span>
                      </span>
                    ),
                  },
                  {
                    onClick: () => {
                      router.push("/profile");
                    },
                    renderItem: "Profile",
                  },
                  {
                    onClick: () => {
                      handleLogout();
                    },
                    renderItem: "Logout",
                  },
                ]}
              />
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
