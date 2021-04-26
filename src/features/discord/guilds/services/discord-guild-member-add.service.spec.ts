import { DiscordGuildMemberAddService } from './discord-guild-member-add.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordMessageRightsService } from '../../messages/services/rights/discord-message-rights.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { IAnyGuildMember } from '../types/any-guild-member';
import { Client } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordGuildMemberAddService`, (): void => {
  let service: DiscordGuildMemberAddService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;
  let discordMessageRightsService: DiscordMessageRightsService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
    discordMessageRightsService = DiscordMessageRightsService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuildMemberAdd service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildMemberAddService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildMemberAddService));
    });

    it(`should return the created DiscordGuildMemberAdd service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildMemberAddService.getInstance();

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

    it(`should notify the DiscordGuildMemberAdd service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildMemberAddService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_GUILD_MEMBER_ADD_SERVICE
      );
    });
  });

  describe(`init()`, (): void => {
    let client: Client;
    let discordClientServiceGetClientOnMock: jest.Mock;

    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let sendMessageSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildMemberAddService();
      discordClientServiceGetClientOnMock = jest.fn();
      client = createHydratedMock<Client>({
        on: discordClientServiceGetClientOnMock,
      });

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(client);
      sendMessageSpy = jest.spyOn(service, `sendMessage`).mockImplementation();
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should listen for the Discord client guildMemberAdd event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientOnMock).toHaveBeenCalledWith(`guildMemberAdd`, expect.any(Function));
    });

    describe(`when the Discord client guildMemberAdd event is triggered`, (): void => {
      beforeEach((): void => {
        discordClientServiceGetClientOnMock = jest.fn((_event: string, listener: () => void): void => {
          listener();
        });
        client = createHydratedMock<Client>({
          on: discordClientServiceGetClientOnMock,
        });

        discordClientServiceGetClientSpy.mockReturnValue(client);
      });

      it(`should log about the received Discord client guildMemberAdd event`, (): void => {
        expect.assertions(2);

        service.init();

        expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(2);
        expect(loggerServiceDebugSpy).toHaveBeenNthCalledWith(1, {
          context: `DiscordGuildMemberAddService`,
          message: `text-"guildMemberAdd" event triggered`,
        } as ILoggerLog);
      });

      it(`should send a message`, (): void => {
        expect.assertions(2);

        service.init();

        expect(sendMessageSpy).toHaveBeenCalledTimes(1);
        expect(sendMessageSpy).toHaveBeenCalledWith(undefined);
      });
    });

    it(`should log about listening Discord guildMemberAdd event`, (): void => {
      expect.assertions(2);

      service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordGuildMemberAddService`,
        message: `text-listen "guildMemberAdd" event`,
      } as ILoggerLog);
    });
  });

  describe(`sendMessage()`, (): void => {
    let member: IAnyGuildMember;

    let discordMessageRightsServiceIsSoniaAuthorizedForThisGuildSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildMemberAddService();
      member = createHydratedMock<IAnyGuildMember>({
        guild: {
          id: `dummy-guild-id`,
        },
      });

      discordMessageRightsServiceIsSoniaAuthorizedForThisGuildSpy = jest
        .spyOn(discordMessageRightsService, `isSoniaAuthorizedForThisGuild`)
        .mockImplementation();
    });

    it(`should check if Sonia is authorized to send a message on the member's guild`, (): void => {
      expect.assertions(2);

      service.sendMessage(member);

      expect(discordMessageRightsServiceIsSoniaAuthorizedForThisGuildSpy).toHaveBeenCalledTimes(1);
      expect(discordMessageRightsServiceIsSoniaAuthorizedForThisGuildSpy).toHaveBeenCalledWith(member.guild);
    });

    // @todo add more coverage but only once there is a feature to configure on which channel we should send a message
  });
});
