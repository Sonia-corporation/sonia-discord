import { DiscordGithubContributorsIdEnum } from './discord-github-contributors-id.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordGithubContributorsIdEnum`, (): void => {
  it(`should have a 1 member`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordGithubContributorsIdEnum)).toBe(1);
  });

  it(`should have a member "C0ZEN"`, (): void => {
    expect.assertions(1);

    expect(DiscordGithubContributorsIdEnum.C0ZEN).toBe(`260525899991089165`);
  });
});
