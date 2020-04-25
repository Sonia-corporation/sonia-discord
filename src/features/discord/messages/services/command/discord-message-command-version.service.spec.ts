import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordMessageCommandVersionService } from "./discord-message-command-version.service";

describe(`DiscordMessageCommandVersionService`, (): void => {
  let service: DiscordMessageCommandVersionService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandVersionService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandVersionService)
      );
    });

    it(`should return the created DiscordMessageCommandVersion service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandVersionService.getInstance();

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

    it(`should notify the DiscordMessageCommandVersion service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandVersionService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_VERSION_SERVICE
      );
    });
  });
});
