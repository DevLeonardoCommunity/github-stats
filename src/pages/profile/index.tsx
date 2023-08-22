import {
  UserProfile,
  userProfile as userProfileQuery,
} from "@/graphql/queries";
import { useGitHubQuery } from "@/hooks";
import Image from "next/image";
import Link from "next/link";
import { exportAsImage } from "@/utils";

export default function Profile() {
  const { data } = useGitHubQuery<UserProfile>(userProfileQuery);

  if (!data) return "Loading...";

  return (
    <div>
      <div className="flex justify-center">
        <div className="dropdown pt-10 ">
          <label
            tabIndex={0}
            className="bg-blue-500 p-2 m-1 rounded hover:bg-blue-900 "
          >
            Export as image
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-20"
          >
            <li>
              <button
                className="btn-ghost"
                onClick={async () =>
                  await exportAsImage(
                    "#profile-card",
                    "download",
                    "profile-card"
                  )
                }
              >
                Download as PNG
              </button>
            </li>
            <li>
              <button
                className="btn-ghost"
                onClick={async () =>
                  await exportAsImage("#profile-card", "clipboard")
                }
              >
                Copy to Clipboard
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div id="profile-card" className="p-1">
        <div className="card w-96 mx-auto my-10 bg-base-100 shadow-xl h-100 relative">
          <div className="absolute h-[100px] bg-base-200 top-0 w-full rounded-t-2xl"></div>
          <div className="z-10">
            <figure className="px-10 pt-10">
              <Image
                src={data.user.avatarUrl}
                alt={data?.user.login}
                width={120}
                height={120}
                className="rounded-full"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
