import { DiscordMessageCommandFeatureNoonStatus } from './discord-message-command-feature-noon-status';
import { FirebaseDmVersionEnum } from '../../../../../../../../firebase/enums/dms/firebase-dm-version.enum';
import { FirebaseGuildVersionEnum } from '../../../../../../../../firebase/enums/guilds/firebase-guild-version.enum';
import { IFirebaseDmV1 } from '../../../../../../../../firebase/interfaces/dms/firebase-dm-v1';
import { IFirebaseGuildV1 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../../../../../../../firebase/interfaces/guilds/firebase-guild-v2';
import { FirebaseDmsStoreService } from '../../../../../../../../firebase/stores/dms/services/firebase-dms-store.service';
import { FirebaseGuildsStoreService } from '../../../../../../../../firebase/stores/guilds/services/firebase-guilds-store.service';
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
import { DiscordMessageCommandFeatureNoonFlagEnum } from '../enums/discord-message-command-feature-noon-flag.enum';
import { DMChannel, Message, TextChannel } from 'discord.js';
import { createHydratedMock, createMock } from 'ts-auto-mock';

jest.mock(`../../../../../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageCommandFeatureNoonStatus`, (): void => {
  let service: DiscordMessageCommandFeatureNoonStatus<DiscordMessageCommandFeatureNoonFlagEnum>;
  let loggerService: LoggerService;
  let firebaseGuildsStoreService: FirebaseGuildsStoreService;
  let firebaseDmsStoreService: FirebaseDmsStoreService;
  let discordChannelService: DiscordChannelService;
  let discordMessageErrorService: DiscordMessageErrorService;

  beforeEach((): void => {
    loggerService = LoggerService.getInstance();
    firebaseGuildsStoreService = FirebaseGuildsStoreService.getInstance();
    firebaseDmsStoreService = FirebaseDmsStoreService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
  });

  describe(`execute()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let executeForDmSpy: jest.SpyInstance;
    let executeForGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonStatus();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      executeForDmSpy = jest.spyOn(service, `executeForDm`).mockRejectedValue(new Error(`executeForDm error`));
      executeForGuildSpy = jest.spyOn(service, `executeForGuild`).mockRejectedValue(new Error(`executeForGuild error`));
    });

    it(`should log about executing the status action`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`executeForGuild error`));

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageCommandFeatureNoonStatus`,
        hasExtendedContext: true,
        message: `context-[dummy-id] text-executing value-status action`,
      } as ILoggerLog);
    });

    describe(`when the message comes from a DM`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          channel: createInstance(DMChannel.prototype),
          id: `dummy-id`,
        });
      });

      it(`should handle the command as a DM`, async (): Promise<void> => {
        expect.assertions(4);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`executeForDm error`));

        expect(executeForGuildSpy).not.toHaveBeenCalled();
        expect(executeForDmSpy).toHaveBeenCalledTimes(1);
        expect(executeForDmSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when handling the command failed`, (): void => {
        beforeEach((): void => {
          executeForDmSpy.mockRejectedValue(new Error(`executeForDm error`));
        });

        it(`should throw`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`executeForDm error`));
        });
      });

      describe(`when handling the command succeeded`, (): void => {
        let response: IDiscordMessageResponse;

        beforeEach((): void => {
          response = createHydratedMock<IDiscordMessageResponse>();

          executeForDmSpy.mockResolvedValue(response);
        });

        it(`should return a response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.execute(anyDiscordMessage);

          expect(result).toStrictEqual(response);
        });
      });
    });

    describe(`when the message does not come from a DM`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage = createMock<IAnyDiscordMessage>({
          channel: createInstance(TextChannel.prototype),
          id: `dummy-id`,
        });
      });

      it(`should handle the command as a guild`, async (): Promise<void> => {
        expect.assertions(4);

        await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`executeForGuild error`));

        expect(executeForDmSpy).not.toHaveBeenCalled();
        expect(executeForGuildSpy).toHaveBeenCalledTimes(1);
        expect(executeForGuildSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });

      describe(`when handling the command failed`, (): void => {
        beforeEach((): void => {
          executeForGuildSpy.mockRejectedValue(new Error(`executeForGuild error`));
        });

        it(`should throw`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.execute(anyDiscordMessage)).rejects.toThrow(new Error(`executeForGuild error`));
        });
      });

      describe(`when handling the command succeeded`, (): void => {
        let response: IDiscordMessageResponse;

        beforeEach((): void => {
          response = createHydratedMock<IDiscordMessageResponse>();

          executeForGuildSpy.mockResolvedValue(response);
        });

        it(`should return a response`, async (): Promise<void> => {
          expect.assertions(1);

          const result = await service.execute(anyDiscordMessage);

          expect(result).toStrictEqual(response);
        });
      });
    });
  });

  describe(`executeForDm()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let isEnabledForThisDmSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonStatus();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        id: `dummy-id`,
      });

      isEnabledForThisDmSpy = jest
        .spyOn(service, `isEnabledForThisDm`)
        .mockRejectedValue(new Error(`isEnabledForThisDm error`));
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
    });

    it(`should get the enabled state`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.executeForDm(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisDm error`));

      expect(isEnabledForThisDmSpy).toHaveBeenCalledTimes(1);
      expect(isEnabledForThisDmSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the noon enabled state failed to be fetched`, (): void => {
      beforeEach((): void => {
        isEnabledForThisDmSpy.mockRejectedValue(new Error(`isEnabledForThisDm error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.executeForDm(anyDiscordMessage)).rejects.toThrow(new Error(`isEnabledForThisDm error`));
      });
    });

    describe(`when the noon enabled state was successfully fetched`, (): void => {
      let firebaseGuildChannelFeatureNoonEnabledState: boolean | undefined;

      beforeEach((): void => {
        firebaseGuildChannelFeatureNoonEnabledState = false;

        isEnabledForThisDmSpy.mockResolvedValue(firebaseGuildChannelFeatureNoonEnabledState);
      });

      describe(`when the Discord message author is not valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createMock<IAnyDiscordMessage>({
            author: null,
            id: `dummy-id`,
          });

          discordChannelServiceIsValidSpy.mockReturnValue(false);
        });

        it(`should throw an error about the Firebase author being invalid`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.executeForDm(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase author invalid`));
        });
      });

      describe(`when the Discord message author is valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createMock<IAnyDiscordMessage>({
            author: {
              id: `dummy-author-id`,
            },
            channel: {
              id: `dummy-channel-id`,
              type: `DM`,
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

            await expect(service.executeForDm(anyDiscordMessage)).rejects.toThrow(
              new Error(`Firebase channel invalid`)
            );
          });
        });

        describe(`when the channel is valid`, (): void => {
          beforeEach((): void => {
            discordChannelServiceIsValidSpy.mockReturnValue(true);
          });

          it(`should fetch a message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.executeForDm(anyDiscordMessage)).rejects.toThrow(
              new Error(`getMessageResponse error`)
            );

            expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseGuildChannelFeatureNoonEnabledState);
          });

          describe(`when the message response could not be fetched`, (): void => {
            beforeEach((): void => {
              getMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse error`));
            });

            it(`should throw an error about the message response fail`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.executeForDm(anyDiscordMessage)).rejects.toThrow(
                new Error(`getMessageResponse error`)
              );
            });
          });

          describe(`when the message response was successfully fetched`, (): void => {
            let discordMessageResponse: IDiscordMessageResponse;

            beforeEach((): void => {
              getMessageResponseSpy.mockResolvedValue(discordMessageResponse);
            });

            it(`should return the message response`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.executeForDm(anyDiscordMessage);

              expect(result).toStrictEqual(discordMessageResponse);
            });
          });
        });
      });
    });
  });

  describe(`executeForGuild()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;

    let isEnabledForThisGuildSpy: jest.SpyInstance;
    let getMessageResponseSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonStatus();
      anyDiscordMessage = createMock<IAnyDiscordMessage>({
        channel: createInstance(TextChannel.prototype),
        id: `dummy-id`,
      });

      isEnabledForThisGuildSpy = jest
        .spyOn(service, `isEnabledForThisGuild`)
        .mockRejectedValue(new Error(`isEnabledForThisGuild error`));
      getMessageResponseSpy = jest
        .spyOn(service, `getMessageResponse`)
        .mockRejectedValue(new Error(`getMessageResponse error`));
      discordChannelServiceIsValidSpy = jest.spyOn(discordChannelService, `isValid`).mockReturnValue(false);
    });

    it(`should get the enabled state`, async (): Promise<void> => {
      expect.assertions(3);

      await expect(service.executeForGuild(anyDiscordMessage)).rejects.toThrow(
        new Error(`isEnabledForThisGuild error`)
      );

      expect(isEnabledForThisGuildSpy).toHaveBeenCalledTimes(1);
      expect(isEnabledForThisGuildSpy).toHaveBeenCalledWith(anyDiscordMessage);
    });

    describe(`when the noon enabled state failed to be fetched`, (): void => {
      beforeEach((): void => {
        isEnabledForThisGuildSpy.mockRejectedValue(new Error(`isEnabledForThisGuild error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.executeForGuild(anyDiscordMessage)).rejects.toThrow(
          new Error(`isEnabledForThisGuild error`)
        );
      });
    });

    describe(`when the noon enabled state was successfully fetched`, (): void => {
      let firebaseGuildChannelFeatureNoonEnabledState: boolean | undefined;

      beforeEach((): void => {
        firebaseGuildChannelFeatureNoonEnabledState = false;

        isEnabledForThisGuildSpy.mockResolvedValue(firebaseGuildChannelFeatureNoonEnabledState);
      });

      describe(`when the Discord message guild is not valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createMock<IAnyDiscordMessage>({
            channel: createInstance(TextChannel.prototype),
            guild: null,
            id: `dummy-id`,
          });

          discordChannelServiceIsValidSpy.mockReturnValue(false);
        });

        it(`should throw an error about the Firebase guild being invalid`, async (): Promise<void> => {
          expect.assertions(1);

          await expect(service.executeForGuild(anyDiscordMessage)).rejects.toThrow(new Error(`Firebase guild invalid`));
        });
      });

      describe(`when the Discord message guild is valid`, (): void => {
        beforeEach((): void => {
          anyDiscordMessage = createMock<IAnyDiscordMessage>({
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

            await expect(service.executeForGuild(anyDiscordMessage)).rejects.toThrow(
              new Error(`Firebase channel invalid`)
            );
          });
        });

        describe(`when the channel is valid`, (): void => {
          beforeEach((): void => {
            discordChannelServiceIsValidSpy.mockReturnValue(true);
          });

          it(`should fetch a message response`, async (): Promise<void> => {
            expect.assertions(3);

            await expect(service.executeForGuild(anyDiscordMessage)).rejects.toThrow(
              new Error(`getMessageResponse error`)
            );

            expect(getMessageResponseSpy).toHaveBeenCalledTimes(1);
            expect(getMessageResponseSpy).toHaveBeenCalledWith(firebaseGuildChannelFeatureNoonEnabledState);
          });

          describe(`when the message response could not be fetched`, (): void => {
            beforeEach((): void => {
              getMessageResponseSpy.mockRejectedValue(new Error(`getMessageResponse error`));
            });

            it(`should throw an error about the message response fail`, async (): Promise<void> => {
              expect.assertions(1);

              await expect(service.executeForGuild(anyDiscordMessage)).rejects.toThrow(
                new Error(`getMessageResponse error`)
              );
            });
          });

          describe(`when the message response was successfully fetched`, (): void => {
            let discordMessageResponse: IDiscordMessageResponse;

            beforeEach((): void => {
              getMessageResponseSpy.mockResolvedValue(discordMessageResponse);
            });

            it(`should return the message response`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.executeForGuild(anyDiscordMessage);

              expect(result).toStrictEqual(discordMessageResponse);
            });
          });
        });
      });
    });
  });

  describe(`isEnabledForThisDm()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseDmVFinal: IFirebaseDmVFinal;

    let firebaseDmsStoreQueryGetEntitySpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonStatus();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      firebaseDmVFinal = createMock<IFirebaseDmVFinal>();

      firebaseDmsStoreQueryGetEntitySpy = jest.spyOn(firebaseDmsStoreService, `getEntity`).mockReturnValue(undefined);
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

      it(`should log and send an error message both in the DM and the Sonia guild errors channel`, async (): Promise<void> => {
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
            id: `dummy-channel-id`,
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

        it(`should log and send an error message both in DM and the Sonia guild errors channel`, async (): Promise<void> => {
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
          firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
        });

        describe(`when the Firebase DMs are v1`, (): void => {
          beforeEach((): void => {
            firebaseDmVFinal = createMock<IFirebaseDmV1>({
              version: FirebaseDmVersionEnum.V1,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isEnabledForThisDm(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message author does not exist in the Firebase DMs store`, (): void => {
          beforeEach((): void => {
            firebaseDmVFinal = createMock<IFirebaseDmVFinal>({
              id: `bad-dummy-dm-id`,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
          });

          it(`should return undefined`, async (): Promise<void> => {
            expect.assertions(1);

            const result = await service.isEnabledForThisDm(anyDiscordMessage);

            expect(result).toBeUndefined();
          });
        });

        describe(`when the given Discord message author exist in the Firebase DMs store`, (): void => {
          beforeEach((): void => {
            firebaseDmVFinal = createMock<IFirebaseDmVFinal>({
              id: `dummy-dm-id`,
              version: FirebaseDmVersionEnum.V1,
            });

            firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
          });

          describe(`when the DM does not have the noon feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseDmVFinal = createMock<IFirebaseDmVFinal>({
                features: {
                  noon: undefined,
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isEnabledForThisDm(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the DM does not have the noon feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseDmVFinal = createMock<IFirebaseDmVFinal>({
                features: {
                  noon: {
                    isEnabled: undefined,
                  },
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
            });

            it(`should return undefined`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isEnabledForThisDm(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the DM has the noon feature enabled`, (): void => {
            beforeEach((): void => {
              firebaseDmVFinal = createMock<IFirebaseDmVFinal>({
                features: {
                  noon: {
                    isEnabled: true,
                  },
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
            });

            it(`should return true`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isEnabledForThisDm(anyDiscordMessage);

              expect(result).toBe(true);
            });
          });

          describe(`when the DM has the noon feature disabled`, (): void => {
            beforeEach((): void => {
              firebaseDmVFinal = createMock<IFirebaseDmVFinal>({
                features: {
                  noon: {
                    isEnabled: false,
                  },
                },
                id: `dummy-dm-id`,
                version: FirebaseDmVersionEnum.V1,
              });

              firebaseDmsStoreQueryGetEntitySpy.mockReturnValue(firebaseDmVFinal);
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

  describe(`isEnabledForThisGuild()`, (): void => {
    let anyDiscordMessage: IAnyDiscordMessage;
    let firebaseGuildVFinal: IFirebaseGuild;

    let firebaseGuildsStoreQueryGetEntitySpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonStatus();
      anyDiscordMessage = createMock<IAnyDiscordMessage>();
      firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>();

      firebaseGuildsStoreQueryGetEntitySpy = jest
        .spyOn(firebaseGuildsStoreService, `getEntity`)
        .mockReturnValue(undefined);
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

      it(`should log and send an error message both in the channel and the Sonia guild errors channel`, async (): Promise<void> => {
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

        it(`should log and send an error message both in the channel and the Sonia guild errors channel`, async (): Promise<void> => {
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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

            const result = await service.isEnabledForThisGuild(anyDiscordMessage);

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

          describe(`when the channel does not have the noon feature configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: undefined,
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

              const result = await service.isEnabledForThisGuild(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel does not have the noon feature enabled option configured yet`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: {
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

              const result = await service.isEnabledForThisGuild(anyDiscordMessage);

              expect(result).toBeUndefined();
            });
          });

          describe(`when the channel has the noon feature enabled`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: {
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

            it(`should return true`, async (): Promise<void> => {
              expect.assertions(1);

              const result = await service.isEnabledForThisGuild(anyDiscordMessage);

              expect(result).toBe(true);
            });
          });

          describe(`when the channel has the noon feature disabled`, (): void => {
            beforeEach((): void => {
              firebaseGuildVFinal = createMock<IFirebaseGuildVFinal>({
                channels: {
                  'dummy-channel-id': createMock<IFirebaseGuildChannelVFinal>({
                    features: {
                      noon: {
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

  describe(`getMessageResponse()`, (): void => {
    let isEnabled: boolean | undefined;

    beforeEach((): void => {
      service = new DiscordMessageCommandFeatureNoonStatus();
      isEnabled = false;
    });

    describe(`when the enabled state is undefined`, (): void => {
      beforeEach((): void => {
        isEnabled = undefined;
      });

      it(`should return a Discord message response with a response telling that the noon feature is disabled`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(isEnabled);

        expect(result.content).toBe(`The noon feature is disabled.`);
      });
    });

    describe(`when the enabled state is false`, (): void => {
      beforeEach((): void => {
        isEnabled = false;
      });

      it(`should return a Discord message response with a response telling that the noon feature is disabled`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(isEnabled);

        expect(result.content).toBe(`The noon feature is disabled.`);
      });
    });

    describe(`when the enabled state is true`, (): void => {
      beforeEach((): void => {
        isEnabled = true;
      });

      it(`should return a Discord message response with a response telling that the noon feature is enabled`, async (): Promise<void> => {
        expect.assertions(1);

        const result = await service.getMessageResponse(isEnabled);

        expect(result.content).toBe(`The noon feature is enabled.`);
      });
    });
  });
});
