import type { GraphQlQueryResponseData } from "@octokit/graphql";
import { useSession } from "next-auth/react";
import { Octokit } from "octokit";
import { useEffect, useState } from "react";

export const useGitHubQuery = (
  query: string,
  parameters?: Record<string, any>
): any => {
  const { data: session, status } = useSession();

  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status !== "authenticated") return;

    const getData = async () => {
      setIsLoading(true);
      const gh = new Octokit({
        auth: session.accessToken,
      });

      const { user: result } = await gh.graphql<GraphQlQueryResponseData>(
        query,
        {
          login: session.user.login,
          ...parameters,
        }
      );
      setData(result);
      setIsLoading(false);
    };

    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parameters]);

  return { data, isLoading };
};
