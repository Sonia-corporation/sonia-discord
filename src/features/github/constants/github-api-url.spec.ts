import { GITHUB_API_URL } from "./github-api-url";

describe(`GITHUB_API_URL`, (): void => {
  it(`should contains the url to the GitHub API`, (): void => {
    expect.assertions(1);

    expect(GITHUB_API_URL).toStrictEqual(`https://api.github.com/graphql`);
  });
});
