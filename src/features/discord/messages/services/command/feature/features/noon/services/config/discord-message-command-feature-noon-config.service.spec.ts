import { DiscordMessageCommandFeatureNoonConfigCoreService } from './discord-message-command-feature-noon-config-core.service';
import { DiscordMessageCommandFeatureNoonConfigService } from './discord-message-command-feature-noon-config.service';
import { ColorEnum } from '../../../../../../../../../../enums/color.enum';
import { IconEnum } from '../../../../../../../../../../enums/icon.enum';
import { ServiceNameEnum } from '../../../../../../../../../../enums/service-name.enum';
import { CoreEventService } from '../../../../../../../../../core/services/core-event.service';
import { IDiscordMessageCommandFeatureNoonConfig } from '../../interfaces/discord-message-command-feature-noon-config';

describe(`DiscordMessageCommandFeatureNoonConfigService`, (): void => {
  let service: DiscordMessageCommandFeatureNoonConfigService;
  let discordMessageCommandFeatureNoonConfigCoreService: DiscordMessageCommandFeatureNoonConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    discordMessageCommandFeatureNoonConfigCoreService = DiscordMessageCommandFeatureNoonConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    it(`should create a DiscordMessageCommandFeatureNoonConfig service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageCommandFeatureNoonConfigService.getInstance();

      expect(service).toStrictEqual(expect.any(DiscordMessageCommandFeatureNoonConfigService));
    });

    it(`should return the created DiscordMessageCommandFeatureNoonConfig service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageCommandFeatureNoonConfigService.getInstance();

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

    it(`should notify the DiscordMessageCommandFeatureNoonConfig service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageCommandFeatureNoonConfigService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledOnce();
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_COMMAND_FEATURE_NOON_CONFIG_SERVICE
      );
    });
  });

  describe(`getNoonConfig()`, (): void => {
    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigService.getInstance();
      discordMessageCommandFeatureNoonConfigCoreService.noon = {
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.ALARM,
      };
    });

    it(`should return the Discord message command feature noon config`, (): void => {
      expect.assertions(1);

      const result = service.getNoonConfig();

      expect(result).toStrictEqual({
        imageColor: ColorEnum.DESERT,
        imageUrl: IconEnum.ALARM,
      } as IDiscordMessageCommandFeatureNoonConfig);
    });
  });

  describe(`getNoonConfigImageColor()`, (): void => {
    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigService.getInstance();
      discordMessageCommandFeatureNoonConfigCoreService.noon.imageColor = ColorEnum.DESERT;
    });

    it(`should return the Discord message command feature noon config image color`, (): void => {
      expect.assertions(1);

      const result = service.getNoonConfigImageColor();

      expect(result).toStrictEqual(ColorEnum.DESERT);
    });
  });

  describe(`getNoonConfigImageUrl()`, (): void => {
    beforeEach((): void => {
      service = DiscordMessageCommandFeatureNoonConfigService.getInstance();
      discordMessageCommandFeatureNoonConfigCoreService.noon.imageUrl = IconEnum.ALARM;
    });

    it(`should return the Discord message command feature noon config image url`, (): void => {
      expect.assertions(1);

      const result = service.getNoonConfigImageUrl();

      expect(result).toStrictEqual(IconEnum.ALARM);
    });
  });
});
