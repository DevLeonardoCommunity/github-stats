import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Showcase your GitHub stats</h1>
      {session ? (
        <Link href={"/stats"} className="btn btn-primary">
          Get Started
        </Link>
      ) : (
        <button onClick={() => signIn()} className="btn">
          Sign in
        </button>
      )}
    </div>
  );
}
