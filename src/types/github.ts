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
  state: PullRequestState;
  url: string;
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

export type User = {
  login: string;
  avatarUrl: string;
  bio: string;
  name: string;
  followers: {
    totalCount: number;
  };
  starsCount: {
    totalCount: number;
  };
};

export type RepositoryRenderFormat = "cards" | "text" | "json";
export type PullRequestState = "MERGED" | "CLOSED" | "OPEN";
