import { Client, Guild, GuildChannel, Message, TextChannel } from "discord.js";
import * as admin from "firebase-admin";
import { of, throwError } from "rxjs";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { FirebaseGuildsService } from "../../../firebase/services/firebase-guilds.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordChannelGuildService } from "../../channels/services/discord-channel-guild.service";
import { DiscordLoggerErrorService } from "../../logger/services/discord-logger-error.service";
import { IDiscordMessageResponse } from "../../messages/interfaces/discord-message-response";
import { DiscordMessageCommandCookieService } from "../../messages/services/command/cookie/discord-message-command-cookie.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildSoniaChannelNameEnum } from "../enums/discord-guild-sonia-channel-name.enum";
import { IDiscordGuildSoniaSendMessageToChannel } from "../interfaces/discord-guild-sonia-send-message-to-channel";
import { DiscordGuildConfigService } from "./config/discord-guild-config.service";
import { DiscordGuildCreateService } from "./discord-guild-create.service";
import { DiscordGuildSoniaService } from "./discord-guild-sonia.service";
import WriteResult = admin.firestore.WriteResult;

jest.mock(`./discord-guild-sonia.service`);
jest.mock(`../../../logger/services/chalk/chalk.service`);
jest.mock(`../../logger/services/discord-logger-error.service`);
jest.mock(
  `../../messages/services/command/cookie/discord-message-command-cookie.service`
);

