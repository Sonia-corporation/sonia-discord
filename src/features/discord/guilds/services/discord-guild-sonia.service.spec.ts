import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordGuildSoniaService } from "./discord-guild-sonia.service";

describe(`DiscordChannelSoniaService`, (): void => {
  let service: DiscordGuildSoniaService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildSonia service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildSoniaService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildSoniaService));
    });

    it(`should return the created DiscordGuildSonia service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildSoniaService.getInstance();

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

    it(`should notify the DiscordGuildSonia service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildSoniaService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_SONIA_SERVICE
      );
    });
  });
});
