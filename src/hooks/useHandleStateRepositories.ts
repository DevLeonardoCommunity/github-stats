import { useMemo } from "react";
import { useSession } from "next-auth/react";
import {
  PullRequestContributionsByRepository,
  PullRequestState,
  RepositoryOrder,
} from "@/types/github";
import { compareArrayString } from "@/utils/compare";

export const useHandleStateRepositories = (
  repositories: PullRequestContributionsByRepository[],
  searchQuery: string,
  hideOwnRepo: boolean,
  pullRequestState: PullRequestState,
  orderState: RepositoryOrder
) => {
  const { data: session } = useSession();

  const filteredRepositories = useMemo(() => {
    //Filter section
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
    /** */

    //Order section
    const orderRepoByOwner = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      return [...repos].sort((a, b) =>
        compareArrayString(a.repository.owner.login, b.repository.owner.login)
      );
    };
    const orderRepoByName = (repos: PullRequestContributionsByRepository[]) => {
      return [...repos].sort((a, b) =>
        compareArrayString(a.repository.name, b.repository.name)
      );
    };
    const orderRepoByCountAscending = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      return [...repos].sort(
        (a, b) => a.contributions.totalCount - b.contributions.totalCount
      );
    };
    const orderRepoByCountDescending = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      return [...repos].sort(
        (a, b) => b.contributions.totalCount - a.contributions.totalCount
      );
    };

    const orderRepos = (repos: PullRequestContributionsByRepository[]) => {
      let orderedRepos = repos;
      if (orderState === "OWNER") {
        orderedRepos =
          orderedRepos !== undefined ? orderRepoByOwner(repos) : orderedRepos;
      } else if (orderState === "REPOSITORY") {
        orderedRepos =
          orderedRepos !== undefined ? orderRepoByName(repos) : orderedRepos;
      } else if (orderState === "PRASCENDING") {
        orderedRepos =
          orderedRepos !== undefined
            ? orderRepoByCountAscending(repos)
            : orderedRepos;
      } else if (orderState === "PRDESCENDING") {
        orderedRepos =
          orderedRepos !== undefined
            ? orderRepoByCountDescending(repos)
            : orderedRepos;
      }

      return orderedRepos;
    };
    /** */

    const filterAndOrderRepos = (
      repos: PullRequestContributionsByRepository[]
    ) => {
      return orderRepos(filterRepos(repos));
    };

    return filterAndOrderRepos(repositories);
  }, [
    repositories,
    searchQuery,
    hideOwnRepo,
    pullRequestState,
    orderState,
    session,
  ]);

  return filteredRepositories;
};
