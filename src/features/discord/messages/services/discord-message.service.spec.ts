import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { ILoggerLog } from "../../../logger/interfaces/logger-log";
import { LoggerService } from "../../../logger/services/logger.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { AnyDiscordMessage } from "../types/any-discord-message";
import { DiscordMessageService } from "./discord-message.service";
import { Client } from "discord.js";

jest.mock(`../../../logger/services/chalk.service`);

describe(`DiscordMessageService`, (): void => {
  let service: DiscordMessageService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
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
});
