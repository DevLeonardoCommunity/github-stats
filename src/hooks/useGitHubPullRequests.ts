import { pullRequestsQuery } from "@/graphql/queries";
import { PullRequestContributionsByRepository } from "@/types/github";
import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { useMemo } from "react";
import { useGitHubQuery } from "./useGitHubQuery";

export const useGitHubPullRequests = (year: number, login: string) => {
  const params = useMemo(() => {
    return {
      from: `${year}-01-01T00:00:00`,
      login,
    };
  }, [year, login]);

  const { data, isLoading } = useGitHubQuery<GraphQlQueryResponseData>(
    pullRequestsQuery,
    params
  );

  const repositories: PullRequestContributionsByRepository[] =
    data?.user?.contributionsCollection?.pullRequestContributionsByRepository;

  return { repositories, isLoading };
};
