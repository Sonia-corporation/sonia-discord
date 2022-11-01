import { DiscordMessageCommandFeatureNameEnum } from './discord-message-command-feature-name.enum';
import { getEnumLength } from '../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNameEnum`, (): void => {
  it(`should have 4 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNameEnum)).toBe(4);
  });

  it(`should have a member "NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.NOON).toBe(`noon`);
  });

  it(`should have a member "N"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.N).toBe(`n`);
  });

  it(`should have a member "RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES).toBe(`release-notes`);
  });

  it(`should have a member "R"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.R).toBe(`r`);
  });
});
