import { DiscordMessageCommandFeatureReleaseNotesConfigCoreService } from './discord-message-command-feature-release-notes-config-core.service';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../../../core/services/core-event.service';

describe(`DiscordMessageCommandFeatureReleaseNotesConfigCoreService`, (): void => {
  let service: DiscordMessageCommandFeatureReleaseNotesConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureReleaseNotesConfigCore service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureReleaseNotesConfigCoreService));
    });

    it(`should return the created DiscordMessageCommandFeatureReleaseNotesConfigCore service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureReleaseNotesConfigCore service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureReleaseNotesConfigCoreService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_RELEASE_NOTES_CONFIG_CORE_SERVICE
      );
    });
  });

  it(`should have a specific color for the image of the feature release notes command`, (): void => {
    expect.assertions(1);

    service = DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();

    expect(service.releaseNotes.imageColor).toBe(15718590);
  });

  it(`should have a specific url for the image of the feature release notes command`, (): void => {
    expect.assertions(1);

    service = DiscordMessageCommandFeatureReleaseNotesConfigCoreService.getInstance();

    expect(service.releaseNotes.imageUrl).toStrictEqual(`https://i.ibb.co/9p3Q17S/icons8-new-product-512.png`);
  });
});
