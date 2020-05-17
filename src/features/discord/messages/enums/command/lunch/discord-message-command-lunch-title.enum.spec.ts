import { DiscordMessageCommandLunchTitleEnum } from "./discord-message-command-lunch-title.enum";

describe(`DiscordMessageCommandLunchTitleEnum`, (): void => {
  it(`should have a member "LUNCH_TIME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchTitleEnum.LUNCH_TIME).toStrictEqual(
      `Lunch time!`
    );
  });

  it(`should have a member "TIME_TO_EAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchTitleEnum.TIME_TO_EAT).toStrictEqual(
      `Time to eat!`
    );
  });
});
