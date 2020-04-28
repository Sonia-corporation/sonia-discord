import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordGuildService } from "./discord-guild.service";

describe(`DiscordGuildService`, (): void => {
  let service: DiscordGuildService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuild service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildService));
    });

    it(`should return the created DiscordGuild service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildService.getInstance();

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

    it(`should notify the DiscordGuild service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_SERVICE
      );
    });
  });
});
