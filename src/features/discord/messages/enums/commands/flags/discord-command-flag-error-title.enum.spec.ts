import { DiscordCommandFlagErrorTitleEnum } from './discord-command-flag-error-title.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordCommandFlagErrorTitleEnum`, (): void => {
  it(`should have 3 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordCommandFlagErrorTitleEnum)).toStrictEqual(3);
  });

  it(`should have a member "INVALID_BOOLEAN_FLAG"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagErrorTitleEnum.INVALID_BOOLEAN_FLAG).toStrictEqual(`Invalid boolean flag`);
  });

  it(`should have a member "INVALID_VALUELESS_FLAG"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagErrorTitleEnum.INVALID_VALUELESS_FLAG).toStrictEqual(`Invalid valueless flag`);
  });

  it(`should have a member "UNKNOWN_FLAG"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagErrorTitleEnum.UNKNOWN_FLAG).toStrictEqual(`Unknown flag`);
  });
});
