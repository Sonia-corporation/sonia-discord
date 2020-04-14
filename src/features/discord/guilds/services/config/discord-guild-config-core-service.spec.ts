import { DiscordGuildConfigCoreService } from "./discord-guild-config-core-service";

jest.mock(`../../../../config/services/config-service`);

describe(`DiscordGuildConfigCoreService`, (): void => {
  let service: DiscordGuildConfigCoreService;

  beforeEach((): void => {
    service = DiscordGuildConfigCoreService.getInstance();
  });

  it(`should send some cookies when Sonia joins a new guild`, (): void => {
    expect.assertions(1);

    expect(service.shouldSendCookiesOnCreate).toStrictEqual(true);
  });

  it(`should send il est midi message when it is noon`, (): void => {
    expect.assertions(1);

    expect(service.shouldSendIlEstMidiMessage).toStrictEqual(true);
  });

  it(`should send a message when new members joins the current guild`, (): void => {
    expect.assertions(1);

    expect(service.shouldWelcomeNewMembers).toStrictEqual(true);
  });

  it(`should have a permanent invitation url to joins`, (): void => {
    expect.assertions(1);

    expect(service.soniaPermanentGuildInviteUrl).toStrictEqual(
      `https://discord.gg/PW4JSkv`
    );
  });
});
