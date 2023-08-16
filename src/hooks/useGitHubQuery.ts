import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { useQuery } from "react-query";

export const useGitHubQuery = <T extends unknown>(
  query: string,
  parameters?: Record<string, any>
): {
  data?: T;
  isLoading: boolean;
} => {
  const { data: session, status } = useSession();

  const fetchData = async () => {
    if (status !== "authenticated") return;

    const gh = new Octokit({
      auth: session.accessToken,
    });

    return await gh.graphql<T>(query, {
      ...parameters,
      login: parameters?.login ?? session.user.login,
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
