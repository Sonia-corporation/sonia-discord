import { DiscordMessageCommandFeatureNameEnum } from './discord-message-command-feature-name.enum';
import { getEnumLength } from '../../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandFeatureNameEnum`, (): void => {
  it(`should have a 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandFeatureNameEnum)).toStrictEqual(2);
  });

  it(`should have a member "NOON"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.NOON).toStrictEqual(`noon`);
  });

  it(`should have a member "N"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandFeatureNameEnum.N).toStrictEqual(`n`);
  });
});
