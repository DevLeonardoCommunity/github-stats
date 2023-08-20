import { RepositoryContributionsCard } from "@/components";
import { useGitHubPullRequests } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const yearsRange = 4;

export default function Stats() {
  const { data: session } = useSession();
  const router = useRouter();
  const { login } = router.query;

  const baseYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(baseYear);
  const [format, setFormat] = useState<"cards" | "text" | "json">("cards");
  const { repositories, isLoading } = useGitHubPullRequests(
    year,
    login as string
  );

  //function for exporting the json format data
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

  //function for exporting the data format text

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

  //function for generating the text
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
        <div>Loading...</div>
      ) : repositories?.length > 0 ? (
        format === "cards" ? (
          <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2">
            {repositories?.map(({ repository, contributions }) => (
              <RepositoryContributionsCard
                key={repository.name}
                repository={repository}
                contributions={contributions}
              />
            ))}
          </div>
        ) : format === "text" ? (
          <pre>
            <button
              className="bg-blue-500 p-2 m-1 rounded hover:bg-blue-900"
              onClick={exportText}
            >
              Export as Text
            </button>
            {generateText()}
          </pre>
        ) : (
          <div>
            <button
              className="bg-blue-500 p-2 m-1 rounded hover:bg-blue-900"
              onClick={exportJSON}
            >
              Export as JSON
            </button>
            <pre>{JSON.stringify(repositories, null, 2)}</pre>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl p-2">📃</h1> 
          <h1 className="text-xl">No Contributions</h1>
        </div>
      )}
    </div>
  );
}
