import { DiscordMessageCommandFeatureReleaseNotesDisabled } from './discord-message-command-feature-release-notes-disabled';
import { FirebaseDmVersionEnum } from '../../../../../../../../firebase/enums/dms/firebase-dm-version.enum';
import { FirebaseGuildVersionEnum } from '../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseDmV1 } from '../../../../../../../../firebase/interfaces/dms/firebase-dm-v1';
import { IFirebaseGuildV1 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2';
import { FirebaseDmsFeaturesService } from '../../../../../../../../firebase/services/dms/features/firebase-dms-features.service';
import { FirebaseDmsFeaturesReleaseNotesEnabledService } from '../../../../../../../../firebase/services/dms/features/release-notes/firebase-dms-features-release-notes-enabled.service';
import { FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService } from '../../../../../../../../firebase/services/guilds/channels/features/release-notes/firebase-guilds-channels-features-release-notes-enabled.service';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseDm } from '../../../../../../../../firebase/types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../../../../../../../firebase/types/dms/firebase-dm-v-final';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../../../../../../../firebase/types/guilds/firebase-guild-v-final';
import { ILoggerLog } from '../../../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IAnyDiscordChannel } from '../../../../../../../channels/types/any-discord-channel';
import { IDiscordCommandFlagSuccess } from '../../../../../../interfaces/commands/flags/discord-command-flag-success';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { DMChannel, Message, TextChannel } from 'discord.js';
import { WriteResult } from 'firebase-admin/firestore';
import { createHydratedMock, createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

/**
 * @description
 * There is a fucking weird thing going on here.
 * A memory leak occur with test like:
 * "expect(updateDatabaseSpy).toHaveBeenCalledWith(false, true, {});".
 * It crash Jest, only for this method...
 */
describe(`DiscordMessageCommandFeatureReleaseNotesDisabled`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesDisabled<string>;
  let loggerService: LoggerService;
  let firebaseGuildsStoreService: FirebaseGuildsStoreService;
  let firebaseGuildsChannelsFeaturesReleaseNotesEnabledService: FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService;
  let firebaseGuildsChannelsService: FirebaseGuildsChannelsService;
  let discordChannelService: DiscordChannelService;
  let discordMessageErrorService: DiscordMessageErrorService;
  let firebaseDmsFeaturesReleaseNotesEnabledService: FirebaseDmsFeaturesReleaseNotesEnabledService;
  let firebaseDmsStoreService: FirebaseDmsStoreService;
  let firebaseDmsFeaturesService: FirebaseDmsFeaturesService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    firebaseGuildsStoreService = FirebaseGuildsStoreService.getInstance();
    firebaseGuildsChannelsFeaturesReleaseNotesEnabledService =
      FirebaseGuildsChannelsFeaturesReleaseNotesEnabledService.getInstance();
    firebaseGuildsChannelsService = FirebaseGuildsChannelsService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
    firebaseDmsFeaturesReleaseNotesEnabledService = FirebaseDmsFeaturesReleaseNotesEnabledService.getInstance();
    firebaseDmsStoreService = FirebaseDmsStoreService.getInstance();
    firebaseDmsFeaturesService = FirebaseDmsFeaturesService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let value: string | null | undefined;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let isDisabledForThisGuildSpy: jest.SpyInstance;
    let updateDatabaseForThisGuildSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;
    let isDisabledForThisDmSpy: jest.SpyInstance;
    let updateDatabaseForThisDmSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });
      value = undefined;

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      isDisabledForThisGuildSpy = jest
        .spyOn(service, `isDisabledForThisGuild`)
        .mockRejectedValue(new Error(`isDisabledForThisGuild error`));
      updateDatabaseForThisGuildSpy = jest
        .spyOn(service, `updateDatabaseForThisGuild`)
        .mockRejectedValue(new Error(`updateDatabaseForThisGuild error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
      isDisabledForThisDmSpy = jest
        .spyOn(service, `isDisabledForThisDm`)
        .mockRejectedValue(new Error(`isDisabledForThisDm error`));
      updateDatabaseForThisDmSpy = jest
        .spyOn(service, `updateDatabaseForThisDm`)
        .mockRejectedValue(new Error(`updateDatabaseForThisDm error`));
    });

    it(`should log about executing the disabled action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
        new Error(`isDisabledForThisGuild error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
        context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-disabled action`,
      } as ILoggerLog);
    });

    it(`should log the new disabled value`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
        new Error(`isDisabledForThisGuild error`)
      );

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
        context: `DiscordMessageCommandFeatureReleaseNotesDisabled`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-new state: value-true`,
      } as ILoggerLog);
    });

    describe(`when the message comes from a DM channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(DMChannel.prototype),
          id: `dummy-id`,
        });
      });

      it(`should get the current disabled state`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(new Error(`isDisabledForThisDm error`));

        expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
        expect(isDisabledForThisDmSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when the disabled state failed to be fetched`, (): void => {
        beforeEach((): void => {
          isDisabledForThisDmSpy.mockRejectedValue(new Error(`isDisabledForThisDm error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
            new Error(`isDisabledForThisDm error`)
          );
        });
      });

      describe(`when the disabled state was successfully fetched`, (): void => {
        beforeEach((): void => {
          isDisabledForThisDmSpy.mockResolvedValue(undefined);
        });

        describe(`when the Discord message author is not valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              author: null,
              channel: createInstance(DMChannel.prototype),
              id: `dummy-id`,
            });

            discordChannelServiceIsValidSpy.mockReturnValue(false);
          });

          it(`should not update the database to disable the release notes feature`, async (): Promise<void> => {
            expect.assertions(2);

            await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
              new Error(`Firebase author invalid`)
            );

            expect(updateDatabaseForThisDmSpy).not.toHaveBeenCalled();
          });

          it(`should throw an error about the Firebase DM being invalid`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
              new Error(`Firebase author invalid`)
            );
          });
        });

        describe(`when the Discord message author is valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              author: {
                id: `dummy-author-id`,
              },
              channel: createInstance(DMChannel.prototype, {
                id: `dummy-channel-id`,
              }),
              id: `dummy-id`,
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`Firebase channel invalid`)
              );
            });
          });

          describe(`when the channel is valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(true);
            });

            describe(`when the current release notes feature is not configured`, (): void => {
              beforeEach((): void => {
                isDisabledForThisDmSpy.mockResolvedValue(undefined);
              });

              it(`should log the current state`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabaseForThisDm error`)
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
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(updateDatabaseForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "TRUE"`, (): void => {
                beforeEach((): void => {
                  value = `TRUE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(updateDatabaseForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "false"`, (): void => {
                beforeEach((): void => {
                  value = `false`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(updateDatabaseForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "FALSE"`, (): void => {
                beforeEach((): void => {
                  value = `FALSE`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(updateDatabaseForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is null`, (): void => {
                beforeEach((): void => {
                  value = null;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(updateDatabaseForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is undefined`, (): void => {
                beforeEach((): void => {
                  value = undefined;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(updateDatabaseForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });
            });

            describe(`when the current release notes feature is disabled`, (): void => {
              beforeEach((): void => {
                isDisabledForThisDmSpy.mockResolvedValue(true);
              });

              it(`should log the current state`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabaseForThisDm error`)
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
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "TRUE"`, (): void => {
                beforeEach((): void => {
                  value = `TRUE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "false"`, (): void => {
                beforeEach((): void => {
                  value = `false`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "FALSE"`, (): void => {
                beforeEach((): void => {
                  value = `FALSE`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is null`, (): void => {
                beforeEach((): void => {
                  value = null;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is undefined`, (): void => {
                beforeEach((): void => {
                  value = undefined;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });
            });

            describe(`when the current release notes feature is enabled`, (): void => {
              beforeEach((): void => {
                isDisabledForThisDmSpy.mockResolvedValue(false);
              });

              it(`should log the current state`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabaseForThisDm error`)
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
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "TRUE"`, (): void => {
                beforeEach((): void => {
                  value = `TRUE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "false"`, (): void => {
                beforeEach((): void => {
                  value = `false`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "FALSE"`, (): void => {
                beforeEach((): void => {
                  value = `FALSE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is null`, (): void => {
                beforeEach((): void => {
                  value = null;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is undefined`, (): void => {
                beforeEach((): void => {
                  value = undefined;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisDm error`)
                  );

                  expect(isDisabledForThisDmSpy).toHaveBeenCalledTimes(1);
                });
              });
            });
          });
        });
      });
    });

    describe(`when the message does not come from a DM channel`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
          id: `dummy-id`,
        });
      });

      it(`should get the current disabled state`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
          new Error(`isDisabledForThisGuild error`)
        );

        expect(isDisabledForThisGuildSpy).toHaveBeenCalledTimes(1);
        expect(isDisabledForThisGuildSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when the disabled state failed to be fetched`, (): void => {
        beforeEach((): void => {
          isDisabledForThisGuildSpy.mockRejectedValue(new Error(`isDisabledForThisGuild error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
            new Error(`isDisabledForThisGuild error`)
          );
        });
      });

      describe(`when the disabled state was successfully fetched`, (): void => {
        beforeEach((): void => {
          isDisabledForThisGuildSpy.mockResolvedValue(undefined);
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

            await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
              new Error(`Firebase guild invalid`)
            );

            expect(updateDatabaseForThisGuildSpy).not.toHaveBeenCalled();
          });

          it(`should throw an error about the Firebase guild being invalid`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
              new Error(`Firebase guild invalid`)
            );
          });
        });

        describe(`when the Discord message guild is valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<Message>({
              channel: createInstance(TextChannel.prototype, {
                id: `dummy-channel-id`,
              }),
              guild: {
                id: `dummy-guild-id`,
              },
              id: `dummy-id`,
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should throw an error`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                new Error(`Firebase channel invalid`)
              );
            });
          });

          describe(`when the channel is valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(true);
            });

            describe(`when the current release notes feature is not configured`, (): void => {
              beforeEach((): void => {
                isDisabledForThisGuildSpy.mockResolvedValue(undefined);
              });

              it(`should log the current state`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabaseForThisGuild error`)
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
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "TRUE"`, (): void => {
                beforeEach((): void => {
                  value = `TRUE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "false"`, (): void => {
                beforeEach((): void => {
                  value = `false`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "FALSE"`, (): void => {
                beforeEach((): void => {
                  value = `FALSE`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is null`, (): void => {
                beforeEach((): void => {
                  value = null;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is undefined`, (): void => {
                beforeEach((): void => {
                  value = undefined;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });
            });

            describe(`when the current release notes feature is disabled`, (): void => {
              beforeEach((): void => {
                isDisabledForThisGuildSpy.mockResolvedValue(true);
              });

              it(`should log the current state`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabaseForThisGuild error`)
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
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "TRUE"`, (): void => {
                beforeEach((): void => {
                  value = `TRUE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "false"`, (): void => {
                beforeEach((): void => {
                  value = `false`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "FALSE"`, (): void => {
                beforeEach((): void => {
                  value = `FALSE`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is null`, (): void => {
                beforeEach((): void => {
                  value = null;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is undefined`, (): void => {
                beforeEach((): void => {
                  value = undefined;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });
            });

            describe(`when the current release notes feature is enabled`, (): void => {
              beforeEach((): void => {
                isDisabledForThisGuildSpy.mockResolvedValue(false);
              });

              it(`should log the current state`, async (): Promise<void> => {
                expect.assertions(3);

                await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                  new Error(`updateDatabaseForThisGuild error`)
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
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "TRUE"`, (): void => {
                beforeEach((): void => {
                  value = `TRUE`;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "false"`, (): void => {
                beforeEach((): void => {
                  value = `false`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is "FALSE"`, (): void => {
                beforeEach((): void => {
                  value = `FALSE`;
                });

                it(`should update the database to enable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is null`, (): void => {
                beforeEach((): void => {
                  value = null;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });

              describe(`when the flag value is undefined`, (): void => {
                beforeEach((): void => {
                  value = undefined;
                });

                it(`should update the database to disable the release notes feature`, async (): Promise<void> => {
                  expect.assertions(2);

                  await expect(service.execute(anyDiscordMessage, value)).rejects.toThrow(
                    new Error(`updateDatabaseForThisGuild error`)
                  );

                  expect(updateDatabaseForThisGuildSpy).toHaveBeenCalledTimes(1);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`isDisabledForThisDm()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseDm: IFirebaseDm;

    let firebaseDmsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseDmsFeaturesServiceIsValidSpy: jest.SpyInstance;
    let firebaseDmsFeaturesServiceIsUpToDateSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      firebaseDm = createMock<IFirebaseDmVFinal>();

      firebaseDmsStoreQueryGetEntitySpy = jest.spyOn(firebaseDmsStoreService, `getEntity`).mockReturnValue(undefined);
      firebaseDmsFeaturesServiceIsValidSpy = jest.spyOn(firebaseDmsFeaturesService, `isValid`).mockImplementation();
      firebaseDmsFeaturesServiceIsUpToDateSpy = jest
        .spyOn(firebaseDmsFeaturesService, `isUpToDate`)
        .mockImplementation();
      discordMessageErrorServiceHandleErrorSpy = jest
        .spyOn(discordMessageErrorService, `handleError`)
        .mockImplementation();
    });

    describe(`when the given Discord message author is null`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          author: null,
          id: `dummy-id`,
        });
      });

      it(`should handle the error about the empty author`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isDisabledForThisDm(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the author from the message`)
        );

        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
          new Error(`Could not get the author from the message`),
          anyDiscordMessage,
          `could not get the author from the message`
        );
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.isDisabledForThisDm(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the author from the message`)
        );
      });
    });

    describe(`when the given Discord message author is valid`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<Message>({
          author: {
            id: `dummy-author-id`,
          },
          channel: {
            id: `dummy-channel-id`,
          },
          id: `dummy-id`,
        });
      });

      it(`should get the Discord message DM from the Firebase DMs store`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isDisabledForThisDm(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not find the DM <@!dummy-author-id> in Firebase`)
        );

        expect(firebaseDmsStoreQueryGetEntitySpy).toHaveBeenCalledTimes(1);
        expect(firebaseDmsStoreQueryGetEntitySpy).toHaveBeenCalledWith(`dummy-author-id`);
      });

      describe(`when the given Discord message DM does not exist in the Firebase DMs store`, (): void => {
        beforeEach((): void => {
          firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(undefined);
        });

        it(`should handle the error about the empty DM in Firebase`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.isDisabledForThisDm(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the DM <@!dummy-author-id> in Firebase`)
          );

          expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
            new Error(`Could not find the DM <@!dummy-author-id> in Firebase`),
            anyDiscordMessage,
            `could not find the DM value-dummy-author-id in Firebase`
          );
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.isDisabledForThisDm(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the DM <@!dummy-author-id> in Firebase`)
          );
        });
      });

      describe(`when the given Discord message DM exist in the Firebase DMs store`, (): void => {
        beforeEach((): void => {
          firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
        });

        describe(`when the Firebase DMs are v1`, (): void => {
          beforeEach((): void => {
            firebaseDm = createMock<IFirebaseDmV1>({
              version: FirebaseDmVersionEnum.V1,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabledForThisDm(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message DM does not exist in the Firebase DMs store`, (): void => {
          beforeEach((): void => {
            firebaseDm = createMock<IFirebaseDmVFinal>({
              id: `bad-dummy-dm-id`,
              version: FirebaseDmVersionEnum.V1,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabledForThisDm(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message DM exist in the Firebase DMs store`, (): void => {
          beforeEach((): void => {
            firebaseDm = createMock<IFirebaseDmVFinal>({
              id: `dummy-dm-id`,
              version: FirebaseDmVersionEnum.V1,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
          });

          describe(`when the DM does not have the release notes feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseDm = createMock<IFirebaseDmVFinal>({
                features: {
                  releaseNotes: undefined,
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabledForThisDm(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the DM does not have the release notes feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseDm = createMock<IFirebaseDmVFinal>({
                features: {
                  releaseNotes: {
                    isEnabled: undefined,
                  },
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabledForThisDm(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the DM is not valid`, (): void => {
            beforeEach((): void => {
              firebaseDmsFeaturesServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabledForThisDm(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the DM is valid`, (): void => {
            beforeEach((): void => {
              firebaseDmsFeaturesServiceIsValidSpy.mockReturnValue(true);
            });

            describe(`when the DM is not up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseDmsFeaturesServiceIsUpToDateSpy.mockReturnValue(false);
              });

              it(`should return undefined`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.isDisabledForThisDm(anyDiscordMessage);

                expect(result).toBeUndefined();
              });
            });

            describe(`when the DM is up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseDmsFeaturesServiceIsUpToDateSpy.mockReturnValue(true);
              });

              describe(`when the DM has the release notes feature not yet configured`, (): void => {
                beforeEach((): void => {
                  firebaseDm = createMock<IFirebaseDmVFinal>({
                    features: {
                      releaseNotes: {
                        isEnabled: undefined,
                      },
                    },
                    id: `dummy-dm-id`,
                    version: FirebaseDmVersionEnum.V1,
                  });

                  firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
                });

                it(`should return undefined`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabledForThisDm(anyDiscordMessage);

                  expect(result).toBeUndefined();
                });
              });

              describe(`when the DM has the release notes feature enabled`, (): void => {
                beforeEach((): void => {
                  firebaseDm = createMock<IFirebaseDmVFinal>({
                    features: {
                      releaseNotes: {
                        isEnabled: true,
                      },
                    },
                    id: `dummy-dm-id`,
                    version: FirebaseDmVersionEnum.V1,
                  });

                  firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
                });

                it(`should return false`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabledForThisDm(anyDiscordMessage);

                  expect(result).toBe(false);
                });
              });

              describe(`when the DM has the release notes feature disabled`, (): void => {
                beforeEach((): void => {
                  firebaseDm = createMock<IFirebaseDmVFinal>({
                    features: {
                      releaseNotes: {
                        isEnabled: false,
                      },
                    },
                    id: `dummy-dm-id`,
                    version: FirebaseDmVersionEnum.V1,
                  });

                  firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
                });

                it(`should return true`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabledForThisDm(anyDiscordMessage);

                  expect(result).toBe(true);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`isDisabledForThisGuild()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuild: IFirebaseGuild;

    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsValidSpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsUpToDateSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      firebaseGuild = createMock<IFirebaseGuildVFinal>();

      firebaseGuildsStoreQueryGetEntitySpy = jest
        .spyOn(firebaseGuildsStoreService, `getEntity`)
        .mockReturnValue(undefined);
      firebaseGuildsChannelsServiceIsValidSpy = jest
        .spyOn(firebaseGuildsChannelsService, `isValid`)
        .mockImplementation();
      firebaseGuildsChannelsServiceIsUpToDateSpy = jest
        .spyOn(firebaseGuildsChannelsService, `isUpToDate`)
        .mockImplementation();
      discordMessageErrorServiceHandleErrorSpy = jest
        .spyOn(discordMessageErrorService, `handleError`)
        .mockImplementation();
    });

    describe(`when the given Discord message guild is null`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          guild: null,
          id: `dummy-id`,
        });
      });

      it(`should handle the error about the empty guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isDisabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );

        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
          new Error(`Could not get the guild from the message`),
          anyDiscordMessage,
          `could not get the guild from the message`
        );
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.isDisabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.isDisabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not find the guild dummy-guild-id in Firebase`)
        );

        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledWith(`dummy-guild-id`);
      });

      describe(`when the given Discord message guild does not exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(undefined);
        });

        it(`should handle the error about the empty guild in Firebase`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.isDisabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );

          expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledTimes(1);
          expect(discordMessageErrorServiceHandleErrorSpy).toHaveBeenCalledWith(
            new Error(`Could not find the guild dummy-guild-id in Firebase`),
            anyDiscordMessage,
            `could not find the guild value-dummy-guild-id in Firebase`
          );
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.isDisabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );
        });
      });

      describe(`when the given Discord message guild exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
        });

        describe(`when the Firebase guilds store channels are empty`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {},
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabledForThisGuild(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v1`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildV1>({
              version: FirebaseGuildVersionEnum.V1,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabledForThisGuild(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v2`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildV2>({
              version: FirebaseGuildVersionEnum.V2,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabledForThisGuild(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel does not exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {
                'bad-dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                  id: `bad-dummy-channel-id`,
                }),
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isDisabledForThisGuild(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                  id: `dummy-channel-id`,
                }),
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          describe(`when the channel does not have the release notes feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuild = createMock<IFirebaseGuildVFinal>({
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

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabledForThisGuild(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel does not have the release notes feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuild = createMock<IFirebaseGuildVFinal>({
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

              firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabledForThisGuild(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              firebaseGuildsChannelsServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isDisabledForThisGuild(anyDiscordMessage);

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

                const result = await service.isDisabledForThisGuild(anyDiscordMessage);

                expect(result).toBeUndefined();
              });
            });

            describe(`when the channel is up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseGuildsChannelsServiceIsUpToDateSpy.mockReturnValue(true);
              });

              describe(`when the channel has the release notes feature enabled`, (): void => {
                beforeEach((): void => {
                  firebaseGuild = createMock<IFirebaseGuildVFinal>({
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

                  firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
                });

                it(`should return false`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabledForThisGuild(anyDiscordMessage);

                  expect(result).toBe(false);
                });
              });

              describe(`when the channel has the release notes feature disabled`, (): void => {
                beforeEach((): void => {
                  firebaseGuild = createMock<IFirebaseGuildVFinal>({
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

                  firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
                });

                it(`should return true`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isDisabledForThisGuild(anyDiscordMessage);

                  expect(result).toBe(true);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`updateDatabaseForThisDm()`, (): void => {
    let shouldDisable: boolean;
    let isDisabled: boolean | undefined;
    let firebaseDm: IFirebaseDm;
    let channel: IAnyDiscordChannel;
    let writeResult: WriteResult;

    let firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      shouldDisable = false;
      isDisabled = undefined;
      firebaseDm = createMock<IFirebaseDm>();
      channel = createInstance<DMChannel>(DMChannel.prototype, {
        id: `dummy-channel-id`,
      });
      writeResult = createMock<WriteResult>();

      firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy = jest
        .spyOn(firebaseDmsFeaturesReleaseNotesEnabledService, `updateStateByDmId`)
        .mockRejectedValue(new Error(`updateStateByDmId error`));
    });

    describe(`when the given Firebase DM ID is undefined`, (): void => {
      beforeEach((): void => {
        firebaseDm.id = undefined;
      });

      it(`should not update the disable state for the feature command in the Firebase DMs`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel)).rejects.toThrow(
          new Error(`Firebase DM ID invalid`)
        );

        expect(firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy).not.toHaveBeenCalled();
      });

      it(`should throw an error about the Firebase DM ID being invalid`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel)).rejects.toThrow(
          new Error(`Firebase DM ID invalid`)
        );
      });
    });

    describe(`when the given Firebase DM ID is valid`, (): void => {
      beforeEach((): void => {
        firebaseDm.id = `dummy-id`;
      });

      describe(`when the new state is not disabled`, (): void => {
        beforeEach((): void => {
          shouldDisable = false;
        });

        it(`should update the enable state to enabled for the feature command in the Firebase DMs`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel)).rejects.toThrow(
            new Error(`updateStateByDmId error`)
          );

          expect(firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy).toHaveBeenCalledWith(
            `dummy-id`,
            true
          );
        });
      });

      describe(`when the new state is disabled`, (): void => {
        beforeEach((): void => {
          shouldDisable = true;
        });

        it(`should update the enable state to not enabled for the feature command in the Firebase DMs`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel)).rejects.toThrow(
            new Error(`updateStateByDmId error`)
          );

          expect(firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy).toHaveBeenCalledTimes(1);
          expect(firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy).toHaveBeenCalledWith(
            `dummy-id`,
            false
          );
        });
      });

      describe(`when the disable state for the feature command in the Firebase DMs was not successfully updated`, (): void => {
        beforeEach((): void => {
          firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy.mockRejectedValue(
            new Error(`updateStateByDmId error`)
          );
        });

        it(`should throw an error about the disable state for the feature command in the Firebase DMs not being successfully updated`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel)).rejects.toThrow(
            new Error(`updateStateByDmId error`)
          );
        });
      });

      describe(`when the disable state for the feature command in the Firebase DMs was successfully updated`, (): void => {
        beforeEach((): void => {
          firebaseDmsFeaturesReleaseNotesEnabledServiceUpdateStateByDmIdSpy.mockResolvedValue(writeResult);
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

              const result = await service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was not configured yet and is now disabled on this private message.`,
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

              const result = await service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was not configured yet and is now enabled on this private message. A message will be sent each time a new release is deployed.`,
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

              const result = await service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was already disabled on this private message.`,
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

              const result = await service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature is now enabled on this private message. A message will be sent each time a new release is deployed.`,
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

              const result = await service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature is now disabled on this private message.`,
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

              const result = await service.updateDatabaseForThisDm(shouldDisable, isDisabled, firebaseDm, channel);

              expect(result).toStrictEqual({
                description: `The release notes feature was already enabled on this private message. A message will be sent each time a new release is deployed.`,
                name: `Release notes feature enabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });
        });
      });
    });
  });

  describe(`updateDatabaseForThisGuild()`, (): void => {
    let shouldDisable: boolean;
    let isDisabled: boolean | undefined;
    let firebaseGuild: IFirebaseGuild;
    let channel: IAnyDiscordChannel;
    let writeResult: WriteResult;

    let firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesDisabled();
      shouldDisable = false;
      isDisabled = undefined;
      firebaseGuild = createMock<IFirebaseGuild>();
      channel = createInstance<DMChannel>(TextChannel.prototype, {
        id: `dummy-channel-id`,
      });
      writeResult = createMock<WriteResult>();

      firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy = jest
        .spyOn(firebaseGuildsChannelsFeaturesReleaseNotesEnabledService, `updateStateByGuildId`)
        .mockRejectedValue(new Error(`updateStateByGuildId error`));
    });

    describe(`when the given Firebase guild id is undefined`, (): void => {
      beforeEach((): void => {
        firebaseGuild.id = undefined;
      });

      it(`should not update the disable state for the feature command in the Firebase guilds`, async (): Promise<void> => {
        expect.assertions(2);

        await expect(
          service.updateDatabaseForThisGuild(shouldDisable, isDisabled, firebaseGuild, channel)
        ).rejects.toThrow(new Error(`Firebase guild id invalid`));

        expect(firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy).not.toHaveBeenCalled();
      });

      it(`should throw an error about the Firebase guild id being invalid`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(
          service.updateDatabaseForThisGuild(shouldDisable, isDisabled, firebaseGuild, channel)
        ).rejects.toThrow(new Error(`Firebase guild id invalid`));
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

          await expect(
            service.updateDatabaseForThisGuild(shouldDisable, isDisabled, firebaseGuild, channel)
          ).rejects.toThrow(new Error(`updateStateByGuildId error`));

          expect(firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy).toHaveBeenCalledTimes(
            1
          );
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

          await expect(
            service.updateDatabaseForThisGuild(shouldDisable, isDisabled, firebaseGuild, channel)
          ).rejects.toThrow(new Error(`updateStateByGuildId error`));

          expect(firebaseGuildsChannelsFeaturesReleaseNotesEnabledServiceUpdateStateByGuildIdSpy).toHaveBeenCalledTimes(
            1
          );
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
            new Error(`updateStateByGuildId error`)
          );
        });

        it(`should throw an error about the disable state for the feature command in the Firebase guilds not being successfully updated`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(
            service.updateDatabaseForThisGuild(shouldDisable, isDisabled, firebaseGuild, channel)
          ).rejects.toThrow(new Error(`updateStateByGuildId error`));
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

              const result = await service.updateDatabaseForThisGuild(
                shouldDisable,
                isDisabled,
                firebaseGuild,
                channel
              );

              expect(result).toStrictEqual({
                description: `The release notes feature was not configured yet and is now disabled on this text channel.`,
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

              const result = await service.updateDatabaseForThisGuild(
                shouldDisable,
                isDisabled,
                firebaseGuild,
                channel
              );

              expect(result).toStrictEqual({
                description: `The release notes feature was not configured yet and is now enabled on this text channel. A message will be sent each time a new release is deployed.`,
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

              const result = await service.updateDatabaseForThisGuild(
                shouldDisable,
                isDisabled,
                firebaseGuild,
                channel
              );

              expect(result).toStrictEqual({
                description: `The release notes feature was already disabled on this text channel.`,
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

              const result = await service.updateDatabaseForThisGuild(
                shouldDisable,
                isDisabled,
                firebaseGuild,
                channel
              );

              expect(result).toStrictEqual({
                description: `The release notes feature is now enabled on this text channel. A message will be sent each time a new release is deployed.`,
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

              const result = await service.updateDatabaseForThisGuild(
                shouldDisable,
                isDisabled,
                firebaseGuild,
                channel
              );

              expect(result).toStrictEqual({
                description: `The release notes feature is now disabled on this text channel.`,
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

              const result = await service.updateDatabaseForThisGuild(
                shouldDisable,
                isDisabled,
                firebaseGuild,
                channel
              );

              expect(result).toStrictEqual({
                description: `The release notes feature was already enabled on this text channel. A message will be sent each time a new release is deployed.`,
                name: `Release notes feature enabled`,
              } as IDiscordCommandFlagSuccess);
            });
          });
        });
      });
    });
  });
});
