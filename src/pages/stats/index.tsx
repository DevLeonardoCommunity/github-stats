import { useGitHubQuery } from "@/hooks/useGitHubQuery";

export default function Stats() {
  const { data: ghStats, isLoading } = useGitHubQuery();

  if (isLoading) return <div>Loading...</div>;
  console.log(ghStats);
  return (
    <div>
      {ghStats?.user?.contributionsCollection?.pullRequestContributionsByRepository.map(
        ({ repository, contributions: { totalCount, nodes } }: any) => (
          <div className="collapse bg-base-200" key={repository.name}>
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
              {repository.owner.login}/{repository.name}
            </div>
            <div className="collapse-content">
              {totalCount}
              {nodes.map(({ pullRequest: { state, title } }: any) => (
                <div key={title}>
                  {title} + {state}
                </div>
              ))}
            </div>
          </div>
        )
      )}
      <pre>{JSON.stringify(ghStats, null, 2)}</pre>
    </div>
  );
}
