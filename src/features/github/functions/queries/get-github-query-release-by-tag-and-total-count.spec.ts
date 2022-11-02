import { getGithubQueryReleaseByTagAndTotalCount } from './get-github-query-release-by-tag-and-total-count';

describe(`getGithubQueryReleaseByTagAndTotalCount()`, (): void => {
  let tagName: string;

  describe(`when the given tag name is "1.0.0"`, (): void => {
    beforeEach((): void => {
      tagName = `1.0.0`;
    });

    it(`should return a query to fetch the GitHub total release count and the release with the given tag name`, (): void => {
      expect.assertions(1);

      const result = getGithubQueryReleaseByTagAndTotalCount(tagName);

      expect(result).toBe(`{repository(owner: "Sonia-corporation", name: "sonia-discord") {
   release(tagName: "1.0.0") {
      description
      updatedAt
   }
   releases {
      totalCount
   }
}}`);
    });
  });
});
