import { PullRequestContributionsByRepository } from "@/types/github";

export const generateText = (
  repositories: PullRequestContributionsByRepository[]
): string => {
  let text = "List of repositories and their pull requests:\n\n";

  for (const repoData of repositories) {
    const repositoryName = repoData.repository.name;
    const ownerLogin = repoData.repository.owner.login;
    const stargazerCount = repoData.repository.stargazerCount;
    const avatarUrl = repoData.repository.owner.avatarUrl;

    text += `Repository: ${repositoryName}\n`;
    text += `Owner: ${ownerLogin}\n`;
    text += `Stargazers: ${stargazerCount}\n`;
    text += `Owner Avatar: ${avatarUrl}\n\n`;

    const contributions = repoData.contributions.nodes;
    text += "Contributions:\n";
    for (const contribution of contributions) {
      const prId = contribution.pullRequest.id;
      const prTitle = contribution.pullRequest.title;
      const prState = contribution.pullRequest.state;
      text += `- Pull Request: ${prTitle}\n`;
      text += `  ID: ${prId}\n`;
      text += `  State: ${prState}\n`;
    }
    text += "\n";
  }
  return text;
};
