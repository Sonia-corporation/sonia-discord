import { ServiceNameEnum } from "../../../enums/service-name.enum";
import { CoreEventService } from "../../core/services/core-event.service";
import { DiscordClientService } from "./discord-client.service";

describe(`DiscordClientService`, (): void => {
  let service: DiscordClientService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordClient service`, (): void => {
      expect.assertions(1);

      service = DiscordClientService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordClientService));
    });

    it(`should return the created DiscordClient service`, (): void => {
      expect.assertions(1);

      const result = DiscordClientService.getInstance();

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

    it(`should notify the DiscordClient service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordClientService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_CLIENT_SERVICE
      );
    });
  });
});
