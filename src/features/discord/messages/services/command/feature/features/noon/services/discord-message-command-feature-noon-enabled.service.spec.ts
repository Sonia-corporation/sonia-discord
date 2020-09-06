import { Guild, TextChannel } from "discord.js";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../../../../../../enums/service-name.enum";
import { CoreEventService } from "../../../../../../../../core/services/core-event.service";
import { FirebaseGuildsStoreQuery } from "../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query";
import { ILoggerLog } from "../../../../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { DiscordMessageCommandFeatureNoonEnabledService } from "./discord-message-command-feature-noon-enabled.service";
import _ = require("lodash");

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonEnabledService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonEnabledService;
  let coreEventService: CoreEventService;
  let loggerService: LoggerService;
  let firebaseGuildsStoreQuery: FirebaseGuildsStoreQuery;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    loggerService = LoggerService.getInstance();
    firebaseGuildsStoreQuery = FirebaseGuildsStoreQuery.getInstance();
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

  describe(`isEnabled()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabledService();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();

      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
      firebaseGuildsStoreQueryGetEntitySpy = jest
        .spyOn(firebaseGuildsStoreQuery, `getEntity`)
        .mockReturnValue(undefined);
    });

    describe(`when the given Discord message guild is null`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          guild: null,
          id: `dummy-id`,
          valueOf: _.stubObject(),
        });
      });

      it(`should log about the empty guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordMessageCommandFeatureNoonEnabledService`,
          hasExtendedContext: true,
          message: `context-[dummy-id] text-could not get the guild from the message`,
        } as ILoggerLog);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );
      });
    });

    describe(`when the given Discord message guild is valid`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          channel: createMock<TextChannel>(),
          guild: createMock<Guild>({
            id: `dummy-guild-id`,
            valueOf: _.stubObject(),
          }),
          id: `dummy-id`,
          valueOf: _.stubObject(),
        });
      });

      it(`should get the Discord message guild from the Firebase guilds store`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not find the guild dummy-id in Firebase`)
        );

        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledWith(
          `dummy-guild-id`
        );
      });

      describe(`should the Discord message guild does not exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(undefined);
        });

        it(`should log about the empty guild in Firebase`, async (): Promise<
          void
        > => {
          expect.assertions(3);

          await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-id in Firebase`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureNoonEnabledService`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-could not find the guild value-dummy-guild-id in Firebase`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-id in Firebase`)
          );
        });
      });
    });
  });
});
