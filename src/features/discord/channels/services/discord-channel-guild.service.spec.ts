import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordChannelGuildService } from "./discord-channel-guild.service";

describe(`DiscordChannelGuildService`, (): void => {
  let service: DiscordChannelGuildService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordChannelGuild service`, (): void => {
      expect.assertions(1);

      service = DiscordChannelGuildService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordChannelGuildService));
    });

    it(`should return the created DiscordChannelGuild service`, (): void => {
      expect.assertions(1);

      const result = DiscordChannelGuildService.getInstance();

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

    it(`should notify the DiscordChannelGuild service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordChannelGuildService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_CHANNEL_GUILD_SERVICE
      );
    });
  });
});
