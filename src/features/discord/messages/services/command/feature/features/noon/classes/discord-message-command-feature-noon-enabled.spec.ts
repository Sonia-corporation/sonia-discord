import { Message } from "discord.js";
import { createMock } from "ts-auto-mock";
import { FirebaseGuildsStoreQuery } from "../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query";
import { ILoggerLog } from "../../../../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { IAnyDiscordMessage } from "../../../../../../types/any-discord-message";
import { DiscordMessageCommandFeatureNoonEnabled } from "./discord-message-command-feature-noon-enabled";

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonEnabled`, (): void => {
  let service: DiscordMessageCommandFeatureNoonEnabled;
  let loggerService: LoggerService;
  let firebaseGuildsStoreQuery: FirebaseGuildsStoreQuery;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    firebaseGuildsStoreQuery = FirebaseGuildsStoreQuery.getInstance();
  });

  describe(`isEnabled()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabled();
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
        });
      });

      it(`should log about the empty guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordMessageCommandFeatureNoonEnabled`,
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
        anyDiscordMessage = createMock<Message>({
          channel: {},
          guild: {
            id: `dummy-guild-id`,
          },
          id: `dummy-id`,
        });
      });

      it(`should get the Discord message guild from the Firebase guilds store`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not find the guild dummy-guild-id in Firebase`)
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
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureNoonEnabled`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-could not find the guild value-dummy-guild-id in Firebase`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.isEnabled(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );
        });
      });
    });
  });
});
