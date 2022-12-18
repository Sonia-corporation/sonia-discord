import { DiscordMessageCommandFeatureReleaseNotesStatus } from './discord-message-command-feature-release-notes-status';
import { AppConfigService } from '../../../../../../../../app/services/config/app-config.service';
import { FirebaseDmFeatureReleaseNotesVersionEnum } from '../../../../../../../../firebase/enums/dms/features/firebase-dm-feature-release-notes-version.enum';
import { FirebaseDmFeatureVersionEnum } from '../../../../../../../../firebase/enums/dms/features/firebase-dm-feature-version.enum';
import { FirebaseDmVersionEnum } from '../../../../../../../../firebase/enums/dms/firebase-dm-version.enum';
import { FirebaseGuildChannelFeatureReleaseNotesVersionEnum } from '../../../../../../../../firebase/enums/guilds/channels/features/firebase-guild-channel-feature-release-notes-version.enum';
import { FirebaseGuildChannelFeatureVersionEnum } from '../../../../../../../../firebase/enums/guilds/channels/features/firebase-guild-channel-feature-version.enum';
import { FirebaseGuildChannelVersionEnum } from '../../../../../../../../firebase/enums/guilds/channels/firebase-guild-channel-version.enum';
import { FirebaseGuildVersionEnum } from '../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseDmV1 } from '../../../../../../../../firebase/interfaces/dms/firebase-dm-v1';
import { IFirebaseGuildV1 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2';
import { FirebaseDmsFeaturesService } from '../../../../../../../../firebase/services/dms/features/firebase-dms-features.service';
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
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { DiscordMessageCommandFeatureReleaseNotesFlagEnum } from '../enums/discord-message-command-feature-release-notes-flag.enum';
import { ChannelType, Message } from 'discord.js';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureReleaseNotesStatus`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesStatus<DiscordMessageCommandFeatureReleaseNotesFlagEnum>;
  let loggerService: LoggerService;
  let firebaseGuildsStoreService: FirebaseGuildsStoreService;
  let firebaseGuildsChannelsService: FirebaseGuildsChannelsService;
  let discordChannelService: DiscordChannelService;
  let discordMessageErrorService: DiscordMessageErrorService;
  let firebaseDmsStoreService: FirebaseDmsStoreService;
  let firebaseDmsFeaturesService: FirebaseDmsFeaturesService;
  let appConfigService: AppConfigService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    firebaseGuildsStoreService = FirebaseGuildsStoreService.getInstance();
    firebaseGuildsChannelsService = FirebaseGuildsChannelsService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
    firebaseDmsStoreService = FirebaseDmsStoreService.getInstance();
    firebaseDmsFeaturesService = FirebaseDmsFeaturesService.getInstance();
    appConfigService = AppConfigService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let isEnabledForThisGuildSpy: jest.SpyInstance;
    let isEnabledForThisDmSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesStatus();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        channel: { type: ChannelType.GuildText },
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      isEnabledForThisGuildSpy = jest
        .spyOn(service, `isEnabledForThisGuild`)
        .mockRejectedValue(new Error(`isEnabledForThisGuild error`));
      isEnabledForThisDmSpy = jest
        .spyOn(service, `isEnabledForThisDm`)
        .mockRejectedValue(new Error(`isEnabledForThisDm error`));
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
    });

    it(`should log about executing the status action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisGuild error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureReleaseNotesStatus`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-status action`,
      } as ILoggerLog);
    });

    describe(`when the message comes from a DM`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          channel: { type: ChannelType.DM },
          id: `dummy-id`,
        });
      });

      it(`should get the enabled state`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisDm error`));

        expect(isEnabledForThisDmSpy).toHaveBeenCalledTimes(1);
        expect(isEnabledForThisDmSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when the release notes enabled state failed to be fetched`, (): void => {
        beforeEach((): void => {
          isEnabledForThisDmSpy.mockRejectedValue(new Error(`isEnabledForThisDm error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisDm error`));
        });
      });

      describe(`when the release notes enabled state was successfully fetched`, (): void => {
        let firebaseDmFeatureReleaseNotesEnabledState: boolean | undefined;

        beforeEach((): void => {
          firebaseDmFeatureReleaseNotesEnabledState = false;

          isEnabledForThisDmSpy.mockResolvedValue(firebaseDmFeatureReleaseNotesEnabledState);
        });

        describe(`when the Discord message author is not valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              author: null,
              channel: { type: ChannelType.DM },
              id: `dummy-id`,
            });

            discordChannelServiceIsValidSpy.mockReturnValue(false);
          });

          it(`should throw an error about the Firebase author being invalid`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase author invalid`));
          });
        });

        describe(`when the Discord message author is valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<Message>({
              author: {
                id: `dummy-author-id`,
              },
              channel: {
                id: `dummy-channel-id`,
                type: ChannelType.DM,
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

              await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase channel invalid`));
            });
          });

          describe(`when the channel is valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(true);
            });

            it(`should fetch a message response`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
              expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseDmFeatureReleaseNotesEnabledState);
            });

            describe(`when the message response could not be fetched`, (): void => {
              beforeEach((): void => {
                getMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse error`));
              });

              it(`should throw an error about the message response fail`, async (): Promise<void> => {
                expect.assertions(1);

                await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));
              });
            });

            describe(`when the message response was successfully fetched`, (): void => {
              let discordMessageResponse: IDiscordMessageResponse;

              beforeEach((): void => {
                getMessageResponseSpy.mockResolvedValue(discordMessageResponse);
              });

              it(`should return the message response`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.execute(anyDiscordMessage);

                expect(result).toStrictEqual(discordMessageResponse);
              });
            });
          });
        });
      });
    });

    describe(`when the message does not come from a DM`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          channel: { type: ChannelType.GuildText },
          id: `dummy-id`,
        });
      });

      it(`should get the enabled state`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisGuild error`));

        expect(isEnabledForThisGuildSpy).toHaveBeenCalledTimes(1);
        expect(isEnabledForThisGuildSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when the release notes enabled state failed to be fetched`, (): void => {
        beforeEach((): void => {
          isEnabledForThisGuildSpy.mockRejectedValue(new Error(`isEnabledForThisGuild error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisGuild error`));
        });
      });

      describe(`when the release notes enabled state was successfully fetched`, (): void => {
        let firebaseGuildChannelFeatureReleaseNotesEnabledState: boolean | undefined;

        beforeEach((): void => {
          firebaseGuildChannelFeatureReleaseNotesEnabledState = false;

          isEnabledForThisGuildSpy.mockResolvedValue(firebaseGuildChannelFeatureReleaseNotesEnabledState);
        });

        describe(`when the Discord message guild is not valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              channel: { type: ChannelType.GuildText },
              guild: null,
              id: `dummy-id`,
            });

            discordChannelServiceIsValidSpy.mockReturnValue(false);
          });

          it(`should throw an error about the Firebase guild being invalid`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase guild invalid`));
          });
        });

        describe(`when the Discord message guild is valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<Message>({
              channel: {
                id: `dummy-channel-id`,
                type: ChannelType.GuildText,
              },
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

              await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase channel invalid`));
            });
          });

          describe(`when the channel is valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(true);
            });

            it(`should fetch a message response`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));

              expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
              expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseGuildChannelFeatureReleaseNotesEnabledState);
            });

            describe(`when the message response could not be fetched`, (): void => {
              beforeEach((): void => {
                getMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse error`));
              });

              it(`should throw an error about the message response fail`, async (): Promise<void> => {
                expect.assertions(1);

                await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));
              });
            });

            describe(`when the message response was successfully fetched`, (): void => {
              let discordMessageResponse: IDiscordMessageResponse;

              beforeEach((): void => {
                getMessageResponseSpy.mockResolvedValue(discordMessageResponse);
              });

              it(`should return the message response`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.execute(anyDiscordMessage);

                expect(result).toStrictEqual(discordMessageResponse);
              });
            });
          });
        });
      });
    });
  });

  describe(`isEnabledForThisDm()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseDm: IFirebaseDm;

    let firebaseDmsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseDmsFeaturesServiceIsValidSpy: jest.SpyInstance;
    let firebaseDmsFeaturesServiceIsUpToDateSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesStatus();
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

        await expect(service.isEnabledForThisDm(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.isEnabledForThisDm(anyDiscordMessage)).rejects.toThrow(
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
            id: `dummy-dm-id`,
          },
          id: `dummy-id`,
        });
      });

      it(`should get the Discord message DM from the Firebase DMs store`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.isEnabledForThisDm(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.isEnabledForThisDm(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.isEnabledForThisDm(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the DM <@!dummy-author-id> in Firebase`)
          );
        });
      });

      describe(`when the given Discord message DM exist in the Firebase DMs store`, (): void => {
        beforeEach((): void => {
          firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
        });

        describe(`when the Firebase DMs store DM features are empty`, (): void => {
          beforeEach((): void => {
            firebaseDm = createMock<IFirebaseDmVFinal>({
              features: {},
              version: FirebaseDmVersionEnum.V1,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isEnabledForThisDm(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
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

            const result = await service.isEnabledForThisDm(anyDiscordMessage);

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

            const result = await service.isEnabledForThisDm(anyDiscordMessage);

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

              const result = await service.isEnabledForThisDm(anyDiscordMessage);

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

              const result = await service.isEnabledForThisDm(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the DM is not valid`, (): void => {
            beforeEach((): void => {
              firebaseDmsFeaturesServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isEnabledForThisDm(anyDiscordMessage);

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

                const result = await service.isEnabledForThisDm(anyDiscordMessage);

                expect(result).toBeUndefined();
              });
            });

            describe(`when the DM is up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseDmsFeaturesServiceIsUpToDateSpy.mockReturnValue(true);
              });

              describe(`when the DM has the release notes feature enabled`, (): void => {
                beforeEach((): void => {
                  firebaseDm = createMock<IFirebaseDmVFinal>({
                    features: {
                      releaseNotes: {
                        isEnabled: true,
                        version: FirebaseDmFeatureReleaseNotesVersionEnum.V1,
                      },
                      version: FirebaseDmFeatureVersionEnum.V1,
                    },
                    id: `dummy-dm-id`,
                    version: FirebaseDmVersionEnum.V1,
                  });

                  firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
                });

                it(`should return true`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isEnabledForThisDm(anyDiscordMessage);

                  expect(result).toBe(true);
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

                it(`should return false`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isEnabledForThisDm(anyDiscordMessage);

                  expect(result).toBe(false);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`isEnabledForThisGuild()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuild: IFirebaseGuild;

    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsValidSpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsUpToDateSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesStatus();
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

        await expect(service.isEnabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.isEnabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.isEnabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.isEnabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.isEnabledForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

              const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

              const result = await service.isEnabledForThisGuild(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              firebaseGuildsChannelsServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

                const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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
                            version: FirebaseGuildChannelFeatureReleaseNotesVersionEnum.V1,
                          },
                          version: FirebaseGuildChannelFeatureVersionEnum.V2,
                        },
                        id: `dummy-channel-id`,
                        version: FirebaseGuildChannelVersionEnum.V2,
                      }),
                    },
                    version: FirebaseGuildVersionEnum.V5,
                  });

                  firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
                });

                it(`should return true`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isEnabledForThisGuild(anyDiscordMessage);

                  expect(result).toBe(true);
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

                it(`should return false`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.isEnabledForThisGuild(anyDiscordMessage);

                  expect(result).toBe(false);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let isEnabled: boolean | undefined;

    let appConfigServiceIsProductionSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesStatus();
      isEnabled = false;

      appConfigServiceIsProductionSpy = jest.spyOn(appConfigService, `isProduction`).mockReturnValue(true);
    });

    describe(`when the enabled state is undefined`, (): void => {
      beforeEach((): void => {
        isEnabled = undefined;
      });

      describe(`when the app is running in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(true);
        });

        it(`should return a Discord message response with a response telling that the release notes feature is disabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(isEnabled);

          expect(result.content).toBe(`The release notes feature is disabled.`);
        });
      });

      describe(`when the app is not running in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(false);
        });

        it(`should return a Discord message response with a response telling that the release notes feature is disabled and prefix it with the dev prefix`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(isEnabled);

          expect(result.content).toBe(`**[dev]** The release notes feature is disabled.`);
        });
      });
    });

    describe(`when the enabled state is false`, (): void => {
      beforeEach((): void => {
        isEnabled = false;
      });

      describe(`when the app is running in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(true);
        });

        it(`should return a Discord message response with a response telling that the release notes feature is disabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(isEnabled);

          expect(result.content).toBe(`The release notes feature is disabled.`);
        });
      });

      describe(`when the app is not running in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(false);
        });

        it(`should return a Discord message response with a response telling that the release notes feature is disabled and prefix it with the dev prefix`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(isEnabled);

          expect(result.content).toBe(`**[dev]** The release notes feature is disabled.`);
        });
      });
    });

    describe(`when the enabled state is true`, (): void => {
      beforeEach((): void => {
        isEnabled = true;
      });

      describe(`when the app is running in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(true);
        });

        it(`should return a Discord message response with a response telling that the release notes feature is enabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(isEnabled);

          expect(result.content).toBe(`The release notes feature is enabled.`);
        });
      });

      describe(`when the app is not running in production`, (): void => {
        beforeEach((): void => {
          appConfigServiceIsProductionSpy.mockReturnValue(false);
        });

        it(`should return a Discord message response with a response telling that the release notes feature is enabled and prefix it with the dev prefix`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(isEnabled);

          expect(result.content).toBe(`**[dev]** The release notes feature is enabled.`);
        });
      });
    });
  });
});
