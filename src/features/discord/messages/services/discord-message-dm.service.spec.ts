import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordMessageDmService } from "./discord-message-dm.service";

describe(`DiscordMessageDmService`, (): void => {
  let service: DiscordMessageDmService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageDmService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageDmService));
    });

    it(`should return the created DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageDmService.getInstance();

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

    it(`should notify the DiscordMessageDm service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageDmService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_DM_SERVICE
      );
    });
  });
});
