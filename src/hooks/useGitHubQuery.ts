import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";
import { RepoData } from "../graphql";
import contribs from "../mocks/contribs.json";

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

      if (process.env.NEXT_PUBLIC_MOCK_API) {
        setData(contribs);
        setIsLoading(false);
        return;
      }

      const { user: result } = await gh.graphql<GraphQlQueryResponseData>({
        query: `
        ${RepoData}
        query ($login: String!) {
            user(login: $login) {
              login
              avatarUrl
              contributionsCollection {
                pullRequestContributionsByRepository(maxRepositories: 5) {
                  repository {
                    ...RepoData
                  }
                  contributions(first: 50) {
                    totalCount
                    nodes {
                      pullRequest {
                        state
                        title
                      }
                    }
                  }
                }
              }
            }
          }
          `,
        login: session.user.login,
      });

      console.log(result);

      setData(result);
      setIsLoading(false);
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return { data, isLoading };
};
