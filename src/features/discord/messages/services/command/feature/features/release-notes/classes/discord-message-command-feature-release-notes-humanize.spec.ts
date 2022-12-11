import { DiscordMessageCommandFeatureReleaseNotesHumanize } from './discord-message-command-feature-release-notes-humanize';
import { ColorEnum } from '../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../enums/icon.enum';
import { FirebaseDmVersionEnum } from '../../../../../../../../firebase/enums/dms/firebase-dm-version.enum';
import { FirebaseGuildVersionEnum } from '../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseDmV1 } from '../../../../../../../../firebase/interfaces/dms/firebase-dm-v1';
import { IFirebaseGuildV1 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2';
import { FirebaseDmsFeaturesService } from '../../../../../../../../firebase/services/dms/features/firebase-dms-features.service';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
import { IFirebaseDmFeatureReleaseNotesState } from '../../../../../../../../firebase/types/dms/features/firebase-dm-feature-release-notes-state';
import { IFirebaseDm } from '../../../../../../../../firebase/types/dms/firebase-dm';
import { IFirebaseDmVFinal } from '../../../../../../../../firebase/types/dms/firebase-dm-v-final';
import { IFirebaseGuildChannelFeatureReleaseNotesState } from '../../../../../../../../firebase/types/guilds/channels/features/firebase-guild-channel-feature-release-notes-state';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { IFirebaseGuildVFinal } from '../../../../../../../../firebase/types/guilds/firebase-guild-v-final';
import { ILoggerLog } from '../../../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { IDiscordHumanizedChannel } from '../../../../../../../channels/types/discord-humanized-channel';
import { DiscordSoniaService } from '../../../../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../../../config/discord-message-config.service';
import { DiscordMessageErrorService } from '../../../../../helpers/discord-message-error.service';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES } from '../constants/discord-message-command-feature-release-notes-humanize-disabled-messages';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES } from '../constants/discord-message-command-feature-release-notes-humanize-enabled-messages';
import { DiscordMessageCommandFeatureReleaseNotesFlagEnum } from '../enums/discord-message-command-feature-release-notes-flag.enum';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-disabled-messages.enum';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-enabled-messages.enum';
import { DMChannel, EmbedAssetData, EmbedAuthorData, EmbedFooterData, Message, TextChannel } from 'discord.js';
import moment from 'moment-timezone';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureReleaseNotesHumanize`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesHumanize<DiscordMessageCommandFeatureReleaseNotesFlagEnum>;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageHelpService: DiscordMessageHelpService;
  let firebaseGuildsStoreService: FirebaseGuildsStoreService;
  let firebaseGuildsChannelsService: FirebaseGuildsChannelsService;
  let discordChannelService: DiscordChannelService;
  let discordMessageErrorService: DiscordMessageErrorService;
  let firebaseDmsStoreService: FirebaseDmsStoreService;
  let firebaseDmsFeaturesService: FirebaseDmsFeaturesService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageHelpService = DiscordMessageHelpService.getInstance();
    firebaseGuildsStoreService = FirebaseGuildsStoreService.getInstance();
    firebaseGuildsChannelsService = FirebaseGuildsChannelsService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
    firebaseDmsStoreService = FirebaseDmsStoreService.getInstance();
    firebaseDmsFeaturesService = FirebaseDmsFeaturesService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getStatesForThisGuildSpy: jest.SpyInstance;
    let getStatesForThisDmSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getStatesForThisGuildSpy = jest
        .spyOn(service, `getStatesForThisGuild`)
        .mockRejectedValue(new Error(`getStatesForThisGuild error`));
      getStatesForThisDmSpy = jest
        .spyOn(service, `getStatesForThisDm`)
        .mockRejectedValue(new Error(`getStatesForThisDm error`));
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
    });

    it(`should log about executing the humanize action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStatesForThisGuild error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureReleaseNotesHumanize`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-humanize action`,
      } as ILoggerLog);
    });

    describe(`when the message comes from a DM`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          channel: createHydratedMock<DMChannel>({ type: ChannelType.DM }),
          id: `dummy-id`,
        });
      });

      it(`should get the release notes states`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStatesForThisDm error`));

        expect(getStatesForThisDmSpy).toHaveBeenCalledTimes(1);
        expect(getStatesForThisDmSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when the release notes states failed to be fetched`, (): void => {
        beforeEach((): void => {
          getStatesForThisDmSpy.mockRejectedValue(new Error(`getStatesForThisDm error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStatesForThisDm error`));
        });
      });

      describe(`when the release notes states were successfully fetched`, (): void => {
        let firebaseDmFeatureReleaseNotesState: IFirebaseDmFeatureReleaseNotesState;

        beforeEach((): void => {
          firebaseDmFeatureReleaseNotesState = createMock<IFirebaseDmFeatureReleaseNotesState>();

          getStatesForThisDmSpy.mockResolvedValue(firebaseDmFeatureReleaseNotesState);
        });

        describe(`when the Discord message author is not valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              author: null,
              channel: createHydratedMock<DMChannel>({ type: ChannelType.DM }),
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
              channel: createHydratedMock<DMChannel>({ type: ChannelType.DM }),
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
              expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseDmFeatureReleaseNotesState, `private message`);
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
          channel: createHydratedMock<TextChannel>({ type: ChannelType.GuildText }),
          id: `dummy-id`,
        });
      });

      it(`should get the release notes states`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStatesForThisGuild error`));

        expect(getStatesForThisGuildSpy).toHaveBeenCalledTimes(1);
        expect(getStatesForThisGuildSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when the release notes states failed to be fetched`, (): void => {
        beforeEach((): void => {
          getStatesForThisGuildSpy.mockRejectedValue(new Error(`getStatesForThisGuild error`));
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStatesForThisGuild error`));
        });
      });

      describe(`when the release notes states were successfully fetched`, (): void => {
        let firebaseGuildChannelFeatureReleaseNotesState: IFirebaseGuildChannelFeatureReleaseNotesState;

        beforeEach((): void => {
          firebaseGuildChannelFeatureReleaseNotesState = createMock<IFirebaseGuildChannelFeatureReleaseNotesState>();

          getStatesForThisGuildSpy.mockResolvedValue(firebaseGuildChannelFeatureReleaseNotesState);
        });

        describe(`when the Discord message guild is not valid`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createMock<IAnyDiscordMessage>({
              channel: createHydratedMock<TextChannel>({ type: ChannelType.GuildText }),
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
              channel: createHydratedMock<TextChannel>({ type: ChannelType.GuildText }),
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
              expect(getMessageResponseSpy).toHaveBeenCalledWith(
                firebaseGuildChannelFeatureReleaseNotesState,
                `text channel`
              );
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

  describe(`getStatesForThisDm()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseDm: IFirebaseDm;

    let firebaseDmsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseDmsFeaturesServiceIsValidSpy: jest.SpyInstance;
    let firebaseDmsFeaturesServiceIsUpToDateSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
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

        await expect(service.getStatesForThisDm(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.getStatesForThisDm(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.getStatesForThisDm(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.getStatesForThisDm(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.getStatesForThisDm(anyDiscordMessage)).rejects.toThrow(
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

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStatesForThisDm(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
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

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStatesForThisDm(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
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

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStatesForThisDm(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
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

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStatesForThisDm(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
            });
          });

          describe(`when the DM is not valid`, (): void => {
            beforeEach((): void => {
              firebaseDmsFeaturesServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStatesForThisDm(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
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

              it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.getStatesForThisDm(anyDiscordMessage);

                expect(result.isEnabled).toBeUndefined();
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
                      },
                    },
                    id: `dummy-dm-id`,
                    version: FirebaseDmVersionEnum.V1,
                  });

                  firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDm);
                });

                it(`should return the release notes state with an enabled value`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.getStatesForThisDm(anyDiscordMessage);

                  expect(result.isEnabled).toBe(true);
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

                it(`should return the release notes state with disabled value`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.getStatesForThisDm(anyDiscordMessage);

                  expect(result.isEnabled).toBe(false);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`getStatesForThisGuild()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuild: IFirebaseGuild;

    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsValidSpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsUpToDateSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
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

        await expect(service.getStatesForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.getStatesForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

        await expect(service.getStatesForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.getStatesForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

          await expect(service.getStatesForThisGuild(anyDiscordMessage)).rejects.toThrow(
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

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStatesForThisGuild(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v1`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildV1>({
              version: FirebaseGuildVersionEnum.V1,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStatesForThisGuild(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v2`, (): void => {
          beforeEach((): void => {
            firebaseGuild = createMock<IFirebaseGuildV2>({
              version: FirebaseGuildVersionEnum.V2,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuild);
          });

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStatesForThisGuild(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
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

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStatesForThisGuild(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
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

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStatesForThisGuild(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
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

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStatesForThisGuild(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              firebaseGuildsChannelsServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStatesForThisGuild(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
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

              it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
                expect.assertions(1);

                const result = await service.getStatesForThisGuild(anyDiscordMessage);

                expect(result.isEnabled).toBeUndefined();
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

                it(`should return the release notes state with an enabled value`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.getStatesForThisGuild(anyDiscordMessage);

                  expect(result.isEnabled).toBe(true);
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

                it(`should return the release notes state with disabled value`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.getStatesForThisGuild(anyDiscordMessage);

                  expect(result.isEnabled).toBe(false);
                });
              });
            });
          });
        });
      });
    });
  });

  describe(`getMessageResponse()`, (): void => {
    let state: IFirebaseGuildChannelFeatureReleaseNotesState;
    let humanizedChannel: IDiscordHumanizedChannel;

    let discordMessageHelpServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesGetRandomMessageSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesGetRandomMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
      state = createMock<IFirebaseGuildChannelFeatureReleaseNotesState>({
        isEnabled: true,
      });
      humanizedChannel = `text channel`;

      discordMessageHelpServiceGetMessageResponseSpy = jest.spyOn(discordMessageHelpService, `getMessageResponse`);
      discordSoniaServiceGetCorporationMessageEmbedAuthorSpy = jest.spyOn(
        discordSoniaService,
        `getCorporationMessageEmbedAuthor`
      );
      discordMessageConfigServiceGetMessageCommandHelpImageColorSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandHelpImageColor`
      );
      discordSoniaServiceGetImageUrlSpy = jest.spyOn(discordSoniaService, `getImageUrl`);
      discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy = jest.spyOn(
        discordMessageConfigService,
        `getMessageCommandHelpImageUrl`
      );
      discordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesGetRandomMessageSpy = jest
        .spyOn(DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES, `getRandomMessage`)
        .mockImplementation();
      discordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesGetRandomMessageSpy = jest
        .spyOn(DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES, `getRandomMessage`)
        .mockImplementation();
    });

    it(`should get the message response for the help`, async (): Promise<void> => {
      expect.assertions(3);
      discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));

      await expect(service.getMessageResponse(state, humanizedChannel)).rejects.toThrow(
        new Error(`getMessageResponse help error`)
      );

      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response for the help failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse(state, humanizedChannel)).rejects.toThrow(
          new Error(`getMessageResponse help error`)
        );
      });
    });

    describe(`when the message response for the help command was successfully fetched`, (): void => {
      it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
        expect.assertions(1);
        const messageEmbedAuthor: EmbedAuthorData = createMock<EmbedAuthorData>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getMessageResponse(state, humanizedChannel);

        expect(result.options.embeds?.[0]?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse(state, humanizedChannel);

        expect(result.options.embeds?.[0]?.color).toStrictEqual(ColorEnum.CANDY);
      });

      describe(`when the enabled state is undefined`, (): void => {
        beforeEach((): void => {
          state.isEnabled = undefined;
        });

        it(`should return a Discord message response embed with a title about the disabled state`, async (): Promise<void> => {
          expect.assertions(1);
          discordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesGetRandomMessageSpy.mockReturnValue(
            DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU
          );

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.title).toStrictEqual(
            DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU
          );
        });

        it(`should return a Discord message response embed with a description about the release notes feature not being configured yet`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.description).toBe(
            `I will not send a message containing the release notes when a new feature is deployed since it was never enabled on this text channel.`
          );
        });
      });

      describe(`when the enabled state is false`, (): void => {
        beforeEach((): void => {
          state.isEnabled = false;
        });

        it(`should return a Discord message response embed with a title about the disabled state`, async (): Promise<void> => {
          expect.assertions(1);
          discordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesGetRandomMessageSpy.mockReturnValue(
            DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU
          );

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.title).toStrictEqual(
            DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU
          );
        });

        it(`should return a Discord message response embed with a description about the release notes feature being disabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.description).toBe(
            `I will not send a message containing the release notes when a new feature is deployed since it was disabled on this text channel.`
          );
        });
      });

      describe(`when the enabled state is true`, (): void => {
        beforeEach((): void => {
          state.isEnabled = true;
        });

        it(`should return a Discord message response embed with a title about the enabled state`, async (): Promise<void> => {
          expect.assertions(1);
          discordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesGetRandomMessageSpy.mockReturnValue(
            DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_LOVE_YOU
          );

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.title).toStrictEqual(
            DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_LOVE_YOU
          );
        });

        it(`should return a Discord message response embed with a description about the release notes feature being enabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.description).toBe(
            `I will send a message on this text channel containing the release notes when a new feature is deployed.`
          );
        });
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getMessageResponse(state, humanizedChannel);

        expect(result.options.embeds?.[0]?.footer).toStrictEqual({
          iconURL: `dummy-image-url`,
          text: `At your service`,
        } as EmbedFooterData);
      });

      describe(`when the Sonia image url is null`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        });

        it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: undefined,
            text: `At your service`,
          } as EmbedFooterData);
        });
      });

      describe(`when the Sonia image url is "image-url"`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        });

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state, humanizedChannel);

          expect(result.options.embeds?.[0]?.footer).toStrictEqual({
            iconURL: `image-url`,
            text: `At your service`,
          } as EmbedFooterData);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

        const result = await service.getMessageResponse(state, humanizedChannel);

        expect(result.options.embeds?.[0]?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as EmbedAssetData);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.getMessageResponse(state, humanizedChannel);

        expect(moment(result.options.embeds?.[0]?.timestamp).isValid()).toBe(true);
        expect(moment(result.options.embeds?.[0]?.timestamp).fromNow()).toBe(`a few seconds ago`);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(state, humanizedChannel);

        expect(result.content).toBeUndefined();
      });
    });
  });
});
