import { RepositoryContributionsCard } from "@/components";
import { useGitHubPullRequests } from "@/hooks";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

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
 
    const blob = new Blob([jsonStringData], {type: 'application/json'});

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a')
    //setting the link as url of the blob
    link.href = url;
    link.download = 'data.json';
    link.click();
    URL.revokeObjectURL(url);
  };


  //function for exporting the data format text

  const exportText  = () => {

      const repo = document.getElementById('repo-content');
      const textRepo = repo?.textContent || ''; 
      const contri = document.getElementById('pr-content');
      const textPR = contri?.textContent || '';

    const blob = new Blob([textRepo, textPR], {type: 'text/plain'});

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a')
    //setting the link as url of the blob
    link.href = url;
    link.download = 'data.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  //function for generating the text
  const generateText = () => {
    let result = '';

    for(const data of repositories){
      console.log(data)

      const repo_name = data.repository.name;
      const owner = data.repository.owner;
      const stargazerCount = data.repository.stargazerCount;

      const contributions: any = data.contributions;

      //for contributions 
      for(const result of contributions){
         
      }

      result += `${owner.avatarUrl}${owner.login}"/"${repo_name}"-"(${stargazerCount})\n`

     
      result +=  ``
    }
  } 
  useEffect(()=>{
   console.log(repositories)
  }, [])

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
      ) : format === "cards" ? (
        <div>
        <div className="w-full grid xl:grid-cols-3 gap-3 mb-3 md:grid-cols-2">
          {repositories?.map(({ repository, contributions }) => (
            <RepositoryContributionsCard
            key={repository.name}
            repository={repository}
            contributions={contributions}
            />
            ))}
          </div>
        </div>
      ) : format === "text" ? (
        <pre>
          {repositories?.map(({ repository, contributions }) => (
            <div key={repository.name} id="repo-content">
              {repository.owner.login}/{repository.name} (
              {contributions.totalCount})
              <br />
              {contributions.nodes.map(({ pullRequest }) => (
                <span key={pullRequest.id} id="pr-content">
                  {pullRequest.title} - {pullRequest.state}
                  <br />
                </span>
              ))}
              <br />
            </div>
          ))}
          <button className="bg-blue-500 p-2 m-1 rounded hover:bg-blue-900" onClick={generateText}>Export as Text</button>
        </pre>
      ) : (
        <div>
        <button className="bg-blue-500 p-2 m-1 rounded hover:bg-blue-900" onClick={exportJSON}>Export as JSON</button>
        <pre>
        {JSON.stringify(repositories, null, 2)}  
        </pre>
        </div>
        )}
    </div>
  );
}
