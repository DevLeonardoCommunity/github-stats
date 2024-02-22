import { MAIN_LOGIN_PROVIDER } from "@/pages/api/auth/[...nextauth]";
import { signIn, signOut, useSession } from "next-auth/react";
import { ThemeSelector, Dropdown, DropdownProps } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";

export const Header = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const navDropdownItems = useNavDropdownItems();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      <header>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <Dropdown
              renderButton={
                <label htmlFor="menu" className="btn btn-ghost lg:hidden">
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
              }
              items={navDropdownItems}
            />
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

const useNavDropdownItems = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const navDropdownItems = useMemo(() => {
    const items: DropdownProps["items"] = [
      {
        renderItem: "Home",
        onClick: () => {
          router.push("/");
        },
      },
    ];
    if (status === "authenticated") {
      items.push({
        renderItem: "Stats",
        onClick: () => {
          if (session) {
            router.push(`/stats/${session.user.login}`);
          }
        },
      });
    }
    return items;
  }, [status, router, session]);
  return navDropdownItems;
};
