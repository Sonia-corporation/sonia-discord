import { Message } from "discord.js";
import { createMock } from "ts-auto-mock";
import { FirebaseGuildVersionEnum } from "../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum";
import { FirebaseGuildsStoreQuery } from "../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query";
import { IFirebaseGuildChannelVFinal } from "../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final";
import { IFirebaseGuildVFinal } from "../../../../../../../../firebase/types/guilds/firebase-guild-v-final";
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
    let firebaseGuildVFinal: IFirebaseGuildVFinal;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>();

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
          channel: {
            id: `dummy-channel-id`,
          },
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

      describe(`when the given Discord message guild does not exist in the Firebase guilds store`, (): void => {
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

      describe(`when the given Discord message guild exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
            firebaseGuildVFinal
          );
        });

        describe(`when the Firebase guilds store channels are empty`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
              channels: [],
              version: FirebaseGuildVersionEnum.V3,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
              firebaseGuildVFinal
            );
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const isEnabled = await service.isEnabled(anyDiscordMessage);

            expect(isEnabled).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel does not exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
              channels: [
                createMock<IFirebaseGuildChannelVFinal>({
                  id: `bad-dummy-channel-id`,
                }),
              ],
              version: FirebaseGuildVersionEnum.V3,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
              firebaseGuildVFinal
            );
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const isEnabled = await service.isEnabled(anyDiscordMessage);

            expect(isEnabled).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
              channels: [
                createMock<IFirebaseGuildChannelVFinal>({
                  id: `dummy-channel-id`,
                }),
              ],
              version: FirebaseGuildVersionEnum.V3,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
              firebaseGuildVFinal
            );
          });

          describe(`when the channel does not have the noon feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: [
                  createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: undefined,
                    },
                    id: `dummy-channel-id`,
                  }),
                ],
                version: FirebaseGuildVersionEnum.V3,
              });

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
                firebaseGuildVFinal
              );
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const isEnabled = await service.isEnabled(anyDiscordMessage);

              expect(isEnabled).toBeUndefined();
            });
          });

          describe(`when the channel does not have the noon feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: [
                  createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: {
                        isEnabled: undefined,
                      },
                    },
                    id: `dummy-channel-id`,
                  }),
                ],
                version: FirebaseGuildVersionEnum.V3,
              });

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
                firebaseGuildVFinal
              );
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const isEnabled = await service.isEnabled(anyDiscordMessage);

              expect(isEnabled).toBeUndefined();
            });
          });

          describe(`when the channel has the noon feature enabled`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: [
                  createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: {
                        isEnabled: true,
                      },
                    },
                    id: `dummy-channel-id`,
                  }),
                ],
                version: FirebaseGuildVersionEnum.V3,
              });

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
                firebaseGuildVFinal
              );
            });

            it(`should return true`, async (): Promise<void> => {
              expect.assertions(1);

              const isEnabled = await service.isEnabled(anyDiscordMessage);

              expect(isEnabled).toStrictEqual(true);
            });
          });

          describe(`when the channel has the noon feature disabled`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: [
                  createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: {
                        isEnabled: false,
                      },
                    },
                    id: `dummy-channel-id`,
                  }),
                ],
                version: FirebaseGuildVersionEnum.V3,
              });

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
                firebaseGuildVFinal
              );
            });

            it(`should return false`, async (): Promise<void> => {
              expect.assertions(1);

              const isEnabled = await service.isEnabled(anyDiscordMessage);

              expect(isEnabled).toStrictEqual(false);
            });
          });
        });
      });
    });
  });
});
