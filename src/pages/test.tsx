import { useGitHubQuery } from "@/hooks/useGitHubQuery";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Test() {
  const { data: session } = useSession();

  const { data: ghStats, isLoading } = useGitHubQuery();

  if (session) {
    return (
      <>
        Signed in as {session.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <pre>
          {isLoading ? "Loading... " : JSON.stringify(ghStats, null, 2)}
        </pre>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
