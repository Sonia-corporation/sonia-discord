import { ConfigService } from '../../../config/services/config-service';
import { DISCORD_MESSAGE_CONFIG } from '../constants/discord-message-config';
import { DiscordMessageConfigService } from './discord-message-config-service';

jest.mock(`../../../config/services/config-service`);

describe(`DiscordMessageConfigService`, (): void => {
  let service: DiscordMessageConfigService;
  let configService: ConfigService;

  beforeEach((): void => {
    service = DiscordMessageConfigService.getInstance();
    configService = ConfigService.getInstance();
  });

  describe(`updateMessageCommandVersionImageColor()`, (): void => {
    let imageColor: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = 8;
      DISCORD_MESSAGE_CONFIG.command.version.imageColor = 10;

      configServiceGetUpdatedNumberSpy = jest.spyOn(configService, `getUpdatedNumber`).mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigService`,
        newValue: 8,
        oldValue: 10,
        valueName: `message command version image color`
      });
    });

    it(`should update the Discord message config command version image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(DISCORD_MESSAGE_CONFIG.command.version.imageColor).toStrictEqual(8);
    });
  });
});
