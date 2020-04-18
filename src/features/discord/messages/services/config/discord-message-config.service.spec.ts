import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandHelpConfig } from "../../../interfaces/discord-message-command-help-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core.service";
import { DiscordMessageConfigService } from "./discord-message-config.service";

jest.mock(`../../../../config/services/config.service`);

describe(`DiscordMessageConfigService`, (): void => {
  let service: DiscordMessageConfigService;
  let discordMessageConfigCoreService: DiscordMessageConfigCoreService;

  beforeEach((): void => {
    service = DiscordMessageConfigService.getInstance();
    discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
  });

  describe(`getConfig()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command = {
        cookie: {
          imageColor: 11,
          imageUrl: `dummy-image-url-cookie`,
        },
        error: {
          imageColor: 9,
          imageUrl: `dummy-image-url-error`,
        },
        help: {
          imageColor: 10,
          imageUrl: `dummy-image-url-help`,
        },
        prefix: `dummy-prefix`,
        version: {
          imageColor: 8,
          imageUrl: `dummy-image-url`,
        },
      };
      discordMessageConfigCoreService.error = {
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      };
    });

    it(`should return the Discord message config`, (): void => {
      expect.assertions(1);

      const result = service.getConfig();

      expect(result).toStrictEqual({
        command: {
          cookie: {
            imageColor: 11,
            imageUrl: `dummy-image-url-cookie`,
          },
          error: {
            imageColor: 9,
            imageUrl: `dummy-image-url-error`,
          },
          help: {
            imageColor: 10,
            imageUrl: `dummy-image-url-help`,
          },
          prefix: `dummy-prefix`,
          version: {
            imageColor: 8,
            imageUrl: `dummy-image-url`,
          },
        },
        error: {
          imageColor: 8,
          imageUrl: `dummy-image-url`,
        },
      } as IDiscordMessageConfig);
    });
  });

  describe(`getMessageCommand()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command = {
        cookie: {
          imageColor: 11,
          imageUrl: `dummy-image-url-cookie`,
        },
        error: {
          imageColor: 9,
          imageUrl: `dummy-image-url-error`,
        },
        help: {
          imageColor: 10,
          imageUrl: `dummy-image-url-help`,
        },
        prefix: `dummy-prefix`,
        version: {
          imageColor: 8,
          imageUrl: `dummy-image-url`,
        },
      };
    });

    it(`should return the Discord message config command`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommand();

      expect(result).toStrictEqual({
        cookie: {
          imageColor: 11,
          imageUrl: `dummy-image-url-cookie`,
        },
        error: {
          imageColor: 9,
          imageUrl: `dummy-image-url-error`,
        },
        help: {
          imageColor: 10,
          imageUrl: `dummy-image-url-help`,
        },
        prefix: `dummy-prefix`,
        version: {
          imageColor: 8,
          imageUrl: `dummy-image-url`,
        },
      } as IDiscordMessageCommandConfig);
    });
  });

  describe(`getMessageCommandCookie()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.cookie = {
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      };
    });

    it(`should return the Discord message config command cookie`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandCookie();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      } as IDiscordMessageCommandCookieConfig);
    });
  });

  describe(`getMessageCommandCookieImageColor()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.cookie.imageColor = 8;
    });

    it(`should return the Discord message config command cookie image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandCookieImageColor();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getMessageCommandCookieImageUrl()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.cookie.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config command cookie image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandCookieImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`getMessageCommandError()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.error = {
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      };
    });

    it(`should return the Discord message config command error`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandError();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      } as IDiscordMessageCommandErrorConfig);
    });
  });

  describe(`getMessageCommandErrorImageColor()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.error.imageColor = 8;
    });

    it(`should return the Discord message config command error image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandErrorImageColor();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getMessageCommandErrorImageUrl()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.error.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config command error image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandErrorImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`getMessageCommandHelp()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.help = {
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      };
    });

    it(`should return the Discord message config command help`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandHelp();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      } as IDiscordMessageCommandHelpConfig);
    });
  });

  describe(`getMessageCommandHelpImageColor()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.help.imageColor = 8;
    });

    it(`should return the Discord message config command help image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandHelpImageColor();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getMessageCommandHelpImageUrl()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.help.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config command help image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandHelpImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`getMessageCommandPrefix()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.prefix = `dummy-prefix`;
    });

    it(`should return the Discord message config command prefix`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandPrefix();

      expect(result).toStrictEqual(`dummy-prefix`);
    });
  });

  describe(`getMessageCommandVersion()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.version = {
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      };
    });

    it(`should return the Discord message config command version`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandVersion();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      } as IDiscordMessageCommandVersionConfig);
    });
  });

  describe(`getMessageCommandVersionImageColor()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.version.imageColor = 8;
    });

    it(`should return the Discord message config command version image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandVersionImageColor();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getMessageCommandVersionImageUrl()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.command.version.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config command version image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageCommandVersionImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
    });
  });

  describe(`getMessageError()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.error = {
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      };
    });

    it(`should return the Discord message config error`, (): void => {
      expect.assertions(1);

      const result = service.getMessageError();

      expect(result).toStrictEqual({
        imageColor: 8,
        imageUrl: `dummy-image-url`,
      } as IDiscordMessageErrorConfig);
    });
  });

  describe(`getMessageErrorImageColor()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.error.imageColor = 8;
    });

    it(`should return the Discord message config error image color`, (): void => {
      expect.assertions(1);

      const result = service.getMessageErrorImageColor();

      expect(result).toStrictEqual(8);
    });
  });

  describe(`getMessageErrorImageUrl()`, (): void => {
    beforeEach((): void => {
      discordMessageConfigCoreService.error.imageUrl = `dummy-image-url`;
    });

    it(`should return the Discord message config error image url`, (): void => {
      expect.assertions(1);

      const result = service.getMessageErrorImageUrl();

      expect(result).toStrictEqual(`dummy-image-url`);
    });
  });
});
