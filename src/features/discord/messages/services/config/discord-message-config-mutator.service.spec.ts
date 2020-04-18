import { ColorEnum } from "../../../../../enums/color.enum";
import { IconEnum } from "../../../../../enums/icon.enum";
import { PartialNested } from "../../../../../types/partial-nested";
import { IConfigUpdateNumber } from "../../../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { ConfigService } from "../../../../config/services/config.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandHelpConfig } from "../../../interfaces/discord-message-command-help-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core.service";
import { DiscordMessageConfigMutatorService } from "./discord-message-config-mutator.service";

jest.mock(`../../../../config/services/config.service`);

describe(`DiscordMessageConfigMutatorService`, (): void => {
  let service: DiscordMessageConfigMutatorService;
  let configService: ConfigService;
  let discordMessageConfigCoreService: DiscordMessageConfigCoreService;

  beforeEach((): void => {
    service = DiscordMessageConfigMutatorService.getInstance();
    configService = ConfigService.getInstance();
    discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command = {
        cookie: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        error: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        help: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        prefix: `dummy-prefix`,
        version: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
      };
      discordMessageConfigCoreService.error = {
        imageColor: ColorEnum.SKY,
        imageUrl: IconEnum.COOKIES,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(discordMessageConfigCoreService.command).toStrictEqual({
          cookie: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
          error: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
          help: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
          prefix: `dummy-prefix`,
          version: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
        } as IDiscordMessageCommandConfig);
        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        } as IDiscordMessageErrorConfig);
      });
    });

    describe(`when the given config contains a message command`, (): void => {
      beforeEach((): void => {
        config = {
          message: {
            command: {
              cookie: {
                imageColor: ColorEnum.MINT,
                imageUrl: IconEnum.ERROR,
              },
              error: {
                imageColor: ColorEnum.MINT,
                imageUrl: IconEnum.ERROR,
              },
              help: {
                imageColor: ColorEnum.MINT,
                imageUrl: IconEnum.ERROR,
              },
              prefix: `prefix`,
              version: {
                imageColor: ColorEnum.MINT,
                imageUrl: IconEnum.ERROR,
              },
            },
          },
        };
      });

      it(`should update the config command`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordMessageConfigCoreService.command).toStrictEqual({
          cookie: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
          error: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
          help: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
          prefix: `prefix`,
          version: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
        } as IDiscordMessageCommandConfig);
      });
    });

    describe(`when the given config contains a message error`, (): void => {
      beforeEach((): void => {
        config = {
          message: {
            error: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.ERROR,
            },
          },
        };
      });

      it(`should update the config error`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.ERROR,
        } as IDiscordMessageErrorConfig);
      });
    });
  });

  describe(`updateMessage()`, (): void => {
    let config: PartialNested<IDiscordMessageConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command = {
        cookie: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
        error: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
        help: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
        prefix: `dummy-prefix`,
        version: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
      };
      discordMessageConfigCoreService.error = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(2);

        service.updateMessage(config);

        expect(discordMessageConfigCoreService.command).toStrictEqual({
          cookie: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
          error: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
          help: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
          prefix: `dummy-prefix`,
          version: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
        } as IDiscordMessageCommandConfig);
        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as IDiscordMessageErrorConfig);
      });
    });

    describe(`when the given config contains a command`, (): void => {
      beforeEach((): void => {
        config = {
          command: {
            cookie: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.GIRL,
            },
            error: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.GIRL,
            },
            help: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.GIRL,
            },
            prefix: `prefix`,
            version: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.GIRL,
            },
          },
        };
      });

      it(`should update the config command`, (): void => {
        expect.assertions(1);

        service.updateMessage(config);

        expect(discordMessageConfigCoreService.command).toStrictEqual({
          cookie: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
          error: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
          help: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
          prefix: `prefix`,
          version: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
        } as IDiscordMessageCommandConfig);
      });
    });

    describe(`when the given config contains a error`, (): void => {
      beforeEach((): void => {
        config = {
          error: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
        };
      });

      it(`should update the config error`, (): void => {
        expect.assertions(1);

        service.updateMessage(config);

        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageErrorConfig);
      });
    });
  });

  describe(`updateMessageCommand()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command = {
        cookie: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        },
        error: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        },
        help: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        },
        prefix: `dummy-prefix`,
        version: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        },
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command).toStrictEqual({
          cookie: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.INFORMATION,
          },
          error: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.INFORMATION,
          },
          help: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.INFORMATION,
          },
          prefix: `dummy-prefix`,
          version: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.INFORMATION,
          },
        } as IDiscordMessageCommandConfig);
      });
    });

    describe(`when the given config contains an cookie`, (): void => {
      beforeEach((): void => {
        config = {
          cookie: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.INFORMATION,
          },
        };
      });

      it(`should update the config command cookie`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command.cookie).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandCookieConfig);
      });
    });

    describe(`when the given config contains an error`, (): void => {
      beforeEach((): void => {
        config = {
          error: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.INFORMATION,
          },
        };
      });

      it(`should update the config command error`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command.error).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandErrorConfig);
      });
    });

    describe(`when the given config contains an help`, (): void => {
      beforeEach((): void => {
        config = {
          help: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.INFORMATION,
          },
        };
      });

      it(`should update the config command help`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command.help).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandHelpConfig);
      });
    });

    describe(`when the given config contains a prefix`, (): void => {
      beforeEach((): void => {
        config = {
          prefix: `prefix`,
        };
      });

      it(`should update the config command prefix`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command.prefix).toStrictEqual(
          `prefix`
        );
      });
    });

    describe(`when the given config contains a version`, (): void => {
      beforeEach((): void => {
        config = {
          version: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.INFORMATION,
          },
        };
      });

      it(`should update the config command version`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command.version).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandVersionConfig);
      });
    });
  });

  describe(`updateMessageCommandCookie()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandCookieConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command.cookie = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.INFORMATION,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandCookie(config);

        expect(discordMessageConfigCoreService.command.cookie).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandCookieConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config command cookie image color`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandCookie(config);

        expect(
          discordMessageConfigCoreService.command.cookie.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config command cookie image url`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandCookie(config);

        expect(
          discordMessageConfigCoreService.command.cookie.imageUrl
        ).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageCommandCookieImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.command.cookie.imageColor =
        ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandCookieImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command cookie image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command cookie image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandCookieImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.cookie.imageColor
      ).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateMessageCommandCookieImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.command.cookie.imageUrl =
        IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandCookieImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command cookie image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command cookie image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandCookieImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.cookie.imageUrl
      ).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`updateMessageCommandError()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandErrorConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command.error = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.GIRL,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandError(config);

        expect(discordMessageConfigCoreService.command.error).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageCommandErrorConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config command error image color`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandError(config);

        expect(
          discordMessageConfigCoreService.command.error.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config command error image url`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandError(config);

        expect(
          discordMessageConfigCoreService.command.error.imageUrl
        ).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageCommandErrorImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.command.error.imageColor =
        ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandErrorImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command error image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command error image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandErrorImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.error.imageColor
      ).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateMessageCommandErrorImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.command.error.imageUrl =
        IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandErrorImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command error image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command error image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandErrorImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.error.imageUrl
      ).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`updateMessageCommandHelp()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandHelpConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command.help = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.GIRL,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandHelp(config);

        expect(discordMessageConfigCoreService.command.help).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageCommandHelpConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config command help image color`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandHelp(config);

        expect(
          discordMessageConfigCoreService.command.help.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config command help image url`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandHelp(config);

        expect(
          discordMessageConfigCoreService.command.help.imageUrl
        ).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageCommandHelpImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.command.help.imageColor = ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandHelpImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command help image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command help image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandHelpImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.help.imageColor
      ).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateMessageCommandHelpImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.command.help.imageUrl =
        IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandHelpImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command help image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command help image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandHelpImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.help.imageUrl
      ).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`updateMessageCommandVersion()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandErrorConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.command.version = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.GIRL,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandError(config);

        expect(discordMessageConfigCoreService.command.version).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageCommandVersionConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config command version image color`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandVersion(config);

        expect(
          discordMessageConfigCoreService.command.version.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config command version image url`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandVersion(config);

        expect(
          discordMessageConfigCoreService.command.version.imageUrl
        ).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageCommandVersionImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.command.version.imageColor =
        ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command version image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command version image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.version.imageColor
      ).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateMessageCommandVersionImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.command.version.imageUrl =
        IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command version image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command version image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandVersionImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.version.imageUrl
      ).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`updateMessageError()`, (): void => {
    let config: PartialNested<IDiscordMessageErrorConfig> | undefined;

    beforeEach((): void => {
      discordMessageConfigCoreService.error = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.GIRL,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(1);

        service.updateMessageError(config);

        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageErrorConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config error image color`, (): void => {
        expect.assertions(1);

        service.updateMessageError(config);

        expect(discordMessageConfigCoreService.error.imageColor).toStrictEqual(
          ColorEnum.MINT
        );
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config error image url`, (): void => {
        expect.assertions(1);

        service.updateMessageError(config);

        expect(discordMessageConfigCoreService.error.imageUrl).toStrictEqual(
          IconEnum.INFORMATION
        );
      });
    });
  });

  describe(`updateMessageErrorImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.error.imageColor = ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageErrorImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message error image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config error image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageColor(imageColor);

      expect(discordMessageConfigCoreService.error.imageColor).toStrictEqual(
        ColorEnum.SUN
      );
    });
  });

  describe(`updateMessageErrorImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.error.imageUrl = IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message error image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config error image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageErrorImageUrl(imageUrl);

      expect(discordMessageConfigCoreService.error.imageUrl).toStrictEqual(
        IconEnum.GIRL
      );
    });
  });
});
