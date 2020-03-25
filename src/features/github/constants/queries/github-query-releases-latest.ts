import { getGithubRepository } from '../../functions/get-github-repository';

export const GITHUB_QUERY_RELEASES_LATEST = `{${getGithubRepository()} {
   releases(orderBy: {field: CREATED_AT, direction: DESC}, first: 1) {
      edges {
        node {
          description
          updatedAt
        }
      }
      totalCount
   }
}}`;
