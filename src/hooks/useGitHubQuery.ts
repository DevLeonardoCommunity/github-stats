import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { useQuery } from "react-query";

export const useGitHubQuery = (
  query: string,
  parameters?: Record<string, any>
): any => {
  const { data: session, status } = useSession();

  const fetchData = async () => {
    if (status !== "authenticated") return;

    const gh = new Octokit({
      auth: session.accessToken,
    });

    return await gh.graphql<GraphQlQueryResponseData>(query, {
      login: session.user.login,
      ...parameters,
    });
  };

  const queryResult = useQuery({
    queryKey: ["GitHubQuery", status, parameters],
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    staleTime: 60000,
  });

  return {
    data: queryResult.data,
    isLoading: queryResult.isLoading || queryResult.isFetching,
  };
};
