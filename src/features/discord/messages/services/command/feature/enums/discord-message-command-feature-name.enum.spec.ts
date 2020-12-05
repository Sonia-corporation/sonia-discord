import { DiscordMessageCommandFeatureNameEnum } from './discord-message-command-feature-name.enum';
import { getEnumLength } from '../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNameEnum`, (): void => {
  it(`should have a 4 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNameEnum)).toStrictEqual(4);
  });

  it(`should have a member "NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.NOON).toStrictEqual(`noon`);
  });

  it(`should have a member "N"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.N).toStrictEqual(`n`);
  });

  it(`should have a member "RELEASE_NOTES"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.RELEASE_NOTES).toStrictEqual(`release-notes`);
  });

  it(`should have a member "R"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.R).toStrictEqual(`r`);
  });
});
