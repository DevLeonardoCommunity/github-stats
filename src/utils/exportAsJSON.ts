import { PullRequestContributionsByRepository } from "@/types/github";
import { downloadBlob } from ".";

export const exportAsJSON = (data: PullRequestContributionsByRepository[]) => {
  const jsonStringData = JSON.stringify(data, null, 2);
  downloadBlob(
    new Blob([jsonStringData], { type: "application/json" }),
    "data.json"
  );
};
