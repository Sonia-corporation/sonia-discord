import { IConfigUpdateNumber } from '../../../config/interfaces/config-update-number';
import { IConfigUpdateString } from '../../../config/interfaces/config-update-string';
import { ConfigService } from '../../../config/services/config-service';
import { IDiscordMessageCommandConfig } from '../../interfaces/discord-message-command-config';
import { IDiscordMessageCommandVersionConfig } from '../../interfaces/discord-message-command-version-config';
import { IDiscordMessageConfig } from '../../interfaces/discord-message-config';
import { IDiscordMessageErrorConfig } from '../../interfaces/discord-message-error-config';
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

  describe(`getMessage()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.command = {
        prefix: `dummy-prefix`,
        version: {
          imageColor: 8,
          imageUrl: `dummy-image-url`
        }
      };
      DISCORD_MESSAGE_CONFIG.error = {
        imageColor: 8,
        imageUrl: `dummy-image-url`
      };
    });

    it(`should return the Discord message config`, (): void => {
      expect.assertions(1);

      const result = service.getMessage();

      expect(result).toStrictEqual({
        command: {
          prefix: `dummy-prefix`,
          version: {
            imageColor: 8,
            imageUrl: `dummy-image-url`
          }
        },
        error: {
          imageColor: 8,
          imageUrl: `dummy-image-url`
        }
      } as IDiscordMessageConfig);
    });
  });

  describe(`getMessageCommand()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.command = {
        prefix: `dummy-prefix`,
        version: {
          imageColor: 8,
          imageUrl: `dummy-image-url`
        }
      };
    });

    it(`should return the Discord message config command`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommand();

      expect(result).toStrictEqual({
        prefix: `dummy-prefix`,
        version: {
          imageColor: 8,
          imageUrl: `dummy-image-url`
        }
      } as IDiscordMessageCommandConfig);
    });
  });

  describe(`getMessageCommandPrefix()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.command.prefix = `dummy-prefix`;
    });

    it(`should return the Discord message config command prefix`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandPrefix();

      expect(result).toStrictEqual(`dummy-prefix`);
    });
  });

  describe(`getMessageCommandVersion()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.command.version = {
        imageColor: 8,
        imageUrl: `dummy-image-url`
      };
    });

    it(`should return the Discord message config command version`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandVersion();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`
      } as IDiscordMessageCommandVersionConfig);
    });
  });

  describe(`getMessageCommandVersionImageColor()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.command.version.imageColor = 8;
    });

    it(`should return the Discord message config command version image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandVersionImageColor();

      expect(result).toStrictEqual(8);
    });
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
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command version image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(DISCORD_MESSAGE_CONFIG.command.version.imageColor).toStrictEqual(8);
    });
  });

  describe(`getMessageCommandVersionImageUrl()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.command.version.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config command version image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandVersionImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
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
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command version image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(DISCORD_MESSAGE_CONFIG.command.version.imageUrl).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`getMessageError()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.error = {
        imageColor: 8,
        imageUrl: `dummy-image-url`
      };
    });

    it(`should return the Discord message config error`, (): void => {
      expect.assertions(1);

      const result = service.getMessageError();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`
      } as IDiscordMessageErrorConfig);
    });
  });

  describe(`getMessageCommandErrorImageColor()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.error.imageColor = 8;
    });

    it(`should return the Discord message config error image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandErrorImageColor();

      expect(result).toStrictEqual(8);
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
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config error image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageColor(imageColor);

      expect(DISCORD_MESSAGE_CONFIG.error.imageColor).toStrictEqual(8);
    });
  });

  describe(`getMessageCommandErrorImageUrl()`, (): void => {
    beforeEach((): void => {
      DISCORD_MESSAGE_CONFIG.error.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config error image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandErrorImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
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
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config error image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(DISCORD_MESSAGE_CONFIG.error.imageUrl).toStrictEqual(`dummy-image-url`);
    });
  });
});
