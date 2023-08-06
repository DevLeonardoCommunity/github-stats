import { useGitHubPullRequests } from "@/hooks/useGitHubPullRequests";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

const yearsRange = 4;

export default function Stats() {
  const { data: session } = useSession();
  const baseYear = new Date().getFullYear();
  const [year, setYear] = useState(baseYear);
  const { repositories, isLoading } = useGitHubPullRequests(year);

  return (
    <div className="h-full w-full px-4">
      <div className="w-full my-4">
        <h1 className="text-3xl text-center">
          {session?.user.name} ({session?.user.login})
        </h1>
        <div className="join mt-2">
          {new Array(yearsRange).fill(0).map((_, i) => {
            const radioYear = baseYear - yearsRange + i + 1;
            return (
              <input
                key={i}
                className="join-item btn"
                type="radio"
                name="year"
                aria-label={radioYear.toString()}
                onClick={() => setYear(radioYear)}
                checked={year === radioYear}
              />
            );
          })}
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2">
          {repositories?.map(
            ({ repository, contributions: { totalCount, nodes } }: any) => (
              <div key={repository.name} className="card bg-slate-700">
                <div className="card-body">
                  <h2 className="card-title flex justify-between">
                    <div className="flex justify-center items-center gap-2">
                      <Image
                        src={repository.owner.avatarUrl}
                        alt={repository.owner.login}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      {repository.owner.login}/{repository.name}
                    </div>
                    <div>{totalCount}</div>
                  </h2>
                  <div className="max-h-[200px] overflow-auto flex flex-col gap-1 px-1">
                    {nodes?.map(
                      ({ pullRequest: { state, title, id } }: any) => (
                        <div key={id} className="flex justify-between gap-2">
                          <span>{title}</span>
                          <span>{state}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
