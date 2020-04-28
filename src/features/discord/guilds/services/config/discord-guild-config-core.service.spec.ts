import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordGuildConfigCoreService } from "./discord-guild-config-core.service";

describe(`DiscordGuildConfigCoreService`, (): void => {
  let service: DiscordGuildConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildConfigCore service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildConfigCoreService));
    });

    it(`should return the created DiscordGuildConfigCore service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildConfigCoreService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordGuildConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should send some cookies when Sonia joins a new guild`, (): void => {
    expect.assertions(1);

    service = DiscordGuildConfigCoreService.getInstance();

    expect(service.shouldSendCookiesOnCreate).toStrictEqual(true);
  });

  it(`should send il est midi message when it is noon`, (): void => {
    expect.assertions(1);

    service = DiscordGuildConfigCoreService.getInstance();

    expect(service.shouldSendIlEstMidiMessage).toStrictEqual(true);
  });

  it(`should send a message when new members joins the current guild`, (): void => {
    expect.assertions(1);

    service = DiscordGuildConfigCoreService.getInstance();

    expect(service.shouldWelcomeNewMembers).toStrictEqual(true);
  });

  it(`should have a Sonia guild id`, (): void => {
    expect.assertions(1);

    service = DiscordGuildConfigCoreService.getInstance();

    expect(service.soniaGuildId).toStrictEqual(`689833865279307782`);
  });

  it(`should have a Sonia permanent invitation url to joins`, (): void => {
    expect.assertions(1);

    service = DiscordGuildConfigCoreService.getInstance();

    expect(service.soniaPermanentGuildInviteUrl).toStrictEqual(
      `https://discord.gg/PW4JSkv`
    );
  });
});
