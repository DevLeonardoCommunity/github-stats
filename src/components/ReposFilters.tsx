import { FC } from "react";
import { RepositoryRenderFormat } from "@/types/github";

interface ReposFiltersProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  baseYear: number;
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  format: RepositoryRenderFormat;
  setFormat: React.Dispatch<React.SetStateAction<RepositoryRenderFormat>>;
  hideOwnRepo: boolean;
  setHideOwnRepo: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReposFilters: FC<ReposFiltersProps> = ({
  searchQuery,
  setSearchQuery,
  baseYear,
  year,
  setYear,
  format,
  setFormat,
  hideOwnRepo,
  setHideOwnRepo,
}) => {
  const YEARS_RANGE = 4;
  const FORMAT_OPTIONS = ["cards", "text", "json"] as const;

  const handleYearChange = (selectedYear: number) => {
    setYear(selectedYear);
  };

  const handleFormatChange = (selectedFormat: RepositoryRenderFormat) => {
    setFormat(selectedFormat);
  };

  const handleHideOwnRepoChange = () => {
    setHideOwnRepo((prevHideOwnRepo) => !prevHideOwnRepo);
  };

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap lg:flex-row lg:flex-nowrap">
      <div className="flex flex-col mb-4 md:mr-4 max-w-80 md:w-full ">
        <label className="text-sm font-medium mb-2">Search</label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-sm input-bordered w-full max-w-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4 md:mr-4">
        <label className="text-sm font-medium mb-2">Select Year</label>
        <div className="join">
          {Array.from({ length: YEARS_RANGE }).map((_, i) => {
            const radioYear = baseYear - YEARS_RANGE + i + 1;
            return (
              <input
                key={i}
                className="join-item btn btn-sm"
                type="radio"
                name="year"
                aria-label={radioYear.toString()}
                onChange={() => handleYearChange(radioYear)}
                checked={year === radioYear}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col mb-4 md:mr-4">
        <label className="text-sm font-medium mb-2">Select Format</label>
        <div className="join">
          {FORMAT_OPTIONS.map((formatOption: RepositoryRenderFormat) => (
            <input
              key={formatOption}
              className="join-item btn btn-sm"
              type="radio"
              name="format"
              aria-label={formatOption}
              onChange={() => handleFormatChange(formatOption)}
              checked={format === formatOption}
            />
          ))}
        </div>
      </div>
      <div className="mt-auto mb-3">
        <label className="label block whitespace-nowrap p-0">
          <input
            type="checkbox"
            name="hide-own-repo"
            checked={hideOwnRepo}
            onChange={handleHideOwnRepoChange}
            className="checkbox checkbox-sm checkbox-primary"
          />
          <span className="label-text font-medium inline-block align-top text-sm ml-1">
            Hide own repositories
          </span>
        </label>
      </div>
    </div>
  );
};

export default ReposFilters;
