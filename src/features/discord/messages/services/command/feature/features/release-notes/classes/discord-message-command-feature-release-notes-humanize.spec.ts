import { DiscordMessageCommandFeatureReleaseNotesHumanize } from './discord-message-command-feature-release-notes-humanize';
import { ColorEnum } from '../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../enums/icon.enum';
import { FirebaseGuildVersionEnum } from '../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2';
import { FirebaseGuildsChannelsService } from '../../../../../../../../firebase/services/guilds/channels/firebase-guilds-channels.service';
import { FirebaseGuildsStoreQuery } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.query';
import { IFirebaseGuildChannelFeatureReleaseNotesState } from '../../../../../../../../firebase/types/guilds/channels/features/firebase-guild-channel-feature-release-notes-state';
import { IFirebaseGuildChannelVFinal } from '../../../../../../../../firebase/types/guilds/channels/firebase-guild-channel-v-final';
import { IFirebaseGuildVFinal } from '../../../../../../../../firebase/types/guilds/firebase-guild-v-final';
import { IFirebaseGuild } from '../../../../../../../../firebase/types/guilds/firebase-guild';
import { ILoggerLog } from '../../../../../../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../../../../../../logger/services/logger.service';
import { DiscordChannelService } from '../../../../../../../channels/services/discord-channel.service';
import { DiscordSoniaService } from '../../../../../../../users/services/discord-sonia.service';
import { IDiscordMessageResponse } from '../../../../../../interfaces/discord-message-response';
import { IAnyDiscordMessage } from '../../../../../../types/any-discord-message';
import { DiscordMessageConfigService } from '../../../../../config/discord-message-config.service';
import { DiscordMessageHelpService } from '../../../../../helpers/discord-message-help.service';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_DISABLED_MESSAGES } from '../constants/discord-message-command-feature-release-notes-humanize-disabled-messages';
import { DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_HUMANIZE_ENABLED_MESSAGES } from '../constants/discord-message-command-feature-release-notes-humanize-enabled-messages';
import { DiscordMessageCommandFeatureReleaseNotesFlagEnum } from '../enums/discord-message-command-feature-release-notes-flag.enum';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-disabled-messages.enum';
import { DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum } from '../enums/discord-message-command-feature-release-notes-humanize-enabled-messages.enum';
import { Message, MessageEmbedAuthor, MessageEmbedFooter, MessageEmbedThumbnail } from 'discord.js';
import moment from 'moment-timezone';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureReleaseNotesHumanize`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesHumanize<DiscordMessageCommandFeatureReleaseNotesFlagEnum>;
  let loggerService: LoggerService;
  let discordSoniaService: DiscordSoniaService;
  let discordMessageConfigService: DiscordMessageConfigService;
  let discordMessageHelpService: DiscordMessageHelpService;
  let firebaseGuildsStoreQuery: FirebaseGuildsStoreQuery;
  let firebaseGuildsChannelsService: FirebaseGuildsChannelsService;
  let discordChannelService: DiscordChannelService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    discordSoniaService = DiscordSoniaService.getInstance();
    discordMessageConfigService = DiscordMessageConfigService.getInstance();
    discordMessageHelpService = DiscordMessageHelpService.getInstance();
    firebaseGuildsStoreQuery = FirebaseGuildsStoreQuery.getInstance();
    firebaseGuildsChannelsService = FirebaseGuildsChannelsService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let getStatesSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      getStatesSpy = jest.spyOn(service, `getStates`).mockRejectedValue(new Error(`getStates error`));
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
    });

    it(`should log about executing the humanize action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStates error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureReleaseNotesHumanize`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-humanize action`,
      } as ILoggerLog);
    });

    it(`should get the release notes states`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStates error`));

      expect(getStatesSpy).toHaveBeenCalledTimes(1);
      expect(getStatesSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the release notes states failed to be fetched`, (): void => {
      beforeEach((): void => {
        getStatesSpy.mockRejectedValue(new Error(`getStates error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getStates error`));
      });
    });

    describe(`when the release notes states were successfully fetched`, (): void => {
      let firebaseGuildChannelFeatureReleaseNotesState: IFirebaseGuildChannelFeatureReleaseNotesState;

      beforeEach((): void => {
        firebaseGuildChannelFeatureReleaseNotesState = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotesState>();

        getStatesSpy.mockResolvedValue(firebaseGuildChannelFeatureReleaseNotesState);
      });

      describe(`when the Discord message guild is not valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
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
          anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
            guild: {},
            id: `dummy-id`,
          });

          discordChannelServiceIsValidSpy.mockReturnValue(true);
        });

        describe(`when the Discord message channel is not a text channel`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
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

          it(`should throw an error about the Firebase channel being invalid`, async (): Promise<void> => {
            expect.assertions(1);

            await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase channel invalid`));
          });
        });

        describe(`when the Discord message channel is a DM channel`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
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

          it(`should fetch a message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));

            expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseGuildChannelFeatureReleaseNotesState);
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

        describe(`when the Discord message channel is a text channel`, (): void => {
          beforeEach((): void => {
            anyDiscordMessage = createHydratedMock<Message>({
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

          it(`should fetch a message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`getMessageResponse error`));

            expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseGuildChannelFeatureReleaseNotesState);
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

  describe(`getStates()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuildVFinal: IFirebaseGuild;

    let loggerServiceErrorSpy: jest.SpyInstance;
    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsValidSpy: jest.SpyInstance;
    let firebaseGuildsChannelsServiceIsUpToDateSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
      anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>();
      firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>();

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
        anyDiscordMessage = createHydratedMock<IAnyDiscordMessage>({
          guild: null,
          id: `dummy-id`,
        });
      });

      it(`should log about the empty guild`, async (): Promise<void> => {
        expect.assertions(3);

        await expect(service.getStates(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );

        expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
          context: `DiscordMessageCommandFeatureReleaseNotesHumanize`,
          hasExtendedContext: true,
          message: `context-[dummy-id] text-could not get the guild from the message`,
        } as ILoggerLog);
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getStates(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not get the guild from the message`)
        );
      });
    });

    describe(`when the given Discord message guild is valid`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createHydratedMock<Message>({
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

        await expect(service.getStates(anyDiscordMessage)).rejects.toThrow(
          new Error(`Could not find the guild dummy-guild-id in Firebase`)
        );

        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsStoreQueryGetEntitySpy).toHaveBeenCalledWith(`dummy-guild-id`);
      });

      describe(`when the given Discord message guild does not exist in the Firebase guilds store`, (): void => {
        beforeEach((): void => {
          firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(undefined);
        });

        it(`should log about the empty guild in Firebase`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(service.getStates(anyDiscordMessage)).rejects.toThrow(
            new Error(`Could not find the guild dummy-guild-id in Firebase`)
          );

          expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(1);
          expect(loggerServiceErrorSpy).toHaveBeenCalledWith({
            context: `DiscordMessageCommandFeatureReleaseNotesHumanize`,
            hasExtendedContext: true,
            message: `context-[dummy-id] text-could not find the guild value-dummy-guild-id in Firebase`,
          } as ILoggerLog);
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.getStates(anyDiscordMessage)).rejects.toThrow(
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
            firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {},
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStates(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v1`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createHydratedMock<IFirebaseGuildV1>({
              version: FirebaseGuildVersionEnum.V1,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStates(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
          });
        });

        describe(`when the Firebase guilds are v2`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createHydratedMock<IFirebaseGuildV2>({
              version: FirebaseGuildVersionEnum.V2,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStates(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel does not exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {
                'bad-dummy-channel-id': createHydratedMock<IFirebaseGuildChannelVFinal>({
                  id: `bad-dummy-channel-id`,
                }),
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.getStates(anyDiscordMessage);

            expect(result.isEnabled).toBeUndefined();
          });
        });

        describe(`when the given Discord message channel exist in the Firebase guilds store channels`, (): void => {
          beforeEach((): void => {
            firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
              channels: {
                'dummy-channel-id': createHydratedMock<IFirebaseGuildChannelVFinal>({
                  id: `dummy-channel-id`,
                }),
              },
              version: FirebaseGuildVersionEnum.V5,
            });

            firebaseGuildsStoreQueryGetEntitySpy.mockReturnValue(firebaseGuildVFinal);
          });

          describe(`when the channel does not have the release notes feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createHydratedMock<IFirebaseGuildChannelVFinal>({
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

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStates(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
            });
          });

          describe(`when the channel does not have the release notes feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createHydratedMock<IFirebaseGuildChannelVFinal>({
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

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStates(anyDiscordMessage);

              expect(result.isEnabled).toBeUndefined();
            });
          });

          describe(`when the channel is not valid`, (): void => {
            beforeEach((): void => {
              firebaseGuildsChannelsServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should return the release notes state with an undefined enabled value`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.getStates(anyDiscordMessage);

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

                const result = await service.getStates(anyDiscordMessage);

                expect(result.isEnabled).toBeUndefined();
              });
            });

            describe(`when the channel is up-to-date`, (): void => {
              beforeEach((): void => {
                firebaseGuildsChannelsServiceIsUpToDateSpy.mockReturnValue(true);
              });

              describe(`when the channel has the release notes feature enabled`, (): void => {
                beforeEach((): void => {
                  firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
                    channels: {
                      'dummy-channel-id': createHydratedMock<IFirebaseGuildChannelVFinal>({
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

                it(`should return the release notes state with an enabled value`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.getStates(anyDiscordMessage);

                  expect(result.isEnabled).toStrictEqual(true);
                });
              });

              describe(`when the channel has the release notes feature disabled`, (): void => {
                beforeEach((): void => {
                  firebaseGuildVFinal = createHydratedMock<IFirebaseGuildVFinal>({
                    channels: {
                      'dummy-channel-id': createHydratedMock<IFirebaseGuildChannelVFinal>({
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

                it(`should return the release notes state with disabled value`, async (): Promise<void> => {
                  expect.assertions(1);

                  const result = await service.getStates(anyDiscordMessage);

                  expect(result.isEnabled).toStrictEqual(false);
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

    let discordMessageHelpServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordSoniaServiceGetCorporationMessageEmbedAuthorSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageColorSpy: jest.SpyInstance;
    let discordSoniaServiceGetImageUrlSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesGetRandomMessageSpy: jest.SpyInstance;
    let discordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesGetRandomMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureReleaseNotesHumanize();
      state = createHydratedMock<IFirebaseGuildChannelFeatureReleaseNotesState>({
        isEnabled: true,
      });

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

      await expect(service.getMessageResponse(state)).rejects.toThrow(new Error(`getMessageResponse help error`));

      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageHelpServiceGetMessageResponseSpy).toHaveBeenCalledWith();
    });

    describe(`when the message response for the help failed to be fetched`, (): void => {
      beforeEach((): void => {
        discordMessageHelpServiceGetMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse help error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.getMessageResponse(state)).rejects.toThrow(new Error(`getMessageResponse help error`));
      });
    });

    describe(`when the message response for the help command was successfully fetched`, (): void => {
      it(`should return a Discord message response embed with an author`, async (): Promise<void> => {
        expect.assertions(1);
        const messageEmbedAuthor: MessageEmbedAuthor = createHydratedMock<MessageEmbedAuthor>();
        discordSoniaServiceGetCorporationMessageEmbedAuthorSpy.mockReturnValue(messageEmbedAuthor);

        const result = await service.getMessageResponse(state);

        expect(result.options.embed?.author).toStrictEqual(messageEmbedAuthor);
      });

      it(`should return a Discord message response embed with a color`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageColorSpy.mockReturnValue(ColorEnum.CANDY);

        const result = await service.getMessageResponse(state);

        expect(result.options.embed?.color).toStrictEqual(ColorEnum.CANDY);
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

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.title).toStrictEqual(
            DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU
          );
        });

        it(`should return a Discord message response embed with a description about the release notes feature not being configured yet`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.description).toStrictEqual(
            `I will not send a message containing the release notes when a new feature is deployed since it was never enabled on this channel.`
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

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.title).toStrictEqual(
            DiscordMessageCommandFeatureReleaseNotesHumanizeDisabledMessagesEnum.I_WILL_NOT_BOTHER_YOU
          );
        });

        it(`should return a Discord message response embed with a description about the release notes feature being disabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.description).toStrictEqual(
            `I will not send a message containing the release notes when a new feature is deployed since it was disabled on this channel.`
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

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.title).toStrictEqual(
            DiscordMessageCommandFeatureReleaseNotesHumanizeEnabledMessagesEnum.I_LOVE_YOU
          );
        });

        it(`should return a Discord message response embed with a description about the release notes feature being enabled`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.description).toStrictEqual(
            `I will send a message on this channel containing the release notes when a new feature is deployed.`
          );
        });
      });

      it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
        expect.assertions(1);
        discordSoniaServiceGetImageUrlSpy.mockReturnValue(`dummy-image-url`);

        const result = await service.getMessageResponse(state);

        expect(result.options.embed?.footer).toStrictEqual({
          iconURL: `dummy-image-url`,
          text: `At your service`,
        } as MessageEmbedFooter);
      });

      describe(`when the Sonia image url is null`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(null);
        });

        it(`should return a Discord message response embed with a footer but without an icon`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.footer).toStrictEqual({
            iconURL: undefined,
            text: `At your service`,
          } as MessageEmbedFooter);
        });
      });

      describe(`when the Sonia image url is "image-url"`, (): void => {
        beforeEach((): void => {
          discordSoniaServiceGetImageUrlSpy.mockReturnValue(`image-url`);
        });

        it(`should return a Discord message response embed with a footer containing an icon and a text`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.getMessageResponse(state);

          expect(result.options.embed?.footer).toStrictEqual({
            iconURL: `image-url`,
            text: `At your service`,
          } as MessageEmbedFooter);
        });
      });

      it(`should return a Discord message response embed with a thumbnail`, async (): Promise<void> => {
        expect.assertions(1);
        discordMessageConfigServiceGetMessageCommandHelpImageUrlSpy.mockReturnValue(IconEnum.ARTIFICIAL_INTELLIGENCE);

        const result = await service.getMessageResponse(state);

        expect(result.options.embed?.thumbnail).toStrictEqual({
          url: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as MessageEmbedThumbnail);
      });

      it(`should return a Discord message response embed with a timestamp`, async (): Promise<void> => {
        expect.assertions(2);

        const result = await service.getMessageResponse(state);

        expect(moment(result.options.embed?.timestamp).isValid()).toStrictEqual(true);

        expect(moment(result.options.embed?.timestamp).fromNow()).toStrictEqual(`a few seconds ago`);
      });

      it(`should return a Discord message response not split`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(state);

        expect(result.options.split).toStrictEqual(false);
      });

      it(`should return a Discord message response without a response text`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(state);

        expect(result.response).toStrictEqual(``);
      });
    });
  });
});
