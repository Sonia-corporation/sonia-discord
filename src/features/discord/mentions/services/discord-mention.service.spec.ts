import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordMentionService } from "./discord-mention.service";

describe(`DiscordMentionService`, (): void => {
  let service: DiscordMentionService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMention service`, (): void => {
      expect.assertions(1);

      service = DiscordMentionService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMentionService));
    });

    it(`should return the created DiscordMention service`, (): void => {
      expect.assertions(1);

      const result = DiscordMentionService.getInstance();

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

    it(`should notify the DiscordMention service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMentionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MENTION_SERVICE
      );
    });
  });
});
