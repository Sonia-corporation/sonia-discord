import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordChannelService } from "../../channels/services/discord-channel.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordAuthorService } from "../../users/services/discord-author.service";
import { IDiscordMessageResponse } from "../interfaces/discord-message-response";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessageDmService } from "./discord-message-dm.service";
import { DiscordMessageErrorService } from "./discord-message-error.service";
import { DiscordMessageService } from "./discord-message.service";
import { Client, MessageOptions } from "discord.js";

jest.mock(`../../../logger/services/chalk.service`);

describe(`DiscordMessageService`, (): void => {
  let service: DiscordMessageService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;
  let discordAuthorService: DiscordAuthorService;
  let discordChannelService: DiscordChannelService;
  let discordMessageErrorService: DiscordMessageErrorService;
  let discordMessageDmService: DiscordMessageDmService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
    discordAuthorService = DiscordAuthorService.getInstance();
    discordChannelService = DiscordChannelService.getInstance();
    discordMessageErrorService = DiscordMessageErrorService.getInstance();
    discordMessageDmService = DiscordMessageDmService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessage service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageService));
    });

    it(`should return the created DiscordMessage service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageService.getInstance();

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

    it(`should notify the DiscordMessage service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let client: Client;
    let anyDiscordMessage: AnyDiscordMessage;
    let discordClientServiceGetClientOnMock: jest.Mock;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let sendMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageService();
      discordClientServiceGetClientOnMock = jest.fn();
      client = createMock<Client>({
        on: discordClientServiceGetClientOnMock,
      });
      anyDiscordMessage = createMock<AnyDiscordMessage>();

      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      discordClientServiceGetClientSpy = jest
        .spyOn(discordClientService, `getClient`)
        .mockReturnValue(client);
      sendMessageSpy = jest.spyOn(service, `sendMessage`).mockImplementation();
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should listen for the Discord client message event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledWith(
        `message`,
        expect.any(Function)
      );
    });

    describe(`when the Discord client message event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn(
          (
            _event: string,
            listener: (anyDiscordMessage: Readonly<AnyDiscordMessage>) => void
          ): void => {
            listener(anyDiscordMessage);
          }
        );
        client = createMock<Client>({
          on: discordClientServiceGetClientOnMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should send a message`, (): void => {
        expect.assertions(2);

        service.init();

        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
        expect(sendMessageSpy).toHaveBeenCalledWith(anyDiscordMessage);
      });
    });

    it(`should log about listening Discord message event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordMessageService`,
        message: `text-listen "message" event`,
      } as ILoggerLog);
    });
  });

  describe(`sendMessage()`, (): void => {
    let anyDiscordMessage: AnyDiscordMessage;

    let loggerServiceLogSpy: jest.SpyInstance;
    let handleChannelMessageSpy: jest.SpyInstance;
    let discordAuthorServiceIsValidSpy: jest.SpyInstance;
    let discordAuthorServiceIsBotSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessage = createMock<AnyDiscordMessage>({
        id: `dummy-id`,
      });

      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
      handleChannelMessageSpy = jest
        .spyOn(service, `handleChannelMessage`)
        .mockImplementation();
      discordAuthorServiceIsValidSpy = jest.spyOn(
        discordAuthorService,
        `isValid`
      );
      discordAuthorServiceIsBotSpy = jest.spyOn(discordAuthorService, `isBot`);
      discordChannelServiceIsValidSpy = jest.spyOn(
        discordChannelService,
        `isValid`
      );
    });

    describe(`when the given Discord message content is null`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = null;
      });

      it(`should not log about the received message`, (): void => {
        expect.assertions(1);

        service.sendMessage(anyDiscordMessage);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should not handle the channel message`, (): void => {
        expect.assertions(1);

        service.sendMessage(anyDiscordMessage);

        expect(handleChannelMessageSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given Discord message content is an empty string`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = ``;
      });

      it(`should not log about the received message`, (): void => {
        expect.assertions(1);

        service.sendMessage(anyDiscordMessage);

        expect(loggerServiceLogSpy).not.toHaveBeenCalled();
      });

      it(`should not handle the channel message`, (): void => {
        expect.assertions(1);

        service.sendMessage(anyDiscordMessage);

        expect(handleChannelMessageSpy).not.toHaveBeenCalled();
      });
    });

    describe(`when the given Discord message content is a valid string`, (): void => {
      beforeEach((): void => {
        anyDiscordMessage.content = `dummy-content`;
      });

      it(`should log about the received message`, (): void => {
        expect.assertions(2);

        service.sendMessage(anyDiscordMessage);

        expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceLogSpy).toHaveBeenCalledWith({
          context: `DiscordMessageService`,
          extendedContext: true,
          message: `context-[dummy-id] text-dummy-content`,
        } as ILoggerLog);
      });

      describe(`when the message author is valid`, (): void => {
        beforeEach((): void => {
          discordAuthorServiceIsValidSpy.mockReturnValue(true);
        });

        describe(`when the message author is a bot`, (): void => {
          beforeEach((): void => {
            discordAuthorServiceIsBotSpy.mockReturnValue(true);
          });

          it(`should not handle the channel message`, (): void => {
            expect.assertions(1);

            service.sendMessage(anyDiscordMessage);

            expect(handleChannelMessageSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the message author is not a bot`, (): void => {
          beforeEach((): void => {
            discordAuthorServiceIsBotSpy.mockReturnValue(false);
          });

          describe(`when the message channel is not valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(false);
            });

            it(`should not handle the channel message`, (): void => {
              expect.assertions(1);

              service.sendMessage(anyDiscordMessage);

              expect(handleChannelMessageSpy).not.toHaveBeenCalled();
            });
          });

          describe(`when the message channel is valid`, (): void => {
            beforeEach((): void => {
              discordChannelServiceIsValidSpy.mockReturnValue(true);
            });

            it(`should handle the channel message`, (): void => {
              expect.assertions(2);

              service.sendMessage(anyDiscordMessage);

              expect(handleChannelMessageSpy).toHaveBeenCalledTimes(1);
              expect(handleChannelMessageSpy).toHaveBeenCalledWith(
                anyDiscordMessage
              );
            });
          });
        });
      });

      describe(`when the message author is not valid`, (): void => {
        beforeEach((): void => {
          discordAuthorServiceIsValidSpy.mockReturnValue(false);
        });

        describe(`when the message channel is not valid`, (): void => {
          beforeEach((): void => {
            discordChannelServiceIsValidSpy.mockReturnValue(false);
          });

          it(`should not handle the channel message`, (): void => {
            expect.assertions(1);

            service.sendMessage(anyDiscordMessage);

            expect(handleChannelMessageSpy).not.toHaveBeenCalled();
          });
        });

        describe(`when the message channel is valid`, (): void => {
          beforeEach((): void => {
            discordChannelServiceIsValidSpy.mockReturnValue(true);
          });

          it(`should handle the channel message`, (): void => {
            expect.assertions(2);

            service.sendMessage(anyDiscordMessage);

            expect(handleChannelMessageSpy).toHaveBeenCalledTimes(1);
            expect(handleChannelMessageSpy).toHaveBeenCalledWith(
              anyDiscordMessage
            );
          });
        });
      });
    });
  });

  describe(`handleChannelMessage()`, (): void => {
    let anyDiscordMessage: AnyDiscordMessage;
    let discordMessageResponse: IDiscordMessageResponse;
    let anyDiscordMessageChannelSendMock: jest.Mock;

    let discordChannelServiceIsDmSpy: jest.SpyInstance;
    let discordChannelServiceIsTextSpy: jest.SpyInstance;
    let loggerServiceDebugSpy: jest.SpyInstance;
    let loggerServiceLogSpy: jest.SpyInstance;
    let discordMessageDmServiceGetMessageSpy: jest.SpyInstance;
    let discordMessageErrorServiceHandleErrorSpy: jest.SpyInstance;
    let discordChannelServiceIsValidSpy: jest.SpyInstance;

    beforeEach((): void => {
      anyDiscordMessageChannelSendMock = jest
        .fn()
        .mockReturnValue(Promise.resolve());
      anyDiscordMessage = createMock<AnyDiscordMessage>({
        channel: {
          send: anyDiscordMessageChannelSendMock,
        },
        id: `dummy-id`,
      });
      discordMessageResponse = createMock<IDiscordMessageResponse>({
        options: {
          split: true,
        },
        response: `dummy-response`,
      });

      discordChannelServiceIsDmSpy = jest.spyOn(discordChannelService, `isDm`);
      discordChannelServiceIsTextSpy = jest.spyOn(
        discordChannelService,
        `isText`
      );
      loggerServiceDebugSpy = jest
        .spyOn(loggerService, `debug`)
        .mockImplementation();
      loggerServiceLogSpy = jest
        .spyOn(loggerService, `log`)
        .mockImplementation();
      discordMessageDmServiceGetMessageSpy = jest.spyOn(
        discordMessageDmService,
        `getMessage`
      );
      discordMessageErrorServiceHandleErrorSpy = jest.spyOn(
        discordMessageErrorService,
        `handleError`
      );
      discordChannelServiceIsValidSpy = jest.spyOn(
        discordChannelService,
        `isValid`
      );
    });

    describe(`when the given discord message is not DM message`, (): void => {
      beforeEach((): void => {
        discordChannelServiceIsDmSpy.mockReturnValue(false);
      });

      describe(`when the given discord message is not text message`, (): void => {
        beforeEach((): void => {
          discordChannelServiceIsTextSpy.mockReturnValue(false);
        });
      });

      describe(`when the given discord message is a text message`, (): void => {
        beforeEach((): void => {
          discordChannelServiceIsTextSpy.mockReturnValue(true);
        });
      });
    });

    describe(`when the given discord message is a DM message`, (): void => {
      beforeEach((): void => {
        discordChannelServiceIsDmSpy.mockReturnValue(true);
      });

      it(`should log about the DM message`, (): void => {
        expect.assertions(2);

        service.handleChannelMessage(anyDiscordMessage);

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
        expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
          context: `DiscordMessageService`,
          extendedContext: true,
          message: `context-[dummy-id] text-dm message`,
        } as ILoggerLog);
      });

      it(`should get a message response for the DM message`, (): void => {
        expect.assertions(2);

        service.handleChannelMessage(anyDiscordMessage);

        expect(discordMessageDmServiceGetMessageSpy).toHaveBeenCalledTimes(1);
        expect(discordMessageDmServiceGetMessageSpy).toHaveBeenCalledWith(
          anyDiscordMessage
        );
      });

      describe(`when the message response is null`, (): void => {
        beforeEach((): void => {
          discordMessageDmServiceGetMessageSpy.mockReturnValue(null);
        });

        it(`should do nothing`, (): void => {
          expect.assertions(4);

          service.handleChannelMessage(anyDiscordMessage);

          expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
          expect(discordChannelServiceIsValidSpy).not.toHaveBeenCalled();
          expect(loggerServiceLogSpy).not.toHaveBeenCalled();
          expect(
            discordMessageErrorServiceHandleErrorSpy
          ).not.toHaveBeenCalled();
        });
      });

      describe(`when the message response is valid`, (): void => {
        beforeEach((): void => {
          discordMessageDmServiceGetMessageSpy.mockReturnValue(
            discordMessageResponse
          );
        });

        describe(`when the given Discord message channel is not valid`, (): void => {
          beforeEach((): void => {
            discordChannelServiceIsValidSpy.mockReturnValue(false);
          });

          it(`should do nothing`, (): void => {
            expect.assertions(3);

            service.handleChannelMessage(anyDiscordMessage);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
            expect(loggerServiceLogSpy).not.toHaveBeenCalled();
            expect(
              discordMessageErrorServiceHandleErrorSpy
            ).not.toHaveBeenCalled();
          });
        });

        describe(`when the given Discord message channel is valid`, (): void => {
          beforeEach((): void => {
            discordChannelServiceIsValidSpy.mockReturnValue(true);
          });

          it(`should log about sending a message`, (): void => {
            expect.assertions(2);

            service.handleChannelMessage(anyDiscordMessage);

            expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
            expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(2, {
              context: `DiscordMessageService`,
              extendedContext: true,
              message: `context-[dummy-id] text-sending message...`,
            } as ILoggerLog);
          });

          it(`should send the message response to the given Discord message channel`, (): void => {
            expect.assertions(2);

            service.handleChannelMessage(anyDiscordMessage);

            expect(anyDiscordMessageChannelSendMock).toHaveBeenCalledTimes(1);
            expect(anyDiscordMessageChannelSendMock).toHaveBeenCalledWith(
              `dummy-response`,
              {
                split: true,
              } as MessageOptions
            );
          });

          describe(`when the message was successfully sent`, (): void => {
            beforeEach((): void => {
              anyDiscordMessageChannelSendMock.mockReturnValue(
                Promise.resolve()
              );

              anyDiscordMessage = createMock<AnyDiscordMessage>({
                channel: {
                  send: anyDiscordMessageChannelSendMock,
                },
                id: `dummy-id`,
              });
            });

            it(`should log about the success of the message sending`, async (): Promise<
              void
            > => {
              expect.assertions(2);

              await service.handleChannelMessage(anyDiscordMessage);

              expect(loggerServiceLogSpy).toHaveBeenCalledTimes(1);
              expect(loggerServiceLogSpy).toHaveBeenCalledWith({
                context: `DiscordMessageService`,
                extendedContext: true,
                message: `context-[dummy-id] text-message sent`,
              } as ILoggerLog);
            });
          });
        });
      });
    });
  });
});
