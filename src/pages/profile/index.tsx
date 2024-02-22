import React, { useState } from "react";
import {
  UserProfile,
  userProfile as userProfileQuery,
} from "@/graphql/queries";
import { useGitHubQuery } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import GitHubCalendar from "react-github-calendar";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ExportDropdownButton } from "@/components";

interface Activity {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export default function Profile() {
  const { data } = useGitHubQuery<UserProfile>(userProfileQuery);
  const [showActivities, setShowActivities] = useState<boolean>(false);

  if (!data) return "Loading...";

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
    <div>
      <div className="flex flex-col justify-cter items-center py-10">
        <ExportDropdownButton
          selector="#profile-card"
          filename="profile-card"
        />
        <div className="flex mx-auto">
          <label className="cursor-pointer label gap-2">
            <span className="label badge badge-primary">Activity Calendar</span>
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
          <div id="profile-card" className="relative bg-base-100 rounded-2xl ">
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
                    totalCount: "{{count}} contributions in the last 6 months",
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
  );
}
