import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";

export const useGitHubQuery = (): any => {
  const { data: session, status } = useSession();

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status !== "authenticated" || !!data) return;

    const getData = async () => {
      setIsLoading(true);
      const gh = new Octokit({
        auth: session.accessToken,
      });

      const { user: result } = await gh.graphql<GraphQlQueryResponseData>({
        query: `query ($login: String!) {
            user(login: $login) {
              login
              avatarUrl
              contributionsCollection {
                commitContributionsByRepository(maxRepositories: 50) {
                  repository {
                    name
                  }
                  contributions(orderBy: {field: COMMIT_COUNT, direction: DESC}) {
                    totalCount
                  }
                }
                issueContributionsByRepository(maxRepositories: 50) {
                  repository {
                    name
                  }
                  contributions(orderBy: {direction: DESC}) {
                    totalCount
                  }
                }
              }
            }
          }
          `,
        login: session.user.login,
      });

      setData(result);
      setIsLoading(false);
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return { data, isLoading };
};
