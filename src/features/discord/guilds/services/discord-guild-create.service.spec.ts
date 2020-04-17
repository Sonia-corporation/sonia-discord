import { Guild } from "discord.js";
import { createMock } from "ts-auto-mock";
import { DiscordGuildConfigCoreService } from "./config/discord-guild-config-core.service";
import { DiscordGuildCreateService } from "./discord-guild-create.service";

jest.mock(`../../services/discord-client.service`);

describe(`DiscordGuildCreateService`, (): void => {
  let service: DiscordGuildCreateService;
  let discordGuildConfigCoreService: DiscordGuildConfigCoreService;

  beforeEach((): void => {
    service = DiscordGuildCreateService.getInstance();
    discordGuildConfigCoreService = DiscordGuildConfigCoreService.getInstance();
  });

  describe(`init()`, (): void => {
    let guild: Guild;

    let discordClientOnSpy: jest.SpyInstance;

    beforeEach((): void => {
      guild = createMock<Guild>();

      discordClientOnSpy = jest
        .spyOn(service.discordClient, `on`)
        .mockImplementation();
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
