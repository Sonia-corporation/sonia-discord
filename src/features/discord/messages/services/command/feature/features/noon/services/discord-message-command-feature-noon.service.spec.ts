import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../../../core/services/core-event.service";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { IDiscordCommandFlagsSuccess } from "../../../../../../types/commands/flags/discord-command-flags-success";
import { DiscordMessageCommandFeatureNameEnum } from "../../../enums/discord-message-command-feature-name.enum";
import { DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS } from "../constants/discord-message-command-feature-noon-flags";
import { DiscordMessageCommandFeatureNoonService } from "./discord-message-command-feature-noon.service";

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureNoon service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonService.getInstance();

      expect(service).toStrictEqual(
        expect.any(DiscordMessageCommandFeatureNoonService)
      );
    });

    it(`should return the created DiscordMessageCommandFeatureNoon service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureNoon service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_SERVICE
      );
    });
  });

  describe(`isNoonFeature()`, (): void => {
    let featureName: string | DiscordMessageCommandFeatureNameEnum;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonService();
    });

    describe(`when the given feature name is not the noon feature`, (): void => {
      beforeEach((): void => {
        featureName = `dummy`;
      });

      it(`should return false`, (): void => {
        expect.assertions(1);

        const isNoonFeature = service.isNoonFeature(featureName);

        expect(isNoonFeature).toStrictEqual(false);
      });
    });

    describe(`when the given feature name is the noon feature`, (): void => {
      beforeEach((): void => {
        featureName = DiscordMessageCommandFeatureNameEnum.NOON;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isNoonFeature = service.isNoonFeature(featureName);

        expect(isNoonFeature).toStrictEqual(true);
      });
    });

    describe(`when the given feature name is the shortcut noon feature`, (): void => {
      beforeEach((): void => {
        featureName = DiscordMessageCommandFeatureNameEnum.N;
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const isNoonFeature = service.isNoonFeature(featureName);

        expect(isNoonFeature).toStrictEqual(true);
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let messageFlags: string;
    let discordCommandFlagsSuccess: IDiscordCommandFlagsSuccess;

    let executeAllSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonService();
      discordCommandFlagsSuccess = createMock<IDiscordCommandFlagsSuccess>();

      executeAllSpy = jest
        .spyOn(DISCORD_MESSAGE_COMMAND_FEATURE_NOON_FLAGS, `executeAll`)
        .mockResolvedValue(discordCommandFlagsSuccess);
    });

    it(`should execute the associated action for each flag`, async (): Promise<
      void
    > => {
      expect.assertions(2);

      await service.getMessageResponse(anyDiscordMessage, messageFlags);

      expect(executeAllSpy).toHaveBeenCalledTimes(1);
      expect(executeAllSpy).toHaveBeenCalledWith(
        anyDiscordMessage,
        messageFlags
      );
    });

    it(`should return a message response`, async (): Promise<void> => {
      expect.assertions(1);

      const result = await service.getMessageResponse(
        anyDiscordMessage,
        messageFlags
      );

      expect(result).toStrictEqual(discordCommandFlagsSuccess);
    });
  });
});
