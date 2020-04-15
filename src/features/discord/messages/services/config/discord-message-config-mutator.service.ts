import _ from "lodash";
import { AbstractConfigService } from "../../../../../classes/abstract-config.service";
import { removeUndefined } from "../../../../../functions/formatters/remove-undefined";
import { wrapInQuotes } from "../../../../../functions/formatters/wrap-in-quotes";
import { PartialNested } from "../../../../../types/partial-nested";
import { IDiscordConfig } from "../../../interfaces/discord-config";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
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

  protected readonly _discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();
  protected readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  protected readonly _className = `DiscordMessageConfigMutatorService`;

  protected constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateMessage(config.message);

      this._loggerService.debug({
        context: this._className,
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
      this.updateMessageCommandVersion(command.version);
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
    imageColor?: Readonly<number>
  ): void {
    this._discordMessageConfigCoreService.command.cookie.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._className,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandCookieImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_COOKIE_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandCookieImageUrl(imageUrl?: Readonly<string>): void {
    this._discordMessageConfigCoreService.command.cookie.imageUrl = this._configService.getUpdatedString(
      {
        context: this._className,
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
    imageColor?: Readonly<number>
  ): void {
    this._discordMessageConfigCoreService.command.error.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._className,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandErrorImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_ERROR_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandErrorImageUrl(imageUrl?: Readonly<string>): void {
    this._discordMessageConfigCoreService.command.error.imageUrl = this._configService.getUpdatedString(
      {
        context: this._className,
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
    imageColor?: Readonly<number>
  ): void {
    this._discordMessageConfigCoreService.command.help.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._className,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandHelpImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandHelpImageUrl(imageUrl?: Readonly<string>): void {
    this._discordMessageConfigCoreService.command.help.imageUrl = this._configService.getUpdatedString(
      {
        context: this._className,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageCommandHelpImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.COMMAND_HELP_IMAGE_URL,
      }
    );
  }

  // @todo add coverage
  // @todo refactor to use the config service
  public updateMessageCommandPrefix(
    prefix?: string | (string | undefined)[]
  ): void {
    if (_.isString(prefix)) {
      this._discordMessageConfigCoreService.command.prefix = prefix;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(
          `message command prefix updated to: ${this._chalkService.value(
            wrapInQuotes(this._discordMessageConfigCoreService.command.prefix)
          )}`
        ),
      });
    } else if (_.isArray(prefix)) {
      this._discordMessageConfigCoreService.command.prefix = removeUndefined(
        prefix
      );

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(
          `message command prefix updated to: ${this._chalkService.value(
            this._loggerService.getStringArray(
              this._discordMessageConfigCoreService.command.prefix
            )
          )}`
        ),
      });
    }
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
    imageColor?: Readonly<number>
  ): void {
    this._discordMessageConfigCoreService.command.version.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._className,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageCommandVersionImageColor(),
        valueName:
          DiscordMessageConfigValueNameEnum.COMMAND_VERSION_IMAGE_COLOR,
      }
    );
  }

  public updateMessageCommandVersionImageUrl(
    imageUrl?: Readonly<string>
  ): void {
    this._discordMessageConfigCoreService.command.version.imageUrl = this._configService.getUpdatedString(
      {
        context: this._className,
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

  public updateMessageErrorImageColor(imageColor?: Readonly<number>): void {
    this._discordMessageConfigCoreService.error.imageColor = this._configService.getUpdatedNumber(
      {
        context: this._className,
        newValue: imageColor,
        oldValue: this._discordMessageConfigService.getMessageErrorImageColor(),
        valueName: DiscordMessageConfigValueNameEnum.ERROR_IMAGE_COLOR,
      }
    );
  }

  public updateMessageErrorImageUrl(imageUrl?: Readonly<string>): void {
    this._discordMessageConfigCoreService.error.imageUrl = this._configService.getUpdatedString(
      {
        context: this._className,
        newValue: imageUrl,
        oldValue: this._discordMessageConfigService.getMessageErrorImageUrl(),
        valueName: DiscordMessageConfigValueNameEnum.ERROR_IMAGE_URL,
      }
    );
  }
}
