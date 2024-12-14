import { useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  PullRequestContributionsByRepository,
  PullRequestState,
} from "@/types/github";

export const useFilteredRepositories = (
  repositories: PullRequestContributionsByRepository[],
  searchQuery: string,
  hideOwnRepo: boolean,
  pullRequestState: PullRequestState
) => {
  const { data: session } = useSession();

  const filteredRepositories = useMemo(() => {
    const filterOutOwnRepos = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      return repos?.filter(
        (repoData) => repoData.repository.owner.login !== session?.user.login
      );
    };

    const filterReposBySearchQuery = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      const query = searchQuery.toLowerCase();
      return repos?.filter((repoData) =>
        repoData.repository.name.toLowerCase().includes(query)
      );
    };

    const filterReposByPullRequestState = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      return repos?.filter((repoData) =>
        repoData.contributions.nodes.some(
          (contribution) => contribution.pullRequest.state === pullRequestState
        )
      );
    };

    const filterRepos = (repos: PullRequestContributionsByRepository[]) => {
      let filteredRepos = repos;
      if (!searchQuery) {
        filteredRepos = hideOwnRepo ? filterOutOwnRepos(repos) : repos;
      } else {
        const filteredReposBySearchQuery = filterReposBySearchQuery(repos);
        filteredRepos = hideOwnRepo
          ? filterOutOwnRepos(filteredReposBySearchQuery)
          : filteredReposBySearchQuery;
      }

      filteredRepos = pullRequestState
        ? filterReposByPullRequestState(filteredRepos)
        : filteredRepos;

      return filteredRepos;
    };

    return filterRepos(repositories);
  }, [repositories, searchQuery, hideOwnRepo, pullRequestState, session]);

  return filteredRepositories;
};
