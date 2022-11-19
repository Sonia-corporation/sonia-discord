import { getGithubRepository } from '../get-github-repository';

/**
 * @param tagName
 */
export function getGithubQueryReleaseByTagAndTotalCount(tagName: string): string {
  return `{${getGithubRepository()} {
   release(tagName: "${tagName}") {
      description
      updatedAt
   }
   releases {
      totalCount
   }
}}`;
}
