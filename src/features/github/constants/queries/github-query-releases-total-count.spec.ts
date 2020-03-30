import { GITHUB_QUERY_RELEASES_TOTAL_COUNT } from "./github-query-releases-total-count";

describe(`GITHUB_QUERY_RELEASES_TOTAL_COUNT`, (): void => {
  it(`should contains the query to fetch the GitHub total release count`, (): void => {
    expect.assertions(1);

    expect(GITHUB_QUERY_RELEASES_TOTAL_COUNT)
      .toStrictEqual(`{repository(owner: "Sonia-corporation", name: "il-est-midi-discord") {
  releases {
    totalCount
  }
}}`);
  });
});
