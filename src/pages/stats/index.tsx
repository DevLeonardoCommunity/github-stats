import { useGitHubQuery } from "@/hooks/useGitHubQuery";
import { useSession } from "next-auth/react";

export default function Stats() {
  const { data: session } = useSession();
  const { data: ghStats, isLoading } = useGitHubQuery();

  if (isLoading) return <div>Loading...</div>;

  const repos =
    ghStats?.contributionsCollection?.pullRequestContributionsByRepository;

  return (
    <div className="h-full w-full px-4">
      <div className="w-full my-4">
        <h1 className="text-3xl text-center">
          {session?.user.name} ({session?.user.login})
        </h1>
      </div>
      <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2">
        {repos?.map(
          ({ repository, contributions: { totalCount, nodes } }: any) => (
            <div key={repository.name} className="card bg-slate-700">
              <div className="card-body">
                <h2 className="card-title flex justify-between">
                  <div>
                    {repository.owner.login}/{repository.name}
                  </div>
                  <div>{totalCount}</div>
                </h2>
                <div className="max-h-[200px] overflow-auto flex flex-col gap-1 px-1">
                  {nodes?.map(({ pullRequest: { state, title } }: any) => (
                    <div key={title} className="flex justify-between gap-2">
                      <span>{title}</span>
                      <span>{state}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
