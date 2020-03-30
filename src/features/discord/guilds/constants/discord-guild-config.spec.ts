import { DISCORD_GUILD_CONFIG } from "./discord-guild-config";

describe(`DISCORD_GUILD_CONFIG`, (): void => {
  it(`should send a message when new members joins the current guild`, (): void => {
    expect.assertions(1);

    expect(DISCORD_GUILD_CONFIG.shouldWelcomeNewMembers).toStrictEqual(true);
  });

  it(`should have a permanent invitation url to joins`, (): void => {
    expect.assertions(1);

    expect(DISCORD_GUILD_CONFIG.soniaPermanentGuildInviteUrl).toStrictEqual(
      `https://discord.gg/PW4JSkv`
    );
  });
});
