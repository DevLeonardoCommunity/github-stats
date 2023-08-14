import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 p-16">
      <h1 className="text-5xl font-bold">Showcase your GitHub stats</h1>
      <p className="text-xl w-[70%] text-center">
        Your contributions smartly organized
        <br />
        Show your efforts to your friends (and in your CV)
      </p>
      {status === "authenticated" ? (
        <Link href={`/stats/${session.user.login}`} className="btn btn-primary">
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
