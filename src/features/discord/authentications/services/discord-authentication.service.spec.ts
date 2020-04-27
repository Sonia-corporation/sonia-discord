import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordAuthenticationService } from "./discord-authentication.service";

describe(`DiscordAuthenticationService`, (): void => {
  let service: DiscordAuthenticationService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordAuthentication service`, (): void => {
      expect.assertions(1);

      service = DiscordAuthenticationService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordAuthenticationService));
    });

    it(`should return the created DiscordAuthentication service`, (): void => {
      expect.assertions(1);

      const result = DiscordAuthenticationService.getInstance();

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

    it(`should notify the DiscordAuthentication service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordAuthenticationService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_AUTHENTICATION_SERVICE
      );
    });
  });
});
