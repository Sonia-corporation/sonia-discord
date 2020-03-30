import { getGithubRepository } from "../../functions/get-github-repository";

export const GITHUB_QUERY_RELEASES_TOTAL_COUNT = `{${getGithubRepository()} {
  releases {
    totalCount
  }
}}`;
