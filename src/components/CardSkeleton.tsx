import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CardSkeleton = () => {
  return (
    <div className="card-body h-full">
      <h2 className="card-title flex justify-between">
        <div className="flex justify-center items-center gap-2">
          <Skeleton width={40} height={40} circle={true} />
          <Skeleton width={100} height={20} />
        </div>
        <div className="rounded p-1">
          <Skeleton width={40} height={20} />
        </div>
      </h2>
      <div className="max-h-[200px] overflow-auto flex flex-col gap-1 px-1">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="flex justify-between gap-2">
            <Skeleton width={200} height={20} />
            <Skeleton width={40} height={20} />
          </div>
        ))}
      </div>
    </div>
  );
};
