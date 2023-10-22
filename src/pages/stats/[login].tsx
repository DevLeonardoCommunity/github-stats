import { RepositoryContributionsCard } from "@/components";
import { useGitHubPullRequests } from "@/hooks";
import { PullRequestContributionsByRepository } from "@/types/github";
import { exportAsImage } from "@/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { exportAsImage } from "@/utils";
import { PullRequestContributionsByRepository } from "@/types/github";
import CardSkeleton from "@/components/CardSkeleton";

const yearsRange = 4;

export default function Stats() {
  const { data: session } = useSession();
  const router = useRouter();
  const { login } = router.query;
  const baseYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(baseYear);
  const [format, setFormat] = useState<"cards" | "text" | "json">("cards");
  const {
    repositories,
    isLoading,
  }: {
    repositories: PullRequestContributionsByRepository[];
    isLoading: boolean;
  } = useGitHubPullRequests(year, login as string);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRepositories = useMemo(() => {
    // putting the default value of the repositories
    if (!searchQuery) {
      return repositories;
    }

    // getting search query
    const query = searchQuery.toLowerCase();
    const filterRepos = repositories.filter((repoData) =>
      repoData.repository.name.toLowerCase().includes(query)
    );

    return filterRepos;
  }, [repositories, searchQuery]);

  const exportJSON = () => {
    const jsonStringData = JSON.stringify(repositories, null, 2);

    const blob = new Blob([jsonStringData], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    //setting the link as url of the blob
    link.href = url;
    link.download = "data.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportText = () => {
    const text = generateText();
    const blob = new Blob([text], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    //setting the link as url of the blob
    link.href = url;
    link.download = "data.txt";
    link.click();
    URL.revokeObjectURL(url);
  };

  function generateText() {
    let text = "List of repositories and their pull requests:\n\n";

    for (const repoData of repositories) {
      const repositoryName = repoData.repository.name;
      const ownerLogin = repoData.repository.owner.login;
      const stargazerCount = repoData.repository.stargazerCount;
      const avatarUrl = repoData.repository.owner.avatarUrl;

      text += `Repository: ${repositoryName}\n`;
      text += `Owner: ${ownerLogin}\n`;
      text += `Stargazers: ${stargazerCount}\n`;
      text += `Owner Avatar: ${avatarUrl}\n\n`;

      const contributions = repoData.contributions.nodes;
      text += "Contributions:\n";
      for (const contribution of contributions) {
        const prId = contribution.pullRequest.id;
        const prTitle = contribution.pullRequest.title;
        const prState = contribution.pullRequest.state;
        text += `- Pull Request: ${prTitle}\n`;
        text += `  ID: ${prId}\n`;
        text += `  State: ${prState}\n`;
      }

      text += "\n";
    }
    return text;
  }

  const formatRender = useMemo(() => {
    switch (format) {
      case "cards":
        return (
          <>
            <div className="dropdown">
              <button
                tabIndex={0}
                role="button"
                className="block w-fit btn btn-primary m-1 p-2 rounded"
              >
                Export as image
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <button
                    className="btn-ghost"
                    onClick={() => exportAsImage(".grid", "download", "stats")}
                  >
                    Download as PNG
                  </button>
                </li>
                <li>
                  <button
                    className="btn-ghost"
                    onClick={() => exportAsImage(".grid", "clipboard")}
                  >
                    Copy to Clipboard
                  </button>
                </li>
              </ul>
            </div>
            <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2">
              {filteredRepositories?.length > 0
                ? filteredRepositories?.map(
                    ({ repository, contributions }, i) => (
                      <RepositoryContributionsCard
                        key={i + repository.name}
                        repository={repository}
                        contributions={contributions}
                      />
                    )
                  )
                : "No repositories found"}
            </div>
          </>
        );
      case "json":
        return (
          <div>
            <button
              className="btn btn-primary p-2 m-1 rounded"
              onClick={exportJSON}
            >
              Export as JSON
            </button>
            <div className="p-2 m-1 text-xs overflow-x-auto sm:text-sm md:text-base lg:text-lg">
              <pre>{JSON.stringify(repositories, null, 2)}</pre>
            </div>
          </div>
        );
      case "text":
        return (
          <div>
            <button
              className="btn btn-primary p-2 m-1 rounded"
              onClick={exportText}
            >
              Export as Text
            </button>
            <div className="p-2 m-1 text-xs overflow-x-auto sm:text-sm md:text-base lg:text-lg">
              <pre>{generateText()}</pre>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl p-2">📃</h1>
            <h1 className="text-xl">Format is not matching any!</h1>
          </div>
        );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositories, format, searchQuery]);

  return (
    <div className="h-full w-full px-4 flex flex-col gap-4">
      <div className="w-full mt-4">
        <h1 className="text-3xl text-center">
          {session?.user.name} ({session?.user.login})
        </h1>
      </div>
      <div className="flex justify-between sm:gap-0 sm:flex-row flex-col gap-3">
        <div className="sm:text-left text-center">
          <div>Select Year</div>
          <div className="join">
            {new Array(yearsRange).fill(0).map((_, i) => {
              const radioYear = baseYear - yearsRange + i + 1;
              return (
                <input
                  key={i}
                  className="join-item btn"
                  type="radio"
                  name="year"
                  aria-label={radioYear.toString()}
                  onChange={() => setYear(radioYear)}
                  checked={year === radioYear}
                />
              );
            })}
          </div>
          <div className="my-5 flex flex-col sm:items-start items-center">
            <label>Search</label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="sm:text-right text-center">
          <div>Select Format</div>
          <div className="join">
            <input
              className="join-item btn"
              type="radio"
              name="format"
              aria-label="Cards"
              onChange={() => setFormat("cards")}
              checked={format === "cards"}
            />
            <input
              className="join-item btn"
              type="radio"
              name="format"
              aria-label="Text"
              onChange={() => setFormat("text")}
              checked={format === "text"}
            />

            <input
              className="join-item btn"
              type="radio"
              name="format"
              aria-label="JSON"
              onChange={() => setFormat("json")}
              checked={format === "json"}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2 ">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      ) : repositories?.length > 0 ? (
        formatRender
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl p-2">📃</h1>
          <h1 className="text-xl">No Contributions</h1>
        </div>
      )}
    </div>
  );
}
