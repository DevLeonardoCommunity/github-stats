import Image from "next/image";
import Link from "next/link";
import { Contributions, PullRequestNode, Repository } from "@/types/github";
import { GoGitMerge } from "react-icons/go";
import { GoXCircle } from "react-icons/go";
import { GoIssueOpened } from "react-icons/go";

export const RepositoryContributionsCard = ({
  repository,
  contributions: { totalCount, nodes },
}: {
  repository: Repository;
  contributions: Contributions;
}) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="sm:w-auto card bg-base-100">
        <div className="card-body">
          <div className="card-title flex items-center justify-between">
            <div className="flex items-center space-x-2 flex-grow">
              <Image
                src={repository.owner.avatarUrl}
                alt={`${repository.owner.login} avatar`}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div
                className="grid grid-flow-col gap-2 flex-grow tooltip text-left"
                data-tip={`${repository.owner.login}/${repository.name}`}
              >
                <Link
                  href={`https://github.com/${repository.owner.login}/${repository.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate flex-grow"
                >
                  <h3 className="logged-user truncate">
                    {repository.owner.login}/{repository.name}
                  </h3>
                </Link>
              </div>
              <div
                className="tooltip tooltip-left"
                data-tip="Total contributions"
              >
                <div className="rounded outline outline-1 cursor-default px-2">
                  {totalCount}
                </div>
              </div>
            </div>
          </div>
          <div className="max-h-[22rem] hide-scrollbar overflow-auto flex flex-col gap-1">
            {nodes?.map(
              ({ pullRequest: { state, title, id, url } }: PullRequestNode) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-2"
                >
                  <a
                    href={url}
                    target="_blank"
                    className="truncate"
                    title={title}
                  >
                    {title}
                  </a>
                  <span
                    className={`h-fit rounded p-1 text-white ${
                      state === "MERGED"
                        ? "bg-purple-500"
                        : state === "CLOSED"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    aria-label={
                      state === "MERGED"
                        ? "Merged"
                        : state === "CLOSED"
                        ? "Closed"
                        : "Open"
                    }
                  >
                    {state === "MERGED" ? (
                      <GoGitMerge />
                    ) : state === "CLOSED" ? (
                      <GoXCircle />
                    ) : (
                      <GoIssueOpened />
                    )}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
