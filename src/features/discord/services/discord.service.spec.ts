import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordService } from "./discord.service";

describe(`DiscordService`, (): void => {
  let service: DiscordService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a Discord service`, (): void => {
      expect.assertions(1);

      service = DiscordService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordService));
    });

    it(`should return the created Discord service`, (): void => {
      expect.assertions(1);

      const result = DiscordService.getInstance();

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

    it(`should notify the Discord service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_SERVICE
      );
    });
  });
});
