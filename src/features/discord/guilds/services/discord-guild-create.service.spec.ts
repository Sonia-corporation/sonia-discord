import { Guild, Client } from "discord.js";
import { createMock } from "ts-auto-mock";
import { ServiceNameEnum } from "../../../../enums/service-name.enum";
import { CoreEventService } from "../../../core/services/core-event.service";
import { DiscordClientService } from "../../services/discord-client.service";
import { DiscordGuildConfigCoreService } from "./config/discord-guild-config-core.service";
import { DiscordGuildCreateService } from "./discord-guild-create.service";

jest.mock(`../../services/discord-client.service`);

describe(`DiscordGuildCreateService`, (): void => {
  let service: DiscordGuildCreateService;
  let discordGuildConfigCoreService: DiscordGuildConfigCoreService;
  let coreEventService: CoreEventService;
  let discordClientService: DiscordClientService;

  beforeEach((): void => {
    discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
    discordClientService = DiscordClientService.getInstance();
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
    let guild: Guild;
    let client: Client;

    let discordClientOnSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordGuildCreateService.getInstance();
      guild = createMock<Guild>();
      client = createMock<Client>();

      jest.spyOn(discordClientService, `getClient`).mockReturnValue(client);
      discordClientOnSpy = jest.spyOn(client, `on`).mockImplementation();
    });

    it(`should listen the "guildCreate" event on the client`, (): void => {
      expect.assertions(2);

      service.init();

      expect(discordClientOnSpy).toHaveBeenCalledTimes(1);
      expect(discordClientOnSpy).toHaveBeenCalledWith(
        `guildCreate`,
        expect.any(Function)
      );
    });

    describe(`when the "guildCreate" event is received`, (): void => {
      beforeEach((): void => {
        discordClientOnSpy.mockImplementation(
          (_event: string, listener: (guild: Guild) => void): void => {
            listener(guild);
          }
        );
      });

      describe(`when the Discord guild config send cookies on create state is false`, (): void => {
        beforeEach((): void => {
          discordGuildConfigCoreService.shouldSendCookiesOnCreate = false;
        });

        // @todo continue the coverage
        // @todo this is a bit complex because we have to go deep down on Discord objects
        // @todo to create the mock required for this whole service
        it.skip(`should listen the "guildCreate" event on the client`, (): void => {
          expect.assertions(1);

          service.init();

          expect(true).toStrictEqual(true);
        });
      });
    });
  });
});
