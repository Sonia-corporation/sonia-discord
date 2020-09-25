import { Message } from "discord.js";
import { createMock } from "ts-auto-mock";
import { FirebaseGuildVersionEnum } from "../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum";
import { IFirebaseGuildV1 } from "../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1";
import { IFirebaseGuildV2 } from "../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2";
import { FirebaseGuildsStoreQuery } from "../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query";
import { IFirebaseGuildChannelVFinal } from "../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final";
import { IFirebaseGuild } from "../../../../../../../../firebase/types/guilds/firebase-guild";
import { IFirebaseGuildVFinal } from "../../../../../../../../firebase/types/guilds/firebase-guild-v-final";
import { ILoggerLog } from "../../../../../../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../../../../../../logger/services/logger.service";
import { IDiscordCommandFlagSuccess } from "../../../../../../interfaces/commands/flags/discord-command-flag-success";
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

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let value: string | null | undefined;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let isEnabledSpy: jest.SpyInstance;
    let updateDatabaseSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      value = undefined;

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      isEnabledSpy = jest
        .spyOn(service, `isEnabled`)
        .mockRejectedValue(new Error(`isEnabled error`));
      updateDatabaseSpy = jest
        .spyOn(service, `updateDatabase`)
        .mockRejectedValue(new Error(`updateDatabase error`));
    });

    it(`should log about executing the enabled action`, async (): Promise<
      void
    > => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
        new Error(`isEnabled error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `DiscordMessageCommandFeatureNoonEnabled`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-enabled action`,
      } as ILoggerLog);
    });

    it(`should log the new enabled value`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
        new Error(`isEnabled error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `DiscordMessageCommandFeatureNoonEnabled`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-new state: value-true`,
      } as ILoggerLog);
    });

    it(`should get the current enabled state`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
        new Error(`isEnabled error`)
      );

      expect(isEnabledSpy).toHaveBeenCalledTimes(1);
      expect(isEnabledSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the enabled state failed to be fetched`, (): void => {
      beforeEach((): void => {
        isEnabledSpy.mockRejectedValue(new Error(`isEnabled error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
          new Error(`isEnabled error`)
        );
      });
    });

    describe(`when the enabled state was successfully fetched`, (): void => {
      beforeEach((): void => {
        isEnabledSpy.mockResolvedValue(undefined);
      });

      describe(`when the current noon feature is not configured`, (): void => {
        beforeEach((): void => {
          isEnabledSpy.mockResolvedValue(undefined);
        });

        it(`should log the current state`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(
            service.execute(anyDiscordMessage, value)
          ).rejects.toThrow(new Error(`updateDatabase error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageCommandFeatureNoonEnabled`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-current state: value-undefined`,
          } as ILoggerLog);
        });

        describe(`when the flag value is "true"`, (): void => {
          beforeEach((): void => {
            value = `true`;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, undefined);
          });
        });

        describe(`when the flag value is "TRUE"`, (): void => {
          beforeEach((): void => {
            value = `TRUE`;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, undefined);
          });
        });

        describe(`when the flag value is "false"`, (): void => {
          beforeEach((): void => {
            value = `false`;
          });

          it(`should update the database to disable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(false, undefined);
          });
        });

        describe(`when the flag value is "FALSE"`, (): void => {
          beforeEach((): void => {
            value = `FALSE`;
          });

          it(`should update the database to disable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(false, undefined);
          });
        });

        describe(`when the flag value is null`, (): void => {
          beforeEach((): void => {
            value = null;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, undefined);
          });
        });

        describe(`when the flag value is undefined`, (): void => {
          beforeEach((): void => {
            value = undefined;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, undefined);
          });
        });
      });

      describe(`when the current noon feature is enabled`, (): void => {
        beforeEach((): void => {
          isEnabledSpy.mockResolvedValue(true);
        });

        it(`should log the current state`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(
            service.execute(anyDiscordMessage, value)
          ).rejects.toThrow(new Error(`updateDatabase error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageCommandFeatureNoonEnabled`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-current state: value-true`,
          } as ILoggerLog);
        });

        describe(`when the flag value is "true"`, (): void => {
          beforeEach((): void => {
            value = `true`;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, true);
          });
        });

        describe(`when the flag value is "TRUE"`, (): void => {
          beforeEach((): void => {
            value = `TRUE`;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, true);
          });
        });

        describe(`when the flag value is "false"`, (): void => {
          beforeEach((): void => {
            value = `false`;
          });

          it(`should update the database to disable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(false, true);
          });
        });

        describe(`when the flag value is "FALSE"`, (): void => {
          beforeEach((): void => {
            value = `FALSE`;
          });

          it(`should update the database to disable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(false, true);
          });
        });

        describe(`when the flag value is null`, (): void => {
          beforeEach((): void => {
            value = null;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, true);
          });
        });

        describe(`when the flag value is undefined`, (): void => {
          beforeEach((): void => {
            value = undefined;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, true);
          });
        });
      });

      describe(`when the current noon feature is disabled`, (): void => {
        beforeEach((): void => {
          isEnabledSpy.mockResolvedValue(false);
        });

        it(`should log the current state`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(
            service.execute(anyDiscordMessage, value)
          ).rejects.toThrow(new Error(`updateDatabase error`));

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
          expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
            context: `DiscordMessageCommandFeatureNoonEnabled`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-current state: value-false`,
          } as ILoggerLog);
        });

        describe(`when the flag value is "true"`, (): void => {
          beforeEach((): void => {
            value = `true`;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, false);
          });
        });

        describe(`when the flag value is "TRUE"`, (): void => {
          beforeEach((): void => {
            value = `TRUE`;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, false);
          });
        });

        describe(`when the flag value is "false"`, (): void => {
          beforeEach((): void => {
            value = `false`;
          });

          it(`should update the database to disable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(false, false);
          });
        });

        describe(`when the flag value is "FALSE"`, (): void => {
          beforeEach((): void => {
            value = `FALSE`;
          });

          it(`should update the database to disable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(false, false);
          });
        });

        describe(`when the flag value is null`, (): void => {
          beforeEach((): void => {
            value = null;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, false);
          });
        });

        describe(`when the flag value is undefined`, (): void => {
          beforeEach((): void => {
            value = undefined;
          });

          it(`should update the database to enable the noon feature`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(
              service.execute(anyDiscordMessage, value)
            ).rejects.toThrow(new Error(`updateDatabase error`));

            expect(updateDatabaseSpy).toHaveBeenCalledTimes(1);
            expect(updateDatabaseSpy).toHaveBeenCalledWith(true, false);
          });
        });
      });
    });
  });

  describe(`isEnabled()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuildVFinal: IFirebaseGuild;

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

            const result = await service.isEnabled(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v1`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildV1>({
              version: FirebaseGuildVersionEnum.V1,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
              firebaseGuildVFinal
            );
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isEnabled(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v2`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildV2>({
              version: FirebaseGuildVersionEnum.V2,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(
              firebaseGuildVFinal
            );
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isEnabled(anyDiscordMessage);

            expect(result).toBeUndefined();
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

            const result = await service.isEnabled(anyDiscordMessage);

            expect(result).toBeUndefined();
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

              const result = await service.isEnabled(anyDiscordMessage);

              expect(result).toBeUndefined();
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

              const result = await service.isEnabled(anyDiscordMessage);

              expect(result).toBeUndefined();
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

              const result = await service.isEnabled(anyDiscordMessage);

              expect(result).toStrictEqual(true);
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

              const result = await service.isEnabled(anyDiscordMessage);

              expect(result).toStrictEqual(false);
            });
          });
        });
      });
    });
  });

  describe(`updateDatabase()`, (): void => {
    let shouldEnable: boolean;
    let isEnabled: boolean | undefined;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonEnabled();
      shouldEnable = false;
      isEnabled = undefined;
    });

    describe(`when the current noon feature is not configured`, (): void => {
      beforeEach((): void => {
        isEnabled = undefined;
      });

      describe(`when the new state is enable`, (): void => {
        beforeEach((): void => {
          shouldEnable = true;
        });

        it(`should return a flag success about the noon feature not configured yet but enabled`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.updateDatabase(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The \`noon\` feature was not configured yet and is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
            name: `Noon feature enabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });

      describe(`when the new state is disable`, (): void => {
        beforeEach((): void => {
          shouldEnable = false;
        });

        it(`should return a flag success about the noon feature not configured yet but disabled`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.updateDatabase(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The \`noon\` feature was not configured yet and is now disabled on this channel.`,
            name: `Noon feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });

    describe(`when the current noon feature is enabled`, (): void => {
      beforeEach((): void => {
        isEnabled = true;
      });

      describe(`when the new state is enable`, (): void => {
        beforeEach((): void => {
          shouldEnable = true;
        });

        it(`should return a flag success about the noon feature being already enabled`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.updateDatabase(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The \`noon\` feature was already enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
            name: `Noon feature enabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });

      describe(`when the new state is disable`, (): void => {
        beforeEach((): void => {
          shouldEnable = false;
        });

        it(`should return a flag success about the noon feature being enabled but now disabled`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.updateDatabase(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The \`noon\` feature is now disabled on this channel.`,
            name: `Noon feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });

    describe(`when the current noon feature is disabled`, (): void => {
      beforeEach((): void => {
        isEnabled = false;
      });

      describe(`when the new state is enable`, (): void => {
        beforeEach((): void => {
          shouldEnable = true;
        });

        it(`should return a flag success about the noon feature being disabled but now enabled`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.updateDatabase(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The \`noon\` feature is now enabled on this channel. A message will be sent each day at noon (12 A.M) on Paris timezone.`,
            name: `Noon feature enabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });

      describe(`when the new state is disable`, (): void => {
        beforeEach((): void => {
          isEnabled = false;
        });

        it(`should return a flag success about the noon feature being already disabled`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          const result = await service.updateDatabase(shouldEnable, isEnabled);

          expect(result).toStrictEqual({
            description: `The \`noon\` feature was already disabled on this channel.`,
            name: `Noon feature disabled`,
          } as IDiscordCommandFlagSuccess);
        });
      });
    });
  });
});
