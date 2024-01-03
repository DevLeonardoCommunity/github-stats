import { Contributions, Repository } from "@/types/github";
import Image from "next/image";
import Link from "next/link";
import { FaCodeMerge } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { GoIssueOpened } from "react-icons/go";

export const RepositoryContributionsCard = ({
  repository,
  contributions: { totalCount, nodes },
}: {
  repository: Repository;
  contributions: Contributions;
}) => {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <h2 className="card-title flex justify-between">
          <div className="flex justify-center items-center gap-2">
            <Image
              src={repository.owner.avatarUrl}
              alt={repository.owner.login}
              width={40}
              height={40}
              className="rounded-full"
            />
            <Link
              href={`https://github.com/${repository.owner.login}/${repository.name}`}
              rel="noopener noreferrer"
              target="_blank"
              className="hover:underline"
              aria-label={`${repository.name}`}
            >
              {repository.owner.login}/{repository.name}
            </Link>
          </div>
          <div className="rounded p-1 outline outline-1">{totalCount}</div>
        </h2>
        <div className="max-h-[22rem] hide-scrollbar overflow-auto flex flex-col px-1 gap-1">
          {nodes?.map(({ pullRequest: { state, title, id, url } }: any) => (
            <div key={id} className="flex items-center justify-between gap-2">
              <a href={url} target="_blank" className="flex-shrink-0">
                {title}
              </a>
              <span
                className={`h-fit rounded p-1 ${
                  state === "MERGED"
                    ? "bg-purple-500"
                    : state === "CLOSED"
                      ? "bg-red-500"
                      : "bg-green-500"
                }`}
              >
                {state === "MERGED" ? (
                  <FaCodeMerge size={18} />
                ) : state === "CLOSED" ? (
                  <IoIosCloseCircleOutline size={18} />
                ) : (
                  <GoIssueOpened size={18} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
