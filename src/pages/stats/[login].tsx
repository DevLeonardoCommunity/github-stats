import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useGitHubPullRequests, useFilteredRepositories } from "@/hooks";
import { CardSkeleton, FormatStatsRender, ReposFilters } from "@/components";
import { RepositoryRenderFormat } from "@/types/github";

export default function Stats() {
  const { data: session } = useSession();
  const router = useRouter();
  const { login } = router.query;
  const baseYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(baseYear);
  const [format, setFormat] = useState<RepositoryRenderFormat>("cards");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hideOwnRepo, setHideOwnRepo] = useState<boolean>(false);

  const { repositories, isLoading } = useGitHubPullRequests(
    year,
    login as string
  );

  const filteredRepositories = useFilteredRepositories(
    repositories,
    searchQuery,
    hideOwnRepo
  );

  return (
    <div className="h-full w-full px-4 flex flex-col gap-4">
      <div className="mt-4">
        <h2 className="text-3xl text-center">
          {session?.user.name &&
            session?.user.login &&
            `${session.user.name} (${session.user.login})`}
        </h2>
      </div>
      <ReposFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        baseYear={baseYear}
        year={year}
        setYear={setYear}
        hideOwnRepo={hideOwnRepo}
        setHideOwnRepo={setHideOwnRepo}
        format={format}
        setFormat={setFormat}
      />
      {isLoading ? (
        <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2 ">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      ) : (
        <FormatStatsRender
          repositories={filteredRepositories}
          format={format}
        />
      )}
    </div>
  );
}
