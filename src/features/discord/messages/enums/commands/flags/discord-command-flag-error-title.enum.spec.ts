import { DiscordCommandFlagErrorTitleEnum } from "./discord-command-flag-error-title.enum";

describe(`DiscordCommandFlagErrorTitleEnum`, (): void => {
  it(`should have a member "UNKNOWN_FLAG"`, (): void => {
    expect.assertions(1);

    expect(DiscordCommandFlagErrorTitleEnum.UNKNOWN_FLAG).toStrictEqual(
      `Unknown flag`
    );
  });
});
