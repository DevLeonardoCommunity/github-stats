import { useGitHubQuery } from "@/hooks/useGitHubQuery";

export default function Stats() {
  const { data: ghStats, isLoading } = useGitHubQuery();

  return (
    <pre>{isLoading ? "Loading... " : JSON.stringify(ghStats, null, 2)}</pre>
  );
}
