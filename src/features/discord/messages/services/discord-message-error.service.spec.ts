import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordMessageErrorService } from "./discord-message-error.service";

describe(`DiscordMessageErrorService`, (): void => {
  let service: DiscordMessageErrorService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageErrorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageErrorService));
    });

    it(`should return the created DiscordMessageError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageErrorService.getInstance();

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

    it(`should notify the DiscordMessageError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_ERROR_SERVICE
      );
    });
  });
});
