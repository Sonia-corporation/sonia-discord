import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordMessageTextService } from "./discord-message-text.service";

describe(`DiscordMessageTextService`, (): void => {
  let service: DiscordMessageTextService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageText service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageTextService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageTextService));
    });

    it(`should return the created DiscordMessageText service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageTextService.getInstance();

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

    it(`should notify the DiscordMessageText service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageTextService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_TEXT_SERVICE
      );
    });
  });
});
