export const RepoData = `
fragment RepoData on Repository {
  name
  description
  owner {
    login
  }
}
`;
