import { User } from "@/types/github";

export const pullRequestsQuery = `
query ($login: String!, $from: DateTime!) {
    user(login: $login) {
        contributionsCollection(from: $from) {
            pullRequestContributionsByRepository {
                contributions(last: 100) {
                totalCount
                    nodes {
                        pullRequest {
                            id
                            title
                            state
                        }
                    }
                }
                repository {
                owner {
                    login
                    avatarUrl
                }
                name
                stargazerCount
                }
            }
        }
    }
}
`;

export const userProfile = `
query ($login: String!) {
    user(login: $login) {
        login
        avatarUrl
        bio
        name
        followers {
            totalCount
        }
    }
}
`;
export type UserProfile = {
  user: User;
};
