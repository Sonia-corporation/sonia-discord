import { DiscordMessageCommandFeatureReleaseNotesDisabled } from './discord-message-command-feature-release-notes-disabled';
import { FirebaseGuildVersionEnum } from '../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2';
import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService } from '../../../../../../../../firebase/services/guilds/channels/features/release-notes/firebase-guilds-channels-features-release-notes-enabled.service';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseGuildsStoreQuery } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../../../../../../../firebase/types/guilds/firebase-guild-v-final';
import { ILoggerLog } from '../../../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IAnyDiscordChannel } from '../../../../../../../channels/types/any-discord-channel';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { Message } from 'discord.js';
import admin from 'firebase-admin';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

/**
 * @description
 * There is a fucking weird thing going on here
 * A memory leak occur with test like:
 * "expect(updateDatabaseSpy).toHaveBeenCalledWith(false, true, {});"
 *
 * It crash Jest
 * Only for this method...
 */
describe(`DiscordMessageCommandFeatureReleaseNotesDisabled`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesDisabled<string>;
  let loggerService: LoggerService;
  let firebaseGuildsStoreQuery: FirebaseGuildsStoreQuery;
  let firebaseGuildsChannelsFeaturesReleaseNotesEnabledService: FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService;
  let firebaseGuildsChannelsService: FirebaseGuildsChannelsService;
  let discordChannelService: DiscordChannelService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    firebaseGuildsStoreQuery = FirebaseGuildsStoreQuery.getInstance();
    firebaseGuildsChannelsFeaturesReleaseNotesEnabledService =
      FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance();
    firebaseGuildsChannelsService = FirebaseGuildsChannelsService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let value: string | null | undefined;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let isDisabledSpy: jest.SpyInstance;
    let updateDatabaseSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      value = undefined;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      isDisabledSpy = jest.spyOn(service, `isDisabled`).mockRejectedValue(new Error(`isDisabled error`));
      updateDatabaseSpy = jest.spyOn(service, `updateDatabase`).mockRejectedValue(new Error(`updateDatabase error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
    });

    it(`should log about executing the disabled action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`isDisabled error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-disabled action`,
      } as ILoggerLog);
    });

    it(`should log the new disabled value`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`isDisabled error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-new state: value-true`,
      } as ILoggerLog);
    });

    it(`should get the current disabled state`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`isDisabled error`));

      expect(isDisabledSpy).toHaveBeenCalledOnce();
      expect(isDisabledSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the disabled state failed to be fetched`, (): void => {
      beforeEach((): void => {
        isDisabledSpy.mockRejectedValue(new Error(`isDisabled error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`isDisabled error`));
      });
    });

    describe(`when the disabled state was successfully fetched`, (): void => {
      beforeEach((): void => {
        isDisabledSpy.mockResolvedValue(undefined);
      });

      describe(`when the Discord message guild is not valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createMock<IAnyDiscordMessage>({
            guild: null,
            id: `dummy-id`,
          });

          discordChannelServiceIsValidSpy.mockReturnValue(false);
        });

        it(`should not update the database to disable the release notes feature`, async (): Promise<void> => {
          expect.assertions(2);

          await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`Firebase guild invalid`));

          expect(updateDatabaseSpy).not.toHaveBeenCalled();
        });

        it(`should throw an error about the Firebase guild being invalid`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`Firebase guild invalid`));
        });
      });

      describe(`when the Discord message guild is valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createMock<IAnyDiscordMessage>({
            guild: {},
            id: `dummy-id`,
          });

          discordChannelServiceIsValidSpy.mockReturnValue(true);
        });

        describe(`when the Discord message channel is not a text channel`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              channel: {
                id: `dummy-channel-id`,
                type: `news`,
              },
              guild: {
                id: `dummy-guild-id`,
              },
              id: `dummy-id`,
            });

            discordChannelServiceIsValidSpy.mockReturnValue(false);
          });

          it(`should not update the database to disable the release notes feature`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
              new Error(`Firebase channel invalid`)
            );

            expect(updateDatabaseSpy).not.toHaveBeenCalled();
          });

          it(`should throw an error about the Firebase channel being invalid`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
              new Error(`Firebase channel invalid`)
            );
          });
        });

        describe(`when the Discord message channel is a DM channel`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              channel: {
                id: `dummy-channel-id`,
                type: `dm`,
              },
              guild: {
                id: `dummy-guild-id`,
              },
              id: `dummy-id`,
            });

            discordChannelServiceIsValidSpy.mockReturnValue(true);
          });

          describe(`when the current release notes feature is not configured`, (): void => {
            beforeEach((): void => {
              isDisabledSpy.mockResolvedValue(undefined);
            });

            it(`should log the current state`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`updateDatabase error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
                context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-current state: value-undefined`,
              } as ILoggerLog);
            });

            describe(`when the flag value is "true"`, (): void => {
              beforeEach((): void => {
                value = `true`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "TRUE"`, (): void => {
              beforeEach((): void => {
                value = `TRUE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "false"`, (): void => {
              beforeEach((): void => {
                value = `false`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "FALSE"`, (): void => {
              beforeEach((): void => {
                value = `FALSE`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is null`, (): void => {
              beforeEach((): void => {
                value = null;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is undefined`, (): void => {
              beforeEach((): void => {
                value = undefined;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });
          });

          describe(`when the current release notes feature is disabled`, (): void => {
            beforeEach((): void => {
              isDisabledSpy.mockResolvedValue(true);
            });

            it(`should log the current state`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`updateDatabase error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
                context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-current state: value-true`,
              } as ILoggerLog);
            });

            describe(`when the flag value is "true"`, (): void => {
              beforeEach((): void => {
                value = `true`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "TRUE"`, (): void => {
              beforeEach((): void => {
                value = `TRUE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "false"`, (): void => {
              beforeEach((): void => {
                value = `false`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "FALSE"`, (): void => {
              beforeEach((): void => {
                value = `FALSE`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is null`, (): void => {
              beforeEach((): void => {
                value = null;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is undefined`, (): void => {
              beforeEach((): void => {
                value = undefined;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });
          });

          describe(`when the current release notes feature is enabled`, (): void => {
            beforeEach((): void => {
              isDisabledSpy.mockResolvedValue(false);
            });

            it(`should log the current state`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`updateDatabase error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
                context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-current state: value-false`,
              } as ILoggerLog);
            });

            describe(`when the flag value is "true"`, (): void => {
              beforeEach((): void => {
                value = `true`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "TRUE"`, (): void => {
              beforeEach((): void => {
                value = `TRUE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "false"`, (): void => {
              beforeEach((): void => {
                value = `false`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "FALSE"`, (): void => {
              beforeEach((): void => {
                value = `FALSE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is null`, (): void => {
              beforeEach((): void => {
                value = null;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is undefined`, (): void => {
              beforeEach((): void => {
                value = undefined;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });
          });
        });

        describe(`when the Discord message channel is a text channel`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<Message>({
              channel: {
                id: `dummy-channel-id`,
                type: `text`,
              },
              guild: {
                id: `dummy-guild-id`,
              },
              id: `dummy-id`,
            });

            discordChannelServiceIsValidSpy.mockReturnValue(true);
          });

          describe(`when the current release notes feature is not configured`, (): void => {
            beforeEach((): void => {
              isDisabledSpy.mockResolvedValue(undefined);
            });

            it(`should log the current state`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`updateDatabase error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
                context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-current state: value-undefined`,
              } as ILoggerLog);
            });

            describe(`when the flag value is "true"`, (): void => {
              beforeEach((): void => {
                value = `true`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "TRUE"`, (): void => {
              beforeEach((): void => {
                value = `TRUE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "false"`, (): void => {
              beforeEach((): void => {
                value = `false`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "FALSE"`, (): void => {
              beforeEach((): void => {
                value = `FALSE`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is null`, (): void => {
              beforeEach((): void => {
                value = null;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is undefined`, (): void => {
              beforeEach((): void => {
                value = undefined;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });
          });

          describe(`when the current release notes feature is disabled`, (): void => {
            beforeEach((): void => {
              isDisabledSpy.mockResolvedValue(true);
            });

            it(`should log the current state`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`updateDatabase error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
                context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-current state: value-true`,
              } as ILoggerLog);
            });

            describe(`when the flag value is "true"`, (): void => {
              beforeEach((): void => {
                value = `true`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "TRUE"`, (): void => {
              beforeEach((): void => {
                value = `TRUE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "false"`, (): void => {
              beforeEach((): void => {
                value = `false`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "FALSE"`, (): void => {
              beforeEach((): void => {
                value = `FALSE`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is null`, (): void => {
              beforeEach((): void => {
                value = null;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is undefined`, (): void => {
              beforeEach((): void => {
                value = undefined;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });
          });

          describe(`when the current release notes feature is enabled`, (): void => {
            beforeEach((): void => {
              isDisabledSpy.mockResolvedValue(false);
            });

            it(`should log the current state`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`updateDatabase error`)
              );

              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(3);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(3, {
                context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
                hasExtendedContext: true,
                message: `context-[dummy-id] text-current state: value-false`,
              } as ILoggerLog);
            });

            describe(`when the flag value is "true"`, (): void => {
              beforeEach((): void => {
                value = `true`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "TRUE"`, (): void => {
              beforeEach((): void => {
                value = `TRUE`;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "false"`, (): void => {
              beforeEach((): void => {
                value = `false`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is "FALSE"`, (): void => {
              beforeEach((): void => {
                value = `FALSE`;
              });

              it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is null`, (): void => {
              beforeEach((): void => {
                value = null;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });

            describe(`when the flag value is undefined`, (): void => {
              beforeEach((): void => {
                value = undefined;
              });

              it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                expect.assertions(2);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabase error`)
                );

                expect(updateDatabaseSpy).toHaveBeenCalledOnce();
              });
            });
          });
        });
      });
    });
  });

  describe(`isDisabled()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuildVFinal: IFirebaseGuild;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsValidSpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsUpToDateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>();

      loggerServiceErrorSpy = jest.spyOn(loggerService, `error`).mockImplementation();
      firebaseGuildsStoreQueryGetEntitySpy = jest
        .spyOn(firebaseGuildsStoreQuery, `getEntity`)
        .mockReturnValue(undefined);
      firebaseGuildsChannelsServiceIsValidSpy = jest
        .spyOn(firebaseGuildsChannelsService, `isValid`)
        .mockImplementation();
      firebaseGuildsChannelsServiceIsUpToDateSpy = jest
        .spyOn(firebaseGuildsChannelsService, `isUpToDate`)
        .mockImplementation();
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

        await expect(service.isDisabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledOnce();
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
          hasExtendedContext: true,
          message: `context-[dummy-id] text-could not get the guild from the message`,
        } as ILoggerLog);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.isDisabled(anyDiscordMessage)).rejects.toThrow(
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

      it(`should get the Discord message guild from the Firebase guilds store`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isDisabled(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not find the guild dummy-guild-id in Firebase`)
        );

        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledOnce();
        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledWith(`dummy-guild-id`);
      });

      describe(`when the given Discord message guild does not exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(undefined);
        });

        it(`should log about the empty guild in Firebase`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.isDisabled(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledOnce();
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-could not find the guild value-dummy-guild-id in Firebase`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.isDisabled(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );
        });
      });

      describe(`when the given Discord message guild exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
        });

        describe(`when the Firebase guilds store channels are empty`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
              channels: {},
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabled(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v1`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildV1>({
              version: FirebaseGuildVersionEnum.V1,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabled(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v2`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildV2>({
              version: FirebaseGuildVersionEnum.V2,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabled(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel does not exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
              channels: {
                'bad-dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                  id: `bad-dummy-channel-id`,
                }),
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabled(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                  id: `dummy-channel-id`,
                }),
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          describe(`when the channel does not have the release notes feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      releaseNotes: undefined,
                    },
                    id: `dummy-channel-id`,
                  }),
                },
                version: FirebaseGuildVersionEnum.V5,
              });

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabled(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel does not have the release notes feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      releaseNotes: {
                        isEnabled: undefined,
                      },
                    },
                    id: `dummy-channel-id`,
                  }),
                },
                version: FirebaseGuildVersionEnum.V5,
              });

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabled(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              firebaseGuildsChannelsServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabled(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel is valid`, (): void => {
            beforeEach((): void => {
              firebaseGuildsChannelsServiceIsValidSpy.mockReturnValue(true);
            });

            describe(`when the channel is not up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseGuildsChannelsServiceIsUpToDateSpy.mockReturnValue(false);
              });

              it(`should return undefined`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.isDisabled(anyDiscordMessage);

                expect(result).toBeUndefined();
              });
            });

            describe(`when the channel is up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseGuildsChannelsServiceIsUpToDateSpy.mockReturnValue(true);
              });

              describe(`when the channel has the release notes feature enabled`, (): void => {
                beforeEach((): void => {
                  firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                    channels: {
                      'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                        features: {
                          releaseNotes: {
                            isEnabled: true,
                          },
                        },
                        id: `dummy-channel-id`,
                      }),
                    },
                    version: FirebaseGuildVersionEnum.V5,
                  });

                  firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
                });

                it(`should return false`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabled(anyDiscordMessage);

                  expect(result).toBeFalse();
                });
              });

              describe(`when the channel has the release notes feature disabled`, (): void => {
                beforeEach((): void => {
                  firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                    channels: {
                      'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                        features: {
                          releaseNotes: {
                            isEnabled: false,
                          },
                        },
                        id: `dummy-channel-id`,
                      }),
                    },
                    version: FirebaseGuildVersionEnum.V5,
                  });

                  firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
                });

                it(`should return true`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabled(anyDiscordMessage);

                  expect(result).toBeTrue();
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`updateDatabase()`, (): void => {
    let shouldDisable: boolean;
    let isDisabled: boolean | undefined;
    let firebaseGuild: IFirebaseGuild;
    let channel: IAnyDiscordChannel;
    let writeResult: admin.firestore.WriteResult;

    let firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      shouldDisable = false;
      isDisabled = undefined;
      firebaseGuild = createMock<IFirebaseGuild>();
      channel = createMock<IAnyDiscordChannel>({
        id: `dummy-channel-id`,
      });
      writeResult = createMock<admin.firestore.WriteResult>();

      firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy = jest
        .spyOn(firebaseGuildsChannelsFeaturesReleaseNotesEnabledService, `updateStateByGuildId`)
        .mockRejectedValue(new Error(`updateState error`));
    });

    describe(`when the given Firebase guild id is undefined`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = undefined;
      });

      it(`should not update the disable state for the feature command in the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel)).rejects.toThrow(
          new Error(`Firebase guild id invalid`)
        );

        expect(firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy).not.toHaveBeenCalled();
      });

      it(`should throw an error about the Firebase guild id being invalid`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel)).rejects.toThrow(
          new Error(`Firebase guild id invalid`)
        );
      });
    });

    describe(`when the given Firebase guild id is valid`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = `dummy-id`;
      });

      describe(`when the new state is not disabled`, (): void => {
        beforeEach((): void => {
          shouldDisable = false;
        });

        it(`should update the enable state to enabled for the feature command in the Firebase guilds`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel)).rejects.toThrow(
            new Error(`updateState error`)
          );

          expect(
            firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy
          ).toHaveBeenCalledOnce();
          expect(firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy).toHaveBeenCalledWith(
            `dummy-id`,
            `dummy-channel-id`,
            true
          );
        });
      });

      describe(`when the new state is disabled`, (): void => {
        beforeEach((): void => {
          shouldDisable = true;
        });

        it(`should update the enable state to not enabled for the feature command in the Firebase guilds`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel)).rejects.toThrow(
            new Error(`updateState error`)
          );

          expect(
            firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy
          ).toHaveBeenCalledOnce();
          expect(firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy).toHaveBeenCalledWith(
            `dummy-id`,
            `dummy-channel-id`,
            false
          );
        });
      });

      describe(`when the disable state for the feature command in the Firebase guilds was not successfully updated`, (): void => {
        beforeEach((): void => {
          firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy.mockRejectedValue(
            new Error(`updateState error`)
          );
        });

        it(`should throw an error about the disable state for the feature command in the Firebase guilds not being successfully updated`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel)).rejects.toThrow(
            new Error(`updateState error`)
          );
        });
      });

      describe(`when the disable state for the feature command in the Firebase guilds was successfully updated`, (): void => {
        beforeEach((): void => {
          firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy.mockResolvedValue(
            writeResult
          );
        });

        describe(`when the current release notes feature is not configured`, (): void => {
          beforeEach((): void => {
            isDisabled = undefined;
          });

          describe(`when the new state is disable`, (): void => {
            beforeEach((): void => {
              shouldDisable = true;
            });

            it(`should return a flag success about the release notes feature not configured yet but disabled`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was not configured yet and is now disabled on this channel.`,
                name: `Release notes feature disabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });

          describe(`when the new state is enable`, (): void => {
            beforeEach((): void => {
              shouldDisable = false;
            });

            it(`should return a flag success about the release notes feature not configured yet but enabled`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was not configured yet and is now enabled on this channel. A message will be sent each time a new release is deployed.`,
                name: `Release notes feature enabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });
        });

        describe(`when the current release notes feature is disabled`, (): void => {
          beforeEach((): void => {
            isDisabled = true;
          });

          describe(`when the new state is disable`, (): void => {
            beforeEach((): void => {
              shouldDisable = true;
            });

            it(`should return a flag success about the release notes feature being already disabled`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was already disabled on this channel.`,
                name: `Release notes feature disabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });

          describe(`when the new state is enable`, (): void => {
            beforeEach((): void => {
              shouldDisable = false;
            });

            it(`should return a flag success about the release notes feature being disabled but now enabled`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature is now enabled on this channel. A message will be sent each time a new release is deployed.`,
                name: `Release notes feature enabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });
        });

        describe(`when the current release notes feature is enabled`, (): void => {
          beforeEach((): void => {
            isDisabled = false;
          });

          describe(`when the new state is disable`, (): void => {
            beforeEach((): void => {
              shouldDisable = true;
            });

            it(`should return a flag success about the release notes feature being enabled but now disabled`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature is now disabled on this channel.`,
                name: `Release notes feature disabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });

          describe(`when the new state is enable`, (): void => {
            beforeEach((): void => {
              isDisabled = false;
            });

            it(`should return a flag success about the release notes feature being already enabled`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.updateDatabase(shouldDisable, isDisabled, firebaseGuild, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was already enabled on this channel. A message will be sent each time a new release is deployed.`,
                name: `Release notes feature enabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });
        });
      });
    });
  });
});
