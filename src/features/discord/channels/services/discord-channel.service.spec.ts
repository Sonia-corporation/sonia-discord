import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordChannelService } from "./discord-channel.service";

describe(`DiscordChannelService`, (): void => {
  let service: DiscordChannelService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordChannel service`, (): void => {
      expect.assertions(1);

      service = DiscordChannelService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordChannelService));
    });

    it(`should return the created DiscordChannel service`, (): void => {
      expect.assertions(1);

      const result = DiscordChannelService.getInstance();

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

    it(`should notify the DiscordChannel service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordChannelService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_CHANNEL_SERVICE
      );
    });
  });
});
