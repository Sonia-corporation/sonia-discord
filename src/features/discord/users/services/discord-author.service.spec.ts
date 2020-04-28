import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordAuthorService } from "./discord-author.service";

describe(`DiscordAuthorService`, (): void => {
  let service: DiscordAuthorService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordAuthor service`, (): void => {
      expect.assertions(1);

      service = DiscordAuthorService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordAuthorService));
    });

    it(`should return the created DiscordAuthor service`, (): void => {
      expect.assertions(1);

      const result = DiscordAuthorService.getInstance();

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

    it(`should notify the DiscordAuthor service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordAuthorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_AUTHOR_SERVICE
      );
    });
  });
});
