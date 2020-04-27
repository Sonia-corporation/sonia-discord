import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordMessageContentService } from "./discord-message-content.service";

describe(`DiscordMessageContentService`, (): void => {
  let service: DiscordMessageContentService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageContent service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageContentService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageContentService));
    });

    it(`should return the created DiscordMessageContent service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageContentService.getInstance();

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

    it(`should notify the DiscordMessageContent service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageContentService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_CONTENT_SERVICE
      );
    });
  });
});
