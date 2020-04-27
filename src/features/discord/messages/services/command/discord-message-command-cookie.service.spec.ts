import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordMessageCommandCookieService } from "./discord-message-command-cookie.service";

describe(`DiscordMessageCommandCookieService`, (): void => {
  let service: DiscordMessageCommandCookieService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandCookie service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandCookieService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandCookieService)
      );
    });

    it(`should return the created DiscordMessageCommandCookie service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandCookieService.getInstance();

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

    it(`should notify the DiscordMessageCommandCookie service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandCookieService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_COOKIE_SERVICE
      );
    });
  });
});
