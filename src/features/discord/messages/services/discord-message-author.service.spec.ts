import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordMessageAuthorService } from "./discord-message-author.service";

describe(`DiscordMessageAuthorService`, (): void => {
  let service: DiscordMessageAuthorService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageAuthor service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageAuthorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageAuthorService));
    });

    it(`should return the created DiscordMessageAuthor service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageAuthorService.getInstance();

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

    it(`should notify the DiscordMessageAuthor service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageAuthorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_AUTHOR_SERVICE
      );
    });
  });
});
