import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordMessageCommandErrorService } from "./discord-message-command-error.service";

describe(`DiscordMessageCommandErrorService`, (): void => {
  let service: DiscordMessageCommandErrorService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandError service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandErrorService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandErrorService)
      );
    });

    it(`should return the created DiscordMessageCommandError service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandErrorService.getInstance();

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

    it(`should notify the DiscordMessageCommandError service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandErrorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_ERROR_SERVICE
      );
    });
  });
});
