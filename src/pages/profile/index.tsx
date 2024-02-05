import React, { useState } from "react";
import {
  UserProfile,
  userProfile as userProfileQuery,
} from "@/graphql/queries";
import { useGitHubPullRequests, useGitHubQuery } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { exportAsImage } from "@/utils";
import GitHubCalendar from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import BarDiagram from "@/components/BarChartProfile";
import { PullRequestContributionsByRepository } from "@/types/github";
import { useRouter } from "next/router";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function Profile() {
  const { data } = useGitHubQuery<UserProfile>(userProfileQuery);
  const [showActivities, setShowActivities] = useState<boolean>(false);
  const router = useRouter();
  const { login } = router.query;
  const baseYear = new Date().getFullYear();
  const {
    repositories,
    isLoading,
  }: {
    repositories: PullRequestContributionsByRepository[];
    isLoading: boolean;
  } = useGitHubPullRequests(baseYear, login as string);

  if (!data) return "Loading...";

  if (isLoading) return "Loading...";

  const selectLastHalfYear = (contributions: Activity[]) => {
    const shownMonths = 6;

    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - shownMonths);
    startDate.setHours(0, 0, 0, 0);

    return contributions.filter(
      (activity: Activity) =>
        startDate.getTime() <= new Date(activity.date).getTime()
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-2/4">
        <div className=" flex flex-col justify-center items-center py-10">
          <div className="dropdown ">
            <button
              tabIndex={0}
              className="btn btn-primary p-2 m-1 rounded cursor-pointer"
            >
              Export as image
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-20"
            >
              <li>
                <button
                  className="btn-ghost"
                  onClick={() =>
                    exportAsImage("#profile-card", "download", "profile-card")
                  }
                >
                  Download as PNG
                </button>
              </li>
              <li>
                <button
                  className="btn-ghost"
                  onClick={() => exportAsImage("#profile-card", "clipboard")}
                >
                  Copy to Clipboard
                </button>
              </li>
            </ul>
          </div>
          <div className="flex mx-auto">
            <label className="cursor-pointer label gap-2">
              <span className="label badge badge-primary">
                Activity Calendar
              </span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={showActivities}
                onChange={(e) => setShowActivities(e.target.checked)}
              />
            </label>
          </div>
        </div>
        <div>
          <div className="card w-96 mx-auto my-10 bg-base-100 shadow-xl h-100  ">
            <div
              id="profile-card"
              className="relative bg-base-100 rounded-2xl "
            >
              <div className="absolute h-[100px] bg-base-200 w-full rounded-t-2xl" />
              <figure className="px-10 pt-10">
                <Image
                  src={data.user.avatarUrl}
                  alt={data?.user.login}
                  width={120}
                  height={120}
                  className="rounded-full z-10"
                />
              </figure>
              <div className="card-body items-center text-center gap-4">
                <div>
                  <h2 className="card-title">{data.user.name}</h2>
                  <p className="text-sm text-gray-400">
                    Followers: {data.user.followers.totalCount}
                  </p>
                  <p className="text-sm text-gray-400">
                    Stars Count: {data.user.starsCount.totalCount}
                  </p>
                </div>
                <p>{data.user.bio}</p>
                <div className="card-actions mt-1">
                  <Link
                    className="btn btn-primary"
                    href={`https://github.com/${data.user.login}`}
                    target="_blank"
                  >
                    GitHub
                  </Link>
                </div>
                {showActivities && (
                  <GitHubCalendar
                    username={data.user.login}
                    transformData={selectLastHalfYear}
                    blockSize={10}
                    fontSize={10}
                    loading={!data}
                    colorScheme="light"
                    hideColorLegend
                    showWeekdayLabels
                    labels={{
                      totalCount:
                        "{{count}} contributions in the last 6 months",
                    }}
                    renderBlock={(block, activity) =>
                      React.cloneElement(block, {
                        "data-tooltip-id": "react-tooltip",
                        "data-tooltip-html": `${activity.count} activities on ${activity.date}`,
                      })
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ReactTooltip id="react-tooltip" />
      </div>
      <div className="w-2/4 p-6">
        <BarDiagram data={repositories} />
      </div>
    </div>
  );
}
