import _ from "lodash";
import { AbstractConfigService } from "../../../../../classes/abstract-config.service";
import { ColorEnum } from "../../../../../enums/color.enum";
import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { removeUndefined } from "../../../../../functions/formatters/remove-undefined";
import { PartialNested } from "../../../../../types/partial-nested";
import { LoggerService } from "../../../../logger/services/logger.service";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandLunchConfig } from "../../../interfaces/discord-message-command-lunch-config";
import { IDiscordMessageCommandReleaseNotesConfig } from "../../../interfaces/discord-message-command-release-notes-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { IDiscordMessageWarningConfig } from "../../../interfaces/discord-message-warning-config";
import { DiscordMessageConfigValueNameEnum } from "../../enums/discord-message-config-value-name.enum";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core.service";
import { DiscordMessageConfigService } from "./discord-message-config.service";

export class DiscordMessageConfigMutatorService extends AbstractConfigService<
  IDiscordConfig
> {
  private static _instance: DiscordMessageConfigMutatorService;

  public static getInstance(
    config?: Readonly<PartialNested<IDiscordConfig>>
  ): DiscordMessageConfigMutatorService {
    if (_.isNil(DiscordMessageConfigMutatorService._instance)) {
      DiscordMessageConfigMutatorService._instance = new DiscordMessageConfigMutatorService(
        config
      );
    }

    return DiscordMessageConfigMutatorService._instance;
  }

  private _loggerService: LoggerService = LoggerService.getInstance();
  private _discordMessageConfigCoreService: DiscordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
  private _discordMessageConfigService: DiscordMessageConfigService = DiscordMessageConfigService.getInstance();

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_MUTATOR_SERVICE, config);
  }

  public preUpdateConfig(): void {
    this._loggerService = LoggerService.getInstance();
    this._discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
    this._discordMessageConfigService = DiscordMessageConfigService.getInstance();
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateMessage(config.message);

      this._loggerService.debug({
        context: this._serviceName,
        message: this._chalkService.text(`configuration updated`),
      });
    }
  }

  public updateMessage(
    message?: Readonly<PartialNested<IDiscordMessageConfig>>
  ): void {
    if (!_.isNil(message)) {
      this.updateMessageCommand(message.command);
      this.updateMessageError(message.error);
      this.updateMessageWarning(message.warning);
    }
  }

  public updateMessageCommand(
    command?: Readonly<PartialNested<IDiscordMessageCommandConfig>>
  ): void {
    if (!_.isNil(command)) {
      this.updateMessageCommandCookie(command.cookie);
      this.updateMessageCommandError(command.error);
      this.updateMessageCommandHelp(command.help);
      this.updateMessageCommandPrefix(command.prefix);
      this.updateMessageCommandReleaseNotes(command.releaseNotes);
      this.updateMessageCommandVersion(command.version);
      this.updateMessageCommandLunch(command.lunch);
    }
  }

  public updateMessageCommandCookie(
    cookie?: Readonly<PartialNested<IDiscordMessageCommandCookieConfig>>
  ): void {
    if (!_.isNil(cookie)) {
      this.updateMessageCommandCookieImageColor(cookie.imageColor);
      this.updateMessageCommandCookieImageUrl(cookie.imageUrl);
    }
  }

  public updateMessageCommandCookieImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.command.cookie.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandCookieImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandCookieImageUrl(
    imageUrl?: Readonly<IconEnum>
  ): void {
    this._discordMessageConfigCoreService.command.cookie.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandCookieImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandError(
    error?: Readonly<PartialNested<IDiscordMessageCommandErrorConfig>>
  ): void {
    if (!_.isNil(error)) {
      this.updateMessageCommandErrorImageColor(error.imageColor);
      this.updateMessageCommandErrorImageUrl(error.imageUrl);
    }
  }

  public updateMessageCommandErrorImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.command.error.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandErrorImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandErrorImageUrl(
    imageUrl?: Readonly<IconEnum>
  ): void {
    this._discordMessageConfigCoreService.command.error.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandErrorImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandHelp(
    error?: Readonly<PartialNested<IDiscordMessageCommandErrorConfig>>
  ): void {
    if (!_.isNil(error)) {
      this.updateMessageCommandHelpImageColor(error.imageColor);
      this.updateMessageCommandHelpImageUrl(error.imageUrl);
    }
  }

  public updateMessageCommandHelpImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.command.help.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandHelpImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandHelpImageUrl(imageUrl?: Readonly<IconEnum>): void {
    this._discordMessageConfigCoreService.command.help.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandHelpImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandLunch(
    lunch?: Readonly<PartialNested<IDiscordMessageCommandLunchConfig>>
  ): void {
    if (!_.isNil(lunch)) {
      this.updateMessageCommandLunchImageColor(lunch.imageColor);
      this.updateMessageCommandLunchImageUrl(lunch.imageUrl);
    }
  }

  public updateMessageCommandLunchImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.command.lunch.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandLunchImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_LUNCH_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandLunchImageUrl(
    imageUrl?: Readonly<IconEnum>
  ): void {
    this._discordMessageConfigCoreService.command.lunch.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandLunchImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_LUNCH_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandPrefix(
    prefix?: Readonly<string | (string | undefined)[]>
  ): void {
    let updatedPrefix: string | string[] | undefined;

    if (_.isArray(prefix)) {
      updatedPrefix = removeUndefined(prefix);
    } else if (_.isString(prefix)) {
      updatedPrefix = prefix;
    }

    this._discordMessageConfigCoreService.command.prefix = this._configService.getUpdatedStringOrArray(
      {
        context: this._serviceName,
        newValue: updatedPrefix,
        oldValue: this._discordMessageConfigService.getMessageCommandPrefix(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_PREFIX,
      }
    );
  }

  public updateMessageCommandReleaseNotes(
    releaseNotes?: Readonly<
      PartialNested<IDiscordMessageCommandReleaseNotesConfig>
    >
  ): void {
    if (!_.isNil(releaseNotes)) {
      this.updateMessageCommandReleaseNotesImageColor(releaseNotes.imageColor);
      this.updateMessageCommandReleaseNotesImageUrl(releaseNotes.imageUrl);
    }
  }

  public updateMessageCommandReleaseNotesImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.command.releaseNotes.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandReleaseNotesImageColor(),
        valueName:
          DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandReleaseNotesImageUrl(
    imageUrl?: Readonly<IconEnum>
  ): void {
    this._discordMessageConfigCoreService.command.releaseNotes.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandReleaseNotesImageUrl(),
        valueName:
          DiscordMessageConfigValueNameEnum.COMMAND_RELEASE_NOTES_IMAGE_URL,
      }
    );
  }

  public updateMessageCommandVersion(
    version?: Readonly<PartialNested<IDiscordMessageCommandVersionConfig>>
  ): void {
    if (!_.isNil(version)) {
      this.updateMessageCommandVersionImageColor(version.imageColor);
      this.updateMessageCommandVersionImageUrl(version.imageUrl);
    }
  }

  public updateMessageCommandVersionImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.command.version.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandVersionImageColor(),
        valueName:
          DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandVersionImageUrl(
    imageUrl?: Readonly<IconEnum>
  ): void {
    this._discordMessageConfigCoreService.command.version.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandVersionImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_URL,
      }
    );
  }

  public updateMessageError(
    error?: Readonly<PartialNested<IDiscordMessageErrorConfig>>
  ): void {
    if (!_.isNil(error)) {
      this.updateMessageErrorImageColor(error.imageColor);
      this.updateMessageErrorImageUrl(error.imageUrl);
    }
  }

  public updateMessageErrorImageColor(imageColor?: Readonly<ColorEnum>): void {
    this._discordMessageConfigCoreService.error.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageErrorImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.ERROR_IMAGE_COLOR,
      }
    );
  }

  public updateMessageErrorImageUrl(imageUrl?: Readonly<IconEnum>): void {
    this._discordMessageConfigCoreService.error.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageErrorImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.ERROR_IMAGE_URL,
      }
    );
  }

  public updateMessageWarning(
    warning?: Readonly<PartialNested<IDiscordMessageWarningConfig>>
  ): void {
    if (!_.isNil(warning)) {
      this.updateMessageWarningImageColor(warning.imageColor);
      this.updateMessageWarningImageUrl(warning.imageUrl);
    }
  }

  public updateMessageWarningImageColor(
    imageColor?: Readonly<ColorEnum>
  ): void {
    this._discordMessageConfigCoreService.warning.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._serviceName,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageWarningImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.WARNING_IMAGE_COLOR,
      }
    );
  }

  public updateMessageWarningImageUrl(imageUrl?: Readonly<IconEnum>): void {
    this._discordMessageConfigCoreService.warning.imageUrl = this._configService.getUpdatedString(
      {
        context: this._serviceName,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageWarningImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.WARNING_IMAGE_URL,
      }
    );
  }
}
