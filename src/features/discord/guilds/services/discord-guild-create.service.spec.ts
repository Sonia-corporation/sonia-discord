import { Client, Guild, GuildChannel, TextChannel } from "discord.js";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import * as isDiscordGuildChannelModule from "../../channels/functions/is-discord-guild-channel";
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

jest.mock(`../../../logger/services/chalk/chalk.service`);

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

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
    discordGuildConfigService = DiscordGuildConfigService.getInstance();
    discordChannelGuildService = DiscordChannelGuildService.getInstance();
    discordMessageCommandCookieService = DiscordMessageCommandCookieService.getInstance();
    discordGuildSoniaService = DiscordGuildSoniaService.getInstance();
    discordLoggerErrorService = DiscordLoggerErrorService.getInstance();
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
          (_event: string, listener: () => void): void => {
            listener();
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
        expect(sendMessageSpy).toHaveBeenCalledWith(undefined);
      });

      it(`should add the guild into Firebase`, (): void => {
        expect.assertions(2);

        service.init();

        expect(addFirebaseGuildSpy).toHaveBeenCalledTimes(1);
        expect(addFirebaseGuildSpy).toHaveBeenCalledWith(undefined);
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

    let discordGuildConfigServiceShouldSendCookiesOnCreateSpy: jest.SpyInstance;
    let discordChannelGuildServiceGetPrimarySpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let loggerServiceErrorSpy: jest.SpyInstance;
    let discordMessageCommandCookieServiceGetMessageResponseSpy: jest.SpyInstance;
    let discordGuildSoniaServiceSendMessageToChannelSpy: jest.SpyInstance;
    let discordLoggerErrorServiceGetErrorMessageResponseSpy: jest.SpyInstance;
    let isDiscordGuildChannelSpy: jest.SpyInstance;
    let guildChannelSendMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordGuildCreateService();
      guild = createMock<Guild>();
      primaryGuildChannel = createMock<GuildChannel>();
      discordMessageResponse = createMock<IDiscordMessageResponse>();
      discordMessageErrorResponse = createMock<IDiscordMessageResponse>();

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
      isDiscordGuildChannelSpy = jest
        .spyOn(isDiscordGuildChannelModule, `isDiscordGuildChannel`)
        .mockImplementation();
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
          new Error(`No primary guild channel found`)
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
          isDiscordGuildChannelSpy.mockReturnValue(false);
        });
      });

      describe(`when the primary guild channel was found`, (): void => {
        beforeEach((): void => {
          primaryGuildChannel = createMock<TextChannel>();

          discordChannelGuildServiceGetPrimarySpy.mockReturnValue(
            primaryGuildChannel
          );
          isDiscordGuildChannelSpy.mockReturnValue(true);
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
              new Error(`No primary guild channel found`)
            );

            expect(
              discordMessageCommandCookieServiceGetMessageResponseSpy
            ).toHaveBeenCalledTimes(1);
            expect(
              discordMessageCommandCookieServiceGetMessageResponseSpy
            ).toHaveBeenCalledWith(guild);
          });

          it(`should log about Sonia sending a message about the guild creation`, async (): Promise<
            void
          > => {
            expect.assertions(3);

            await expect(service.sendMessage(guild)).rejects.toThrow(
              new Error(`No primary guild channel found`)
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
              new Error(`No primary guild channel found`)
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
                new Error(`No primary guild channel found`)
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
                new Error(`No primary guild channel found`)
              );

              expect(loggerServiceErrorSpy).toHaveBeenCalledTimes(2);
              expect(loggerServiceErrorSpy).toHaveBeenNthCalledWith(2, {
                context: `DiscordGuildCreateService`,
                message: `error-error`,
              } as ILoggerLog);
            });

            it(`should get the formatted error response`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(service.sendMessage(guild)).rejects.toThrow(
                new Error(`No primary guild channel found`)
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
                new Error(`No primary guild channel found`)
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
              guildChannelSendMock.mockResolvedValue(undefined);
            });

            it(`should log about the success of the cookies message sending on the primary guild channel`, async (): Promise<
              void
            > => {
              expect.assertions(3);

              await expect(service.sendMessage(guild)).rejects.toThrow(
                new Error(`No primary guild channel found`)
              );

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `DiscordGuildCreateService`,
                message: `text-cookies message for the create guild sent`,
              } as ILoggerLog);
            });
          });
        });
      });

      it(`should not log about Sonia not being allowed to send cookies message`, async (): Promise<
        void
      > => {
        expect.assertions(2);

        await expect(service.sendMessage(guild)).rejects.toThrow(
          new Error(`No primary guild channel found`)
        );

        expect(loggerServiceDebugSpy).not.toHaveBeenCalled();
      });
    });
  });
});
