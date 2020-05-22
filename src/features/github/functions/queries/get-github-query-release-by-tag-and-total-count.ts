import { getGithubRepository } from "../get-github-repository";

export function getGithubQueryReleaseByTagAndTotalCount(
  tagName: Readonly<string>
): string {
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
