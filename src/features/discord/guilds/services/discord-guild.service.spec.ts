import { DiscordGuildService } from './discord-guild.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { Client, Guild, Snowflake } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordGuildService`, (): void => {
  let service: DiscordGuildService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordGuild service`, (): void => {
      expect.assertions(1);

      service = DiscordGuildService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordGuildService));
    });

    it(`should return the created DiscordGuild service`, (): void => {
      expect.assertions(1);

      const result = DiscordGuildService.getInstance();

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

    it(`should notify the DiscordGuild service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordGuildService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_GUILD_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceIsReadySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordGuildService();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordClientServiceIsReadySpy = jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
    });

    it(`should log about listening the Discord client ready state`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordGuildService`,
        message: `text-listen "ready" Discord client state`,
      } as ILoggerLog);
    });

    it(`should check if the Discord client is ready`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(discordClientServiceIsReadySpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceIsReadySpy).toHaveBeenCalledWith();
    });

    describe(`when the check for the Discord client ready state failed`, (): void => {
      beforeEach((): void => {
        discordClientServiceIsReadySpy.mockRejectedValue(new Error(`error`));
      });

      it(`should throw an error`, async (): Promise<void> => {
        expect.assertions(1);

        await expect(service.init()).rejects.toThrow(new Error(`error`));
      });
    });
  });

  describe(`getGuilds()`, (): void => {
    let guilds: Guild[];

    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let arrayMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordGuildService();
      guilds = [createHydratedMock<Guild>(), createHydratedMock<Guild>()];

      arrayMock = jest.fn().mockReturnValue(guilds);
      // @todo remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
        createHydratedMock<Client>({
          guilds: {
            cache: ({
              array: arrayMock,
            } as unknown) as undefined,
          },
        })
      );
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.getGuilds();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should return the list of guilds`, (): void => {
      expect.assertions(3);

      const result = service.getGuilds();

      expect(arrayMock).toHaveBeenCalledTimes(1);
      expect(arrayMock).toHaveBeenCalledWith();
      expect(result).toStrictEqual(guilds);
    });
  });

  describe(`getGuildById()`, (): void => {
    let guild: Guild;
    let guildId: Snowflake;

    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let findMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordGuildService();
      guild = createHydratedMock<Guild>();

      findMock = jest.fn().mockImplementation(
        (fn: (value: Guild) => boolean): Guild => {
          fn(guild);

          return guild;
        }
      );
      // @todo remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
        createHydratedMock<Client>({
          guilds: {
            cache: ({
              find: findMock,
            } as unknown) as undefined,
          },
        })
      );
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.getGuildById(guildId);

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should return the guild matching the given guild id`, (): void => {
      expect.assertions(2);

      const result = service.getGuildById(guildId);

      expect(findMock).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(guild);
    });
  });
});
