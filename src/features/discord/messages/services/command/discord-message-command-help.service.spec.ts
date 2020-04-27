import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { DiscordMessageCommandHelpService } from "./discord-message-command-help.service";

describe(`DiscordMessageCommandHelpService`, (): void => {
  let service: DiscordMessageCommandHelpService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandHelp service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandHelpService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandHelpService)
      );
    });

    it(`should return the created DiscordMessageCommandHelp service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandHelpService.getInstance();

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

    it(`should notify the DiscordMessageCommandHelp service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandHelpService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_HELP_SERVICE
      );
    });
  });
});
