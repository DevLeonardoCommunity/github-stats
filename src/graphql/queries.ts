export const pullRequests = `
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
