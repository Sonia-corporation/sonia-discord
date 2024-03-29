import { DiscordMessageCommandLunchTitleEnum } from './discord-message-command-lunch-title.enum';
import { getEnumLength } from '../../../../../../functions/checks/get-enum-length';

describe(`DiscordMessageCommandLunchTitleEnum`, (): void => {
  it(`should have 2 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordMessageCommandLunchTitleEnum)).toBe(2);
  });

  it(`should have a member "LUNCH_TIME"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchTitleEnum.LUNCH_TIME).toBe(`Lunch time!`);
  });

  it(`should have a member "TIME_TO_EAT"`, (): void => {
    expect.assertions(1);

    expect(DiscordMessageCommandLunchTitleEnum.TIME_TO_EAT).toBe(`Time to eat!`);
  });
});
