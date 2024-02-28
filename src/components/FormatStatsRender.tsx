import { FC } from "react";
import { useMemo } from "react";
import {
  ExportDropdownButton,
  RepositoryContributionsCard,
} from "@/components";
import {
  PullRequestContributionsByRepository,
  RepositoryRenderFormat,
} from "@/types/github";
import { exportAsJSON, exportAsText, generateText } from "@/utils";

type NoContributionsProps = {
  message: string;
};

const NoContributions: FC<NoContributionsProps> = ({ message }) => (
  <div className="flex flex-col items-center justify-center">
    <p className="text-4xl p-2">📃</p>
    <p className="text-xl">{message}</p>
  </div>
);

type FormatStatsRenderProps = {
  repositories: PullRequestContributionsByRepository[];
  format: RepositoryRenderFormat;
};

export const FormatStatsRender: FC<FormatStatsRenderProps> = ({
  repositories,
  format,
}) => {
  const renderContent = useMemo(() => {
    if (repositories?.length === 0) {
      return <NoContributions message="No Contributions" />;
    }

    switch (format) {
      case "cards":
        return (
          <>
            <ExportDropdownButton selector=".grid" filename="stats" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
              {repositories?.map(({ repository, contributions }, i) => (
                <RepositoryContributionsCard
                  key={i + repository.name}
                  repository={repository}
                  contributions={contributions}
                />
              ))}
            </div>
          </>
        );
      case "json":
        return (
          <div>
            <button
              className="btn btn-primary p-2 m-1 rounded"
              onClick={() => exportAsJSON(repositories)}
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
              onClick={() => exportAsText(generateText(repositories))}
            >
              Export as Text
            </button>
            <div className="p-2 m-1 text-xs overflow-x-auto sm:text-sm md:text-base lg:text-lg">
              <pre>{generateText(repositories)}</pre>
            </div>
          </div>
        );
      default:
        return <NoContributions message="Format is not matching any!" />;
    }
  }, [format, repositories]);

  return renderContent;
};
