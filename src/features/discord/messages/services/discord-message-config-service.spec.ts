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

  describe(`updateMessageCommandVersionImageUrl()`, (): void => {
    let imageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = `dummy-image-url`;
      DISCORD_MESSAGE_CONFIG.command.version.imageUrl = `image-url`;

      configServiceGetUpdatedStringSpy = jest.spyOn(configService, `getUpdatedString`).mockReturnValue(`dummy-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigService`,
        newValue: `dummy-image-url`,
        oldValue: `image-url`,
        valueName: `message command version image url`
      });
    });

    it(`should update the Discord message config command version image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(DISCORD_MESSAGE_CONFIG.command.version.imageUrl).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`updateMessageErrorImageColor()`, (): void => {
    let imageColor: number;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = 8;
      DISCORD_MESSAGE_CONFIG.error.imageColor = 10;

      configServiceGetUpdatedNumberSpy = jest.spyOn(configService, `getUpdatedNumber`).mockReturnValue(8);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageErrorImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigService`,
        newValue: 8,
        oldValue: 10,
        valueName: `message error image color`
      });
    });

    it(`should update the Discord message config error image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageColor(imageColor);

      expect(DISCORD_MESSAGE_CONFIG.error.imageColor).toStrictEqual(8);
    });
  });

  describe(`updateMessageErrorImageUrl()`, (): void => {
    let imageUrl: string;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = `dummy-image-url`;
      DISCORD_MESSAGE_CONFIG.error.imageUrl = `image-url`;

      configServiceGetUpdatedStringSpy = jest.spyOn(configService, `getUpdatedString`).mockReturnValue(`dummy-image-url`);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigService`,
        newValue: `dummy-image-url`,
        oldValue: `image-url`,
        valueName: `message error image url`
      });
    });

    it(`should update the Discord message config error image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(DISCORD_MESSAGE_CONFIG.error.imageUrl).toStrictEqual(`dummy-image-url`);
    });
  });
});