describe(`DiscordGuildCreateService`, (): void => {
  let service: DiscordGuildCreateService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;
  let discordGuildConfigService: DiscordGuildConfigService;
  let discordChannelGuildService: DiscordChannelGuildService;
  let discordMessageCommandCookieService: DiscordMessageCommandCookieService;
  let discordGuildSoniaService: DiscordGuildSoniaService;
  let discordLoggerErrorService: DiscordLoggerErrorService;
  let firebaseGuildsService: FirebaseGuildsService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildConfigService = DiscordGuildConfigService.getInstance();
    discordChannelGuildService = DiscordChannelGuildService.getInstance();
    discordMessageCommandCookieService = DiscordMessageCommandCookieService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
    firebaseGuildsService = FirebaseGuildsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildCreate service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildCreateService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildCreateService));
    });

    it(`should return the created DiscordGuildCreate service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildCreateService.getInstance();

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

    it(`should notify the DiscordGuildCreate service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildCreateService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_CREATE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let client: Client;
    let guild: Guild;
    let discordClientServiceGetClientOnMock: jest.Mock;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let sendMessageSpy: jest.SpyInstance;
    let addFirebaseGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildCreateService();
      discordClientServiceGetClientOnMock = jest.fn();
      client = createMock<Client>({
        on: discordClientServiceGetClientOnMock,
      });
      guild = createMock<Guild>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `getClient`)
        .mockReturnValue(client);
      sendMessageSpy = jest.spyOn(service, `sendMessage`).mockImplementation();
      addFirebaseGuildSpy = jest
        .spyOn(service, `addFirebaseGuild`)
        .mockImplementation();
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should listen for the Discord client guildCreate event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledWith(
        `guildCreate`,
        expect.any(Function)
      );
    });

    describe(`when the Discord client guildCreate event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn(
          (
            _event: string,
            listener: (guild: Readonly<Guild>) => void
          ): void => {
            listener(guild);
          }
        );
        client = createMock<Client>({
          on: discordClientServiceGetClientOnMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should log about the guild create event received`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordGuildCreateService`,
          message: `text-"guildCreate" event triggered`,
        } as ILoggerLog);
      });

      it(`should send a message`, (): void => {
        expect.assertions(2);

        service.init();

        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
        expect(sendMessageSpy).toHaveBeenCalledWith(guild);
      });

      it(`should add the guild into Firebase`, (): void => {
        expect.assertions(2);

        service.init();

        expect(addFirebaseGuildSpy).toHaveBeenCalledTimes(1);
        expect(addFirebaseGuildSpy).toHaveBeenCalledWith(guild);
      });
    });

    it(`should log about listening Discord guildCreate event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordGuildCreateService`,
        message: `text-listen "guildCreate" event`,
      } as ILoggerLog);
    });
  });

  describe(`sendMessage()`, (): void => {
    let guild: Guild;
    let primaryGuildChannel: GuildChannel | null;
    let discordMessageResponse: IDiscordMessageResponse;
    let discordMessageErrorResponse: IDiscordMessageResponse;
    let message: Message;

    let discordGuildConfigServiceShouldSendCookiesOnCreateSpy: jest.SpyInstance;
    let discordChannelGuildServiceGetPrimarySpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordMessageCommandCookieServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordLoggerErrorServiceGetErrorMessageResponseSpy: jest.SpyInstance;
    let guildChannelSendMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordGuildCreateService();
      guild = createMock<Guild>();
      primaryGuildChannel = createMock<GuildChannel>();
      discordMessageResponse = createMock<IDiscordMessageResponse>();
      discordMessageErrorResponse = createMock<IDiscordMessageResponse>();
      message = createMock<Message>();

      discordGuildConfigServiceShouldSendCookiesOnCreateSpy = jest
        .spyOn(discordGuildConfigService, `shouldSendCookiesOnCreate`)
        .mockReturnValue(false);
      discordChannelGuildServiceGetPrimarySpy = jest
        .spyOn(discordChannelGuildService, `getPrimary`)
        .mockReturnValue(primaryGuildChannel);
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
      loggerServiceErrorSpy = jest
        .spyOn(loggerService, `error`)
        .mockImplementation();
      discordMessageCommandCookieServiceGetMessageResponseSpy = jest
        .spyOn(discordMessageCommandCookieService, `getMessageResponse`)
        .mockReturnValue(discordMessageResponse);
      discordGuildSoniaServiceSendMessageToChannelSpy = jest
        .spyOn(discordGuildSoniaService, `sendMessageToChannel`)
        .mockImplementation();
      discordLoggerErrorServiceGetErrorMessageResponseSpy = jest
        .spyOn(discordLoggerErrorService, `getErrorMessageResponse`)
        .mockReturnValue(discordMessageErrorResponse);
      guildChannelSendMock = jest.fn().mockRejectedValue(new Error(`error`));
    });

    describe(`when Sonia is not allowed to send cookies message as welcome message`, (): void => {
      beforeEach((): void => {
        discordGuildConfigServiceShouldSendCookiesOnCreateSpy.mockReturnValue(
          false
        );
      });

      it(`should log about Sonia not being allowed to send cookies message`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`Can not send cookies message`)
        );

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordGuildCreateService`,
          message: `text-guild create cookies message sending disabled`,
        } as ILoggerLog);
      });

      it(`should not get the primary guild channel from the given guild`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`Can not send cookies message`)
        );

        expect(discordChannelGuildServiceGetPrimarySpy).not.toHaveBeenCalled();
      });

      it(`should not get the cookie message response`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`Can not send cookies message`)
        );

        expect(
          discordMessageCommandCookieServiceGetMessageResponseSpy
        ).not.toHaveBeenCalled();
      });
    });

    describe(`when Sonia is allowed to send cookies message as welcome message`, (): void => {
      beforeEach((): void => {
        discordGuildConfigServiceShouldSendCookiesOnCreateSpy.mockReturnValue(
          true
        );
      });

      it(`should get the primary guild channel from the given guild`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`Primary guild channel not writable`)
        );

        expect(discordChannelGuildServiceGetPrimarySpy).toHaveBeenCalledTimes(
          1
        );
        expect(discordChannelGuildServiceGetPrimarySpy).toHaveBeenCalledWith(
          guild
        );
      });

      describe(`when the primary guild channel does not exists`, (): void => {
        beforeEach((): void => {
          primaryGuildChannel = null;

          discordChannelGuildServiceGetPrimarySpy.mockReturnValue(
            primaryGuildChannel
          );
        });

        it(`should throw an error about the primary guild channel not found`, async (): Promise<
          void
        > => {
          expect.assertions(1);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`No primary guild channel found`)
          );
        });

        it(`should not get the cookie message response`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.sendMessage(guild)).rejects.toThrow(
            new Error(`No primary guild channel found`)
          );

          expect(
            discordMessageCommandCookieServiceGetMessageResponseSpy
          ).not.toHaveBeenCalled();
        });
      });

      describe(`when the primary guild channel was found`, (): void => {
        beforeEach((): void => {
          primaryGuildChannel = createMock<TextChannel>();

          discordChannelGuildServiceGetPrimarySpy.mockReturnValue(
            primaryGuildChannel
          );
        });

        describe(`when the primary guild channel is not writable`, (): void => {
          beforeEach((): void => {
            primaryGuildChannel = createMock<GuildChannel>({
              type: `voice`,
            });

            discordChannelGuildServiceGetPrimarySpy.mockReturnValue(
              primaryGuildChannel
            );
          });

          it(`should log about the primary guild channel not being writable`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(service.sendMessage(guild)).rejects.toThrow(
              new Error(`Primary guild channel not writable`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordGuildCreateService`,
              message: `text-primary guild channel not writable`,
            } as ILoggerLog);
          });

          it(`should not get the cookie message response`, async (): Promise<
            void
          > => {
            expect.assertions(2);

            await expect(service.sendMessage(guild)).rejects.toThrow(
              new Error(`Primary guild channel not writable`)
            );

            expect(
              discordMessageCommandCookieServiceGetMessageResponseSpy
            ).not.toHaveBeenCalled();
          });
        });

        describe(`when the primary guild channel is writable`, (): void => {
          beforeEach((): void => {
            primaryGuildChannel = createMock<TextChannel>({
              send: guildChannelSendMock,
              type: `text`,
            });

            discordChannelGuildServiceGetPrimarySpy.mockReturnValue(
              primaryGuildChannel
            );
          });

          it(`should get the cookie message response`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(service.sendMessage(guild)).rejects.toThrow(
              new Error(`error`)
            );

            expect(
              discordMessageCommandCookieServiceGetMessageResponseSpy
            ).toHaveBeenCalledTimes(1);
            expect(
              discordMessageCommandCookieServiceGetMessageResponseSpy
            ).toHaveBeenCalledWith();
          });

          it(`should log about Sonia sending a message about the guild creation`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(service.sendMessage(guild)).rejects.toThrow(
              new Error(`error`)
            );

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordGuildCreateService`,
              message: `text-sending message for the guild create...`,
            } as ILoggerLog);
          });

          it(`should send the cookies message on the primary guild channel`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(service.sendMessage(guild)).rejects.toThrow(
              new Error(`error`)
            );

            expect(guildChannelSendMock).toHaveBeenCalledTimes(1);
            expect(guildChannelSendMock).toHaveBeenCalledWith(
              discordMessageResponse.response,
              discordMessageResponse.options
            );
          });

          describe(`when the message was not successfully sent`, (): void => {
            beforeEach((): void => {
              guildChannelSendMock.mockRejectedValue(new Error(`error`));
            });

            it(`should log about failing to send the cookies message to the primary guild channel`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(service.sendMessage(guild)).rejects.toThrow(
                new Error(`error`)
              );

              expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(1, {
                context: `DiscordGuildCreateService`,
                message: `text-cookies message sending for the create guild failed`,
              } as ILoggerLog);
            });

            it(`should log the error`, async (): Promise<void> => {
              expect.assertions(3);

              await expect(service.sendMessage(guild)).rejects.toThrow(
                new Error(`error`)
              );

              expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordGuildCreateService`,
                message: `error-Error: error`,
              } as ILoggerLog);
            });

            it(`should get the formatted error response`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(service.sendMessage(guild)).rejects.toThrow(
                new Error(`error`)
              );

              expect(
                discordLoggerErrorServiceGetErrorMessageResponseSpy
              ).toHaveBeenCalledTimes(1);
              expect(
                discordLoggerErrorServiceGetErrorMessageResponseSpy
              ).toHaveBeenCalledWith(new Error(`error`));
            });

            it(`should send the error message response to the Sonia errors channel`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(service.sendMessage(guild)).rejects.toThrow(
                new Error(`error`)
              );

              expect(
                discordGuildSoniaServiceSendMessageToChannelSpy
              ).toHaveBeenCalledTimes(1);
              expect(
                discordGuildSoniaServiceSendMessageToChannelSpy
              ).toHaveBeenCalledWith({
                channelName: DiscordGuildSoniaChannelNameEnum.ERRORS,
                messageResponse: discordMessageErrorResponse,
              } as IDiscordGuildSoniaSendMessageToChannel);
            });
          });

          describe(`when the message was successfully sent`, (): void => {
            beforeEach((): void => {
              guildChannelSendMock.mockResolvedValue(message);
            });

            it(`should log about the success of the cookies message sending on the primary guild channel`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              const result = await service.sendMessage(guild);

              expect(result).toStrictEqual(message);
              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `DiscordGuildCreateService`,
                message: `text-cookies message for the create guild sent`,
              } as ILoggerLog);
            });
          });
        });
      });
    });
  });

  describe(`addFirebaseGuild()`, (): void => {
    let guild: Guild;
    let writeResult: WriteResult;

    let firebaseGuildsServiceIsReady$Spy: jest.SpyInstance;
    let firebaseGuildsServiceHasGuildSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceSuccessSpy: jest.SpyInstance;
    let firebaseGuildsServiceAddGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildCreateService();
      guild = createMock<Guild>({
        id: `dummy-id`,
      });
      writeResult = createMock<WriteResult>();

      firebaseGuildsServiceIsReady$Spy = jest
        .spyOn(firebaseGuildsService, `isReady$`)
        .mockReturnValue(of(true));
      firebaseGuildsServiceHasGuildSpy = jest
        .spyOn(firebaseGuildsService, `hasGuild`)
        .mockRejectedValue(new Error(`error`));
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceSuccessSpy = jest
        .spyOn(loggerService, `success`)
        .mockImplementation();
      firebaseGuildsServiceAddGuildSpy = jest
        .spyOn(firebaseGuildsService, `addGuild`)
        .mockRejectedValue(new Error(`error`));
    });

    it(`should wait for the Firebase app to be ready`, async (): Promise<
      void
    > => {
      expect.assertions(3);

      await expect(service.addFirebaseGuild(guild)).rejects.toThrow(
        new Error(`error`)
      );

      expect(firebaseGuildsServiceIsReady$Spy).toHaveBeenCalledTimes(1);
      expect(firebaseGuildsServiceIsReady$Spy).toHaveBeenCalledWith();
    });

    describe(`when the Firebase app failed to be ready`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceIsReady$Spy.mockReturnValue(
          throwError(new Error(`error`))
        );
      });

      it(`should not check if the Firebase app has the given guild`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(service.addFirebaseGuild(guild)).rejects.toThrow(
          new Error(`error`)
        );

        expect(firebaseGuildsServiceHasGuildSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the Firebase app was ready`, (): void => {
      beforeEach((): void => {
        firebaseGuildsServiceIsReady$Spy.mockReturnValue(of(true));
      });

      it(`should check if the Firebase app has the given guild`, async (): Promise<
        void
      > => {
        expect.assertions(3);

        await expect(service.addFirebaseGuild(guild)).rejects.toThrow(
          new Error(`error`)
        );

        expect(firebaseGuildsServiceHasGuildSpy).toHaveBeenCalledTimes(1);
        expect(firebaseGuildsServiceHasGuildSpy).toHaveBeenCalledWith(
          `dummy-id`
        );
      });

      describe(`when the check for the Firebase guild has failed`, (): void => {
        beforeEach((): void => {
          firebaseGuildsServiceHasGuildSpy.mockRejectedValue(
            new Error(`error`)
          );
        });

        it(`should not add the guild into Firebase`, async (): Promise<
          void
        > => {
          expect.assertions(2);

          await expect(service.addFirebaseGuild(guild)).rejects.toThrow(
            new Error(`error`)
          );

          expect(firebaseGuildsServiceAddGuildSpy).not.toHaveBeenCalled();
        });
      });

      describe(`when the check for the Firebase guild was successful`, (): void => {
        describe(`when the guild is already in Firebase`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceHasGuildSpy.mockResolvedValue(true);
          });

          it(`should log that the guild was already created`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            const result = await service.addFirebaseGuild(guild);

            expect(result).toBeUndefined();
            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
              context: `DiscordGuildCreateService`,
              message: `text-Firebase guild already created`,
            } as ILoggerLog);
          });

          it(`should not add the guild into Firebase`, async (): Promise<
            void
          > => {
            expect.assertions(2);

            const result = await service.addFirebaseGuild(guild);

            expect(result).toBeUndefined();
            expect(firebaseGuildsServiceAddGuildSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the guild is not in Firebase`, (): void => {
          beforeEach((): void => {
            firebaseGuildsServiceHasGuildSpy.mockResolvedValue(false);
          });

          it(`should log that the guild was not already created`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            const result = await service.addFirebaseGuild(guild);

            expect(result).toBeUndefined();
            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
              context: `DiscordGuildCreateService`,
              message: `text-guild not yet created on Firebase`,
            } as ILoggerLog);
          });

          it(`should add the guild into Firebase`, async (): Promise<void> => {
            expect.assertions(3);

            const result = await service.addFirebaseGuild(guild);

            expect(result).toBeUndefined();
            expect(firebaseGuildsServiceAddGuildSpy).toHaveBeenCalledTimes(1);
            expect(firebaseGuildsServiceAddGuildSpy).toHaveBeenCalledWith(
              guild
            );
          });

          describe(`when the guild was not successfully added into Firebase`, (): void => {
            beforeEach((): void => {
              firebaseGuildsServiceAddGuildSpy.mockRejectedValue(
                new Error(`error`)
              );
            });

            it(`should log that the guild could not be added to Firestore`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              const result = await service.addFirebaseGuild(guild);

              expect(result).toBeUndefined();
              expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordGuildCreateService`,
                message: `text-could not add the guild into Firestore`,
              } as ILoggerLog);
            });
          });

          describe(`when the guild was successfully added into Firebase`, (): void => {
            beforeEach((): void => {
              firebaseGuildsServiceAddGuildSpy.mockResolvedValue(writeResult);
            });

            it(`should log about the success of adding the guild into Firebase`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              const result = await service.addFirebaseGuild(guild);

              expect(result).toStrictEqual(writeResult);
              expect(loggerServiceSuccessSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceSuccessSpy).toHaveBeenCalledWith({
                context: `DiscordGuildCreateService`,
                message: `text-guild added into Firebase`,
              } as ILoggerLog);
            });
          });
        });
      });
    });
  });
});
