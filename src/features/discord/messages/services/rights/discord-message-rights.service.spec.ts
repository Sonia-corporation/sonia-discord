import { DiscordMessageRightsService } from './discord-message-rights.service';
import { ServiceNameEnum } from '../../../../../enums/service-name.enum';
import { AppConfigService } from '../../../../app/services/config/app-config.service';
import { CoreEventService } from '../../../../core/services/core-event.service';
import { DiscordSoniaConfigService } from '../../../users/services/config/discord-sonia-config.service';
import { Guild } from 'discord.js';
import { createHydratedMock } from 'ts-auto-mock';

describe(`DiscordMessageDmService`, (): void => {
  let service: DiscordMessageRightsService;
  let coreEventService: CoreEventService;
  let appConfigService: AppConfigService;
  let discordSoniaConfigService: DiscordSoniaConfigService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
    appConfigService = AppConfigService.getInstance();
    discordSoniaConfigService = DiscordSoniaConfigService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageRightsService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageRightsService));
    });

    it(`should return the created DiscordMessageDm service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageRightsService.getInstance();

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

    it(`should notify the DiscordMessageDm service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageRightsService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_RIGHTS_SERVICE
      );
    });
  });

  describe(`isSoniaAuthorizedForThisGuild()`, (): void => {
    let guild: Guild;

    let appConfigServiceIsProductionSpy: jest.SpyInstance;
    let discordSoniaConfigServiceIsGuildWhitelistedInDevSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = new DiscordMessageRightsService();
      guild = createHydratedMock<Guild>();

      appConfigServiceIsProductionSpy = jest.spyOn(appConfigService, `isProduction`).mockImplementation();
      discordSoniaConfigServiceIsGuildWhitelistedInDevSpy = jest
        .spyOn(discordSoniaConfigService, `isGuildWhitelistedInDev`)
        .mockImplementation();
    });

    describe(`when the app is in production`, (): void => {
      beforeEach((): void => {
        appConfigServiceIsProductionSpy.mockReturnValue(true);
      });

      it(`should return true`, (): void => {
        expect.assertions(1);

        const result = service.isSoniaAuthorizedForThisGuild(guild);

        expect(result).toStrictEqual(true);
      });
    });

    describe(`when the app is not in production`, (): void => {
      beforeEach((): void => {
        appConfigServiceIsProductionSpy.mockReturnValue(false);
      });

      describe(`when the given guild is whitelisted`, (): void => {
        beforeEach((): void => {
          discordSoniaConfigServiceIsGuildWhitelistedInDevSpy.mockReturnValue(true);
        });

        it(`should return true`, (): void => {
          expect.assertions(1);

          const result = service.isSoniaAuthorizedForThisGuild(guild);

          expect(result).toStrictEqual(true);
        });
      });

      describe(`when the given guild is not whitelisted`, (): void => {
        beforeEach((): void => {
          discordSoniaConfigServiceIsGuildWhitelistedInDevSpy.mockReturnValue(false);
        });

        it(`should return false`, (): void => {
          expect.assertions(1);

          const result = service.isSoniaAuthorizedForThisGuild(guild);

          expect(result).toStrictEqual(false);
        });
      });
    });
  });
});
