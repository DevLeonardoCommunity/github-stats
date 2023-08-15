import { Contributions, Repository } from "@/types/github";
import Image from "next/image";
import Link from "next/link";

export const RepositoryContributionsCard = ({
  repository,
  contributions: { totalCount, nodes },
}: {
  repository: Repository;
  contributions: Contributions;
}) => {
  return (
    <div className="card bg-slate-700">
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
            <Link href={`https://github.com/${repository.owner.login}/${repository.name}`} rel="noopener noreferrer" target="_blank" className="hover:underline" aria-label={`${repository.name}`}>

              {repository.owner.login}/{repository.name}
            </Link>
          </div>
          <div className="rounded p-1 outline outline-1">{totalCount}</div>
        </h2>
        <div className="max-h-[200px] overflow-auto flex flex-col gap-1 px-1">
          {nodes?.map(({ pullRequest: { state, title, id } }: any) => (
            <div key={id} className="flex justify-between gap-2">
              <span>{title}</span>
              <span className={`rounded p-1 ${state === 'MERGED'
                ? 'bg-green-500'
                : state === 'CLOSED'
                  ? 'bg-red-500'
                  : 'bg-blue-500'
                }`}>{state}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
