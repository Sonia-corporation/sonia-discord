import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../../../core/services/core-event.service";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { DiscordMessageCommandFeatureNoonEnabledService } from "./discord-message-command-feature-noon-enabled.service";

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonEnabledService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonEnabledService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureNoonEnabled service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonEnabledService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandFeatureNoonEnabledService)
      );
    });

    it(`should return the created DiscordMessageCommandFeatureNoonEnabled service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonEnabledService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureNoonEnabled service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonEnabledService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_ENABLED_SERVICE
      );
    });
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabledService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
    });

    it(`to do`, async (): Promise<void> => {
      expect.assertions(0);

      await service.execute(anyDiscordMessage);
    });
  });
});
