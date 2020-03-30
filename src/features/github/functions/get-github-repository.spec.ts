import { getGithubRepository } from "./get-github-repository";

describe(`getGithubRepository()`, (): void => {
  it(`should return the GitHub repository GraphQL query`, (): void => {
    expect.assertions(1);

    const result = getGithubRepository();

    expect(result).toStrictEqual(
      `repository(owner: "Sonia-corporation", name: "il-est-midi-discord")`
    );
  });
});
