import { DiscordUserService } from './discord-user.service';
import { ServiceNameEnum } from '../../../../enums/service-name.enum';
import { CoreEventService } from '../../../core/services/core-event.service';
import { ILoggerLog } from '../../../logger/interfaces/logger-log';
import { LoggerService } from '../../../logger/services/logger.service';
import { DiscordClientService } from '../../services/discord-client.service';
import { Client, Snowflake, User } from 'discord.js';
import { createMock } from 'ts-auto-mock';

jest.mock(`../../../logger/services/chalk/chalk.service`);

describe(`DiscordUserService`, (): void => {
  let service: DiscordUserService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;
  let loggerService: LoggerService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
    loggerService = LoggerService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordUser service`, (): void => {
      expect.assertions(1);

      service = DiscordUserService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordUserService));
    });

    it(`should return the created DiscordUser service`, (): void => {
      expect.assertions(1);

      const result = DiscordUserService.getInstance();

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

    it(`should notify the DiscordUser service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordUserService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(ServiceNameEnum.DISCORD_USER_SERVICE);
    });
  });

  describe(`init()`, (): void => {
    let loggerServiceDebugSpy: jest.SpyInstance;
    let discordClientServiceIsReadySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordUserService();

      loggerServiceDebugSpy = jest.spyOn(loggerService, `debug`).mockImplementation();
      discordClientServiceIsReadySpy = jest.spyOn(discordClientService, `isReady`).mockResolvedValue(true);
    });

    it(`should log about listening the Discord client ready state`, async (): Promise<void> => {
      expect.assertions(2);

      await service.init();

      expect(loggerServiceDebugSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceDebugSpy).toHaveBeenCalledWith({
        context: `DiscordUserService`,
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

  describe(`getUsers()`, (): void => {
    let users: User[];

    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let toJSONMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordUserService();
      users = [createMock<User>(), createMock<User>()];

      toJSONMock = jest.fn().mockReturnValue(users);
      // TODO remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
        createMock<Client>({
          users: {
            cache: {
              toJSON: toJSONMock,
            } as unknown as undefined,
          },
        })
      );
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.getUsers();

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should return the list of users`, (): void => {
      expect.assertions(3);

      const result = service.getUsers();

      expect(toJSONMock).toHaveBeenCalledTimes(1);
      expect(toJSONMock).toHaveBeenCalledWith();
      expect(result).toStrictEqual(users);
    });
  });

  describe(`getUserById()`, (): void => {
    let user: User;
    let guildId: Snowflake;

    let discordClientServiceGetClientSpy: jest.SpyInstance;
    let findMock: jest.Mock;

    beforeEach((): void => {
      service = new DiscordUserService();
      user = createMock<User>();

      findMock = jest.fn().mockImplementation((fn: (value: User) => boolean): User => {
        fn(user);

        return user;
      });
      // TODO remove casting once https://github.com/Typescript-TDD/ts-auto-mock/issues/464 is fixed
      discordClientServiceGetClientSpy = jest.spyOn(discordClientService, `getClient`).mockReturnValue(
        createMock<Client>({
          users: {
            cache: {
              find: findMock,
            } as unknown as undefined,
          },
        })
      );
    });

    it(`should get the Discord client`, (): void => {
      expect.assertions(2);

      service.getUserById(guildId);

      expect(discordClientServiceGetClientSpy).toHaveBeenCalledTimes(1);
      expect(discordClientServiceGetClientSpy).toHaveBeenCalledWith();
    });

    it(`should return the user matching the given user ID`, (): void => {
      expect.assertions(2);

      const result = service.getUserById(guildId);

      expect(findMock).toHaveBeenCalledTimes(1);
      expect(result).toStrictEqual(user);
    });
  });
});
