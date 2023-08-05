export type PullRequestContributionsByRepository = {
  contributions: Contributions;
  repository: Repository;
};

export type Contributions = {
  totalCount: number;
  nodes: PullRequestNode[];
};

export type PullRequestNode = {
  pullRequest: PullRequest;
};

export type PullRequest = {
  id: string;
  title: string;
  state: "MERGED" | "CLOSED" | "OPEN";
};

export type Repository = {
  owner: Owner;
  name: string;
  stargazerCount: number;
};

export type Owner = {
  login: string;
  avatarUrl: string;
};
