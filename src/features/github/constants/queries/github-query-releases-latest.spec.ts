import { GITHUB_QUERY_RELEASES_LATEST } from './github-query-releases-latest';

describe(`GITHUB_QUERY_RELEASES_LATEST`, (): void => {
  it(`should contains the query to fetch the GitHub total release count and the latest release`, (): void => {
    expect.assertions(1);

    expect(GITHUB_QUERY_RELEASES_LATEST).toStrictEqual(`{repository(owner: "Sonia-corporation", name: "il-est-midi-discord") {
   releases(orderBy: {field: CREATED_AT, direction: DESC}, first: 1) {
      edges {
        node {
          description
          updatedAt
        }
      }
      totalCount
   }
}}`);
  });
});
