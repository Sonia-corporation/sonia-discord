import { ColorEnum } from "../../../../../enums/color.enum";
import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { PartialNested } from "../../../../../types/partial-nested";
import { IConfigUpdateNumber } from "../../../../config/interfaces/config-update-number";
import { IConfigUpdateString } from "../../../../config/interfaces/config-update-string";
import { IConfigUpdateStringOrArray } from "../../../../config/interfaces/config-update-string-or-array";
import { ConfigService } from "../../../../config/services/config.service";
import { CoreEventService } from "../../../../core/services/core-event.service";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandHelpConfig } from "../../../interfaces/discord-message-command-help-config";
import { IDiscordMessageCommandLunchConfig } from "../../../interfaces/discord-message-command-lunch-config";
import { IDiscordMessageCommandReleaseNotesConfig } from "../../../interfaces/discord-message-command-release-notes-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { IDiscordMessageWarningConfig } from "../../../interfaces/discord-message-warning-config";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core.service";
import { DiscordMessageConfigMutatorService } from "./discord-message-config-mutator.service";
import { DiscordMessageConfigService } from "./discord-message-config.service";

jest.mock(`../../../../time/services/time.service`);
jest.mock(`../../../../logger/services/chalk/chalk.service`);

describe(`DiscordMessageConfigMutatorService`, (): void => {
  let service: DiscordMessageConfigMutatorService;
  let configService: ConfigService;
  let discordMessageConfigCoreService: DiscordMessageConfigCoreService;
  let coreEventService: CoreEventService;

  beforeEach((): void => {
    configService = ConfigService.getInstance();
    discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
    coreEventService = CoreEventService.getInstance();
  });

  describe(`getInstance()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    beforeEach((): void => {
      config = {
        message: {
          command: {
            cookie: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
            error: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
            help: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
            lunch: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
            prefix: `dummy-prefix`,
            releaseNotes: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
            version: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
          },
          error: {
            imageColor: ColorEnum.CANDY,
            imageUrl: IconEnum.GIRL,
          },
          warning: {
            imageColor: ColorEnum.CANDY,
            imageUrl: IconEnum.GIRL,
          },
        },
      };
    });

    it(`should create a DiscordMessageConfigMutator service`, (): void => {
      expect.assertions(1);

      service = DiscordMessageConfigMutatorService.getInstance(config);

      expect(service).toStrictEqual(
        expect.any(DiscordMessageConfigMutatorService)
      );
    });

    it(`should return the created DiscordMessageConfigMutator service`, (): void => {
      expect.assertions(1);

      const result = DiscordMessageConfigMutatorService.getInstance();

      expect(result).toStrictEqual(service);
    });
  });

  describe(`constructor()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    let coreEventServiceNotifyServiceCreatedSpy: jest.SpyInstance;

    beforeEach((): void => {
      coreEventServiceNotifyServiceCreatedSpy = jest
        .spyOn(coreEventService, `notifyServiceCreated`)
        .mockImplementation();
    });

    it(`should notify the DiscordMessageConfigMutator service creation`, (): void => {
      expect.assertions(2);

      service = new DiscordMessageConfigMutatorService();

      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledTimes(1);
      expect(coreEventServiceNotifyServiceCreatedSpy).toHaveBeenCalledWith(
        ServiceNameEnum.DISCORD_MESSAGE_CONFIG_MUTATOR_SERVICE
      );
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the current command cookie image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.cookie.imageColor =
          ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.cookie.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current command cookie image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.cookie.imageUrl = IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.cookie.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should not update the current command error image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.error.imageColor =
          ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.error.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current command error image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.error.imageUrl = IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.error.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should not update the current command help image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.help.imageColor =
          ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.help.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current command help image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.help.imageUrl = IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.help.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should not update the current command lunch image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.lunch.imageColor =
          ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.lunch.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current command lunch image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.lunch.imageUrl = IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.lunch.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should not update the current command prefix`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.prefix = `prefix`;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.command.prefix).toStrictEqual(
          `prefix`
        );
      });

      it(`should not update the current command release notes image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.releaseNotes.imageColor =
          ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current command release notes image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.releaseNotes.imageUrl =
          IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should not update the current command version image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.version.imageColor =
          ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.version.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current command version image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.version.imageUrl =
          IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.version.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should not update the current error image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.error.imageColor = ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.error.imageColor).toStrictEqual(
          ColorEnum.CANDY
        );
      });

      it(`should not update the current error image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.error.imageUrl = IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.error.imageUrl).toStrictEqual(
          IconEnum.GIRL
        );
      });

      it(`should not update the current warning image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.warning.imageColor = ColorEnum.CANDY;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.warning.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should not update the current warning image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.warning.imageUrl = IconEnum.GIRL;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.warning.imageUrl).toStrictEqual(
          IconEnum.GIRL
        );
      });
    });

    describe(`when the given config is a complete object`, (): void => {
      beforeEach((): void => {
        config = {
          message: {
            command: {
              cookie: {
                imageColor: ColorEnum.CANDY,
                imageUrl: IconEnum.GIRL,
              },
              error: {
                imageColor: ColorEnum.CANDY,
                imageUrl: IconEnum.GIRL,
              },
              help: {
                imageColor: ColorEnum.CANDY,
                imageUrl: IconEnum.GIRL,
              },
              lunch: {
                imageColor: ColorEnum.CANDY,
                imageUrl: IconEnum.GIRL,
              },
              prefix: `dummy-prefix`,
              releaseNotes: {
                imageColor: ColorEnum.CANDY,
                imageUrl: IconEnum.GIRL,
              },
              version: {
                imageColor: ColorEnum.CANDY,
                imageUrl: IconEnum.GIRL,
              },
            },
            error: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
            warning: {
              imageColor: ColorEnum.CANDY,
              imageUrl: IconEnum.GIRL,
            },
          },
        };
      });

      it(`should override the command cookie image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.cookie.imageColor =
          ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.cookie.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the command cookie image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.cookie.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.cookie.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should override the command error image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.error.imageColor =
          ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.error.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the command error image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.error.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.error.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should override the command help image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.help.imageColor =
          ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.help.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the command help image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.help.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.help.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should override the command lunch image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.lunch.imageColor =
          ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.lunch.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the command lunch image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.lunch.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.lunch.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should override the command prefix`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.prefix = `prefix`;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.command.prefix).toStrictEqual(
          `dummy-prefix`
        );
      });

      it(`should override the command release notes image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.releaseNotes.imageColor =
          ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the command release notes image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.releaseNotes.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should override the command version image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.version.imageColor =
          ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.version.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the command version image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.command.version.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.command.version.imageUrl
        ).toStrictEqual(IconEnum.GIRL);
      });

      it(`should override the error image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.error.imageColor = ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.error.imageColor).toStrictEqual(
          ColorEnum.CANDY
        );
      });

      it(`should override the error image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.error.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.error.imageUrl).toStrictEqual(
          IconEnum.GIRL
        );
      });

      it(`should override the warning image color`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.warning.imageColor = ColorEnum.MINT;

        service = new DiscordMessageConfigMutatorService(config);

        expect(
          discordMessageConfigCoreService.warning.imageColor
        ).toStrictEqual(ColorEnum.CANDY);
      });

      it(`should override the warning image url`, (): void => {
        expect.assertions(1);
        discordMessageConfigCoreService.warning.imageUrl =
          IconEnum.WARNING_SHIELD;

        service = new DiscordMessageConfigMutatorService(config);

        expect(discordMessageConfigCoreService.warning.imageUrl).toStrictEqual(
          IconEnum.GIRL
        );
      });
    });
  });

  describe(`preUpdateConfig()`, (): void => {
    let loggerServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageConfigCoreServiceGetInstanceSpy: jest.SpyInstance;
    let discordMessageConfigServiceGetInstanceSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();

      loggerServiceGetInstanceSpy = jest.spyOn(LoggerService, `getInstance`);
      discordMessageConfigCoreServiceGetInstanceSpy = jest.spyOn(
        DiscordMessageConfigCoreService,
        `getInstance`
      );
      discordMessageConfigServiceGetInstanceSpy = jest.spyOn(
        DiscordMessageConfigService,
        `getInstance`
      );
    });

    it(`should create the Logger service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledTimes(1);
      expect(loggerServiceGetInstanceSpy).toHaveBeenCalledWith();
    });

    it(`should create the DiscordMessageConfigCore service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(
        discordMessageConfigCoreServiceGetInstanceSpy
      ).toHaveBeenCalledTimes(1);
      expect(
        discordMessageConfigCoreServiceGetInstanceSpy
      ).toHaveBeenCalledWith();
    });

    it(`should create the DiscordMessageConfig service instance`, (): void => {
      expect.assertions(2);

      service.preUpdateConfig();

      expect(discordMessageConfigServiceGetInstanceSpy).toHaveBeenCalledTimes(
        1
      );
      expect(discordMessageConfigServiceGetInstanceSpy).toHaveBeenCalledWith();
    });
  });

  describe(`updateConfig()`, (): void => {
    let config: PartialNested<IDiscordConfig> | undefined;

    let loggerLogSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
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
        lunch: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        prefix: `dummy-prefix`,
        releaseNotes: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        version: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
      };
      discordMessageConfigCoreService.error = {
        imageColor: ColorEnum.SKY,
        imageUrl: IconEnum.COOKIES,
      };
      discordMessageConfigCoreService.warning = {
        imageColor: ColorEnum.SKY,
        imageUrl: IconEnum.COOKIES,
      };

      loggerLogSpy = jest.spyOn(console, `log`).mockImplementation();
    });

    it(`should not update the config`, (): void => {
      expect.assertions(3);

      service.updateConfig();

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
        lunch: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        prefix: `dummy-prefix`,
        releaseNotes: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
        version: {
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        },
      } as IDiscordMessageCommandConfig);
      expect(discordMessageConfigCoreService.error).toStrictEqual({
        imageColor: ColorEnum.SKY,
        imageUrl: IconEnum.COOKIES,
      } as IDiscordMessageErrorConfig);
      expect(discordMessageConfigCoreService.warning).toStrictEqual({
        imageColor: ColorEnum.SKY,
        imageUrl: IconEnum.COOKIES,
      } as IDiscordMessageWarningConfig);
    });

    it(`should not log about the config update`, (): void => {
      expect.assertions(1);

      service.updateConfig();

      expect(loggerLogSpy).not.toHaveBeenCalled();
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(3);

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
          lunch: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
          prefix: `dummy-prefix`,
          releaseNotes: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
          version: {
            imageColor: ColorEnum.SKY,
            imageUrl: IconEnum.COOKIES,
          },
        } as IDiscordMessageCommandConfig);
        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        } as IDiscordMessageErrorConfig);
        expect(discordMessageConfigCoreService.warning).toStrictEqual({
          imageColor: ColorEnum.SKY,
          imageUrl: IconEnum.COOKIES,
        } as IDiscordMessageWarningConfig);
      });

      it(`should not log about the config update`, (): void => {
        expect.assertions(1);

        service.updateConfig(config);

        expect(loggerLogSpy).not.toHaveBeenCalled();
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
              lunch: {
                imageColor: ColorEnum.MINT,
                imageUrl: IconEnum.ERROR,
              },
              prefix: `prefix`,
              releaseNotes: {
                imageColor: ColorEnum.MINT,
                imageUrl: IconEnum.ERROR,
              },
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
          lunch: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
          prefix: `prefix`,
          releaseNotes: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
          version: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.ERROR,
          },
        } as IDiscordMessageCommandConfig);
      });

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(14);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordMessageConfigMutatorService][now-format] text-configuration updated`
        );
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

      it(`should log about the config update`, (): void => {
        expect.assertions(2);

        service.updateConfig(config);

        expect(loggerLogSpy).toHaveBeenCalledTimes(3);
        expect(loggerLogSpy).toHaveBeenLastCalledWith(
          `debug-● context-[DiscordMessageConfigMutatorService][now-format] text-configuration updated`
        );
      });
    });
  });

  describe(`updateMessage()`, (): void => {
    let config: PartialNested<IDiscordMessageConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
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
        lunch: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
        prefix: `dummy-prefix`,
        releaseNotes: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
        version: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        },
      };
      discordMessageConfigCoreService.error = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
      };
      discordMessageConfigCoreService.warning = {
        imageColor: ColorEnum.SUN,
        imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
      };
    });

    describe(`when the given config is undefined`, (): void => {
      beforeEach((): void => {
        config = undefined;
      });

      it(`should not update the config`, (): void => {
        expect.assertions(3);

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
          lunch: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
          prefix: `dummy-prefix`,
          releaseNotes: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
          version: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
          },
        } as IDiscordMessageCommandConfig);
        expect(discordMessageConfigCoreService.error).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as IDiscordMessageErrorConfig);
        expect(discordMessageConfigCoreService.warning).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.ARTIFICIAL_INTELLIGENCE,
        } as IDiscordMessageWarningConfig);
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
            lunch: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.GIRL,
            },
            prefix: `prefix`,
            releaseNotes: {
              imageColor: ColorEnum.MINT,
              imageUrl: IconEnum.GIRL,
            },
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
          lunch: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
          prefix: `prefix`,
          releaseNotes: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
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

    describe(`when the given config contains a warning`, (): void => {
      beforeEach((): void => {
        config = {
          warning: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.GIRL,
          },
        };
      });

      it(`should update the config warning`, (): void => {
        expect.assertions(1);

        service.updateMessage(config);

        expect(discordMessageConfigCoreService.warning).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageWarningConfig);
      });
    });
  });

  describe(`updateMessageCommand()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
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
        lunch: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        },
        prefix: `dummy-prefix`,
        releaseNotes: {
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.INFORMATION,
        },
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
          lunch: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.INFORMATION,
          },
          prefix: `dummy-prefix`,
          releaseNotes: {
            imageColor: ColorEnum.SUN,
            imageUrl: IconEnum.INFORMATION,
          },
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

    describe(`when the given config contains an lunch`, (): void => {
      beforeEach((): void => {
        config = {
          lunch: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.INFORMATION,
          },
        };
      });

      it(`should update the config command lunch`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(discordMessageConfigCoreService.command.lunch).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandLunchConfig);
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

    describe(`when the given config contains a release notes`, (): void => {
      beforeEach((): void => {
        config = {
          releaseNotes: {
            imageColor: ColorEnum.MINT,
            imageUrl: IconEnum.INFORMATION,
          },
        };
      });

      it(`should update the config command release notes`, (): void => {
        expect.assertions(1);

        service.updateMessageCommand(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes
        ).toStrictEqual({
          imageColor: ColorEnum.MINT,
          imageUrl: IconEnum.INFORMATION,
        } as IDiscordMessageCommandReleaseNotesConfig);
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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

  describe(`updateMessageCommandLunch()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandLunchConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      discordMessageConfigCoreService.command.lunch = {
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

        service.updateMessageCommandLunch(config);

        expect(discordMessageConfigCoreService.command.lunch).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageCommandLunchConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config command lunch image color`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandLunch(config);

        expect(
          discordMessageConfigCoreService.command.lunch.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config command lunch image url`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandLunch(config);

        expect(
          discordMessageConfigCoreService.command.lunch.imageUrl
        ).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageCommandLunchImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.command.lunch.imageColor =
        ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandLunchImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command lunch image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command lunch image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandLunchImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.lunch.imageColor
      ).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateMessageCommandLunchImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.command.lunch.imageUrl =
        IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandLunchImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command lunch image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command lunch image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandLunchImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.lunch.imageUrl
      ).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`updateMessageCommandPrefix()`, (): void => {
    let prefix: string | (string | undefined)[];

    let configServiceGetUpdatedStringOrArraySpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();

      configServiceGetUpdatedStringOrArraySpy = jest
        .spyOn(configService, `getUpdatedStringOrArray`)
        .mockImplementation();
    });

    describe(`when the given value is a string`, (): void => {
      beforeEach((): void => {
        prefix = `dummy-prefix`;
        discordMessageConfigCoreService.command.prefix = `prefix`;

        configServiceGetUpdatedStringOrArraySpy.mockReturnValue(`dummy-prefix`);
      });

      it(`should get the updated string`, (): void => {
        expect.assertions(2);

        service.updateMessageCommandPrefix(prefix);

        expect(configServiceGetUpdatedStringOrArraySpy).toHaveBeenCalledTimes(
          1
        );
        expect(configServiceGetUpdatedStringOrArraySpy).toHaveBeenCalledWith({
          context: `DiscordMessageConfigMutatorService`,
          newValue: `dummy-prefix`,
          oldValue: `prefix`,
          valueName: `message command prefix`,
        } as IConfigUpdateStringOrArray);
      });

      it(`should update the Discord message config command prefix with the updated string`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandPrefix(prefix);

        expect(discordMessageConfigCoreService.command.prefix).toStrictEqual(
          `dummy-prefix`
        );
      });
    });

    describe(`when the given value is an array`, (): void => {
      beforeEach((): void => {
        prefix = [`dummy-dummy`, `prefix-dummy`];
        discordMessageConfigCoreService.command.prefix = [`dummy`, `prefix`];

        configServiceGetUpdatedStringOrArraySpy.mockReturnValue([
          `dummy-dummy`,
          `prefix-dummy`,
        ]);
      });

      it(`should get the updated string array`, (): void => {
        expect.assertions(2);

        service.updateMessageCommandPrefix(prefix);

        expect(configServiceGetUpdatedStringOrArraySpy).toHaveBeenCalledTimes(
          1
        );
        expect(configServiceGetUpdatedStringOrArraySpy).toHaveBeenCalledWith({
          context: `DiscordMessageConfigMutatorService`,
          newValue: [`dummy-dummy`, `prefix-dummy`],
          oldValue: [`dummy`, `prefix`],
          valueName: `message command prefix`,
        } as IConfigUpdateStringOrArray);
      });

      it(`should update the Discord message config command prefix with the updated string array`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandPrefix(prefix);

        expect(discordMessageConfigCoreService.command.prefix).toStrictEqual([
          `dummy-dummy`,
          `prefix-dummy`,
        ]);
      });
    });
  });

  describe(`updateMessageCommandReleaseNotes()`, (): void => {
    let config:
      | PartialNested<IDiscordMessageCommandReleaseNotesConfig>
      | undefined;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      discordMessageConfigCoreService.command.releaseNotes = {
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

        service.updateMessageCommandReleaseNotes(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes
        ).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageCommandReleaseNotesConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config command release notes image color`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandReleaseNotes(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config command release notes image url`, (): void => {
        expect.assertions(1);

        service.updateMessageCommandReleaseNotes(config);

        expect(
          discordMessageConfigCoreService.command.releaseNotes.imageUrl
        ).toStrictEqual(IconEnum.INFORMATION);
      });
    });
  });

  describe(`updateMessageCommandReleaseNotesImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.command.releaseNotes.imageColor =
        ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandReleaseNotesImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message command release notes image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config command release notes image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandReleaseNotesImageColor(imageColor);

      expect(
        discordMessageConfigCoreService.command.releaseNotes.imageColor
      ).toStrictEqual(ColorEnum.SUN);
    });
  });

  describe(`updateMessageCommandReleaseNotesImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.command.releaseNotes.imageUrl =
        IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageCommandReleaseNotesImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message command release notes image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config command release notes image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageCommandReleaseNotesImageUrl(imageUrl);

      expect(
        discordMessageConfigCoreService.command.releaseNotes.imageUrl
      ).toStrictEqual(IconEnum.GIRL);
    });
  });

  describe(`updateMessageCommandVersion()`, (): void => {
    let config: PartialNested<IDiscordMessageCommandVersionConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
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

        service.updateMessageCommandVersion(config);

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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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
      service = DiscordMessageConfigMutatorService.getInstance();
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

  describe(`updateMessageWarning()`, (): void => {
    let config: PartialNested<IDiscordMessageWarningConfig> | undefined;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      discordMessageConfigCoreService.warning = {
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

        service.updateMessageWarning(config);

        expect(discordMessageConfigCoreService.warning).toStrictEqual({
          imageColor: ColorEnum.SUN,
          imageUrl: IconEnum.GIRL,
        } as IDiscordMessageWarningConfig);
      });
    });

    describe(`when the given config contains an image color`, (): void => {
      beforeEach((): void => {
        config = {
          imageColor: ColorEnum.MINT,
        };
      });

      it(`should update the config warning image color`, (): void => {
        expect.assertions(1);

        service.updateMessageWarning(config);

        expect(
          discordMessageConfigCoreService.warning.imageColor
        ).toStrictEqual(ColorEnum.MINT);
      });
    });

    describe(`when the given config contains an image url`, (): void => {
      beforeEach((): void => {
        config = {
          imageUrl: IconEnum.INFORMATION,
        };
      });

      it(`should update the config warning image url`, (): void => {
        expect.assertions(1);

        service.updateMessageWarning(config);

        expect(discordMessageConfigCoreService.warning.imageUrl).toStrictEqual(
          IconEnum.INFORMATION
        );
      });
    });
  });

  describe(`updateMessageWarningImageColor()`, (): void => {
    let imageColor: ColorEnum;

    let configServiceGetUpdatedNumberSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      imageColor = ColorEnum.SUN;
      discordMessageConfigCoreService.warning.imageColor = ColorEnum.CANDY;

      configServiceGetUpdatedNumberSpy = jest
        .spyOn(configService, `getUpdatedNumber`)
        .mockReturnValue(ColorEnum.SUN);
    });

    it(`should get the updated number`, (): void => {
      expect.assertions(2);

      service.updateMessageWarningImageColor(imageColor);

      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedNumberSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: ColorEnum.SUN,
        oldValue: ColorEnum.CANDY,
        valueName: `message warning image color`,
      } as IConfigUpdateNumber);
    });

    it(`should update the Discord message config warning image color with the updated number`, (): void => {
      expect.assertions(1);

      service.updateMessageWarningImageColor(imageColor);

      expect(discordMessageConfigCoreService.warning.imageColor).toStrictEqual(
        ColorEnum.SUN
      );
    });
  });

  describe(`updateMessageWarningImageUrl()`, (): void => {
    let imageUrl: IconEnum;

    let configServiceGetUpdatedStringSpy: jest.SpyInstance;

    beforeEach((): void => {
      service = DiscordMessageConfigMutatorService.getInstance();
      imageUrl = IconEnum.GIRL;
      discordMessageConfigCoreService.warning.imageUrl = IconEnum.INFORMATION;

      configServiceGetUpdatedStringSpy = jest
        .spyOn(configService, `getUpdatedString`)
        .mockReturnValue(IconEnum.GIRL);
    });

    it(`should get the updated string`, (): void => {
      expect.assertions(2);

      service.updateMessageWarningImageUrl(imageUrl);

      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledTimes(1);
      expect(configServiceGetUpdatedStringSpy).toHaveBeenCalledWith({
        context: `DiscordMessageConfigMutatorService`,
        newValue: IconEnum.GIRL,
        oldValue: IconEnum.INFORMATION,
        valueName: `message warning image url`,
      } as IConfigUpdateString);
    });

    it(`should update the Discord message config warning image url with the updated string`, (): void => {
      expect.assertions(1);

      service.updateMessageWarningImageUrl(imageUrl);

      expect(discordMessageConfigCoreService.warning.imageUrl).toStrictEqual(
        IconEnum.GIRL
      );
    });
  });
});
