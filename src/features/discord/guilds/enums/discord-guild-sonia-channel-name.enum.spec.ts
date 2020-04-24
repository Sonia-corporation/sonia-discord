import { DiscordGuildSoniaChannelNameEnum } from "./discord-guild-sonia-channel-name.enum";

describe(`DiscordGuildSoniaChannelNameEnum`, (): void => {
  it(`should have a member "ERRORS"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildSoniaChannelNameEnum.ERRORS).toStrictEqual(`errors`);
  });

  it(`should have a member "WARNINGS"`, (): void => {
    expect.assertions(1);

    expect(DiscordGuildSoniaChannelNameEnum.WARNINGS).toStrictEqual(`warnings`);
  });
});
