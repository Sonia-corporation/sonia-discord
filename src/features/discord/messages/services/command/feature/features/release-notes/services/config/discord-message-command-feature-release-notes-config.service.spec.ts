import { DiscordMessageCommandFeatureReleaseNotesConfigCoreService } from './discord-message-command-feature-release-notes-config-core.service';
import { DiscordMessageCommandFeatureReleaseNotesConfigService } from './discord-message-command-feature-release-notes-config.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../../../core/services/core-event.service';
import { IDiscordMessageCommandFeatureReleaseNotesConfig } from '../../interfaces/discord-message-command-feature-release-notes-config';

describe(`DiscordMessageCommandFeatureReleaseNotesConfigService`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesConfigService;
  let discordMessageCommandFeatureReleaseNotesConfigCoreService: DiscordMessageCommandFeatureReleaseNotesConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    discordMessageCommandFeatureReleaseNotesConfigCoreService = DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureReleaseNotesConfig service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureReleaseNotesConfigService));
    });

    it(`should return the created DiscordMessageCommandFeatureReleaseNotesConfig service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureReleaseNotesConfig service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureReleaseNotesConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_SERVICE
      );
    });
  });

  describe(`getReleaseNotesConfig()`, (): void => {
    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes = {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      };
    });

    it(`should return the Discord message command feature release notes config`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseNotesConfig();

      expect(result).toStrictEqual({
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.NEW_PRODUCT,
      } as IDiscordMessageCommandFeatureReleaseNotesConfig);
    });
  });

  describe(`getReleaseNotesConfigImageColor()`, (): void => {
    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageColor = ColorEnum.DESERT;
    });

    it(`should return the Discord message command feature release notes config image color`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseNotesConfigImageColor();

      expect(result).toStrictEqual(ColorEnum.DESERT);
    });
  });

  describe(`getReleaseNotesConfigImageUrl()`, (): void => {
    beforeEach((): void => {
      service = DiscordMessageCommandFeatureReleaseNotesConfigService.getInstance();
      discordMessageCommandFeatureReleaseNotesConfigCoreService.releaseNotes.imageUrl = IconEnum.NEW_PRODUCT;
    });

    it(`should return the Discord message command feature release notes config image url`, (): void => {
      expect.assertions(1);

      const result = service.getReleaseNotesConfigImageUrl();

      expect(result).toStrictEqual(IconEnum.NEW_PRODUCT);
    });
  });
});
