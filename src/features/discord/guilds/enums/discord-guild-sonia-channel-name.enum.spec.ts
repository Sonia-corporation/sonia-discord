import { DiscordGuildSoniaChannelNameEnum } from './discord-guild-sonia-channel-name.enum';
import { getEnumLength } from '../../../../functions/checks/get-enum-length';

describe(`DiscordGuildSoniaChannelNameEnum`, (): void => {
  it(`should have 3 members`, (): void => {
    expect.assertions(1);

    expect(getEnumLength(DiscordGuildSoniaChannelNameEnum)).toBe(3);
  });

  it(`should have a member "ERRORS"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildSoniaChannelNameEnum.ERRORS).toBe(`errors`);
  });

  it(`should have a member "LOGS"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildSoniaChannelNameEnum.LOGS).toBe(`logs`);
  });

  it(`should have a member "WARNINGS"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildSoniaChannelNameEnum.WARNINGS).toBe(`warnings`);
  });
});
