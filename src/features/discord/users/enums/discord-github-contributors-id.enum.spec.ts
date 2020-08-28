import { DiscordGithubContributorsIdEnum } from "./discord-github-contributors-id.enum";

describe(`DiscordGithubContributorsIdEnum`, (): void => {
  it(`should have a member "C0ZEN"`, (): void => {
    expect.assertions(1);

    expect(DiscordGithubContributorsIdEnum.C0ZEN).toStrictEqual(
      `260525899991089165`
    );
  });
});
