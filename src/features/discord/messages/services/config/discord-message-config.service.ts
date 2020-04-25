import _ from "lodash";
import { AbstractService } from "../../../../../classes/abstract.service";
import { ColorEnum } from "../../../../../enums/color.enum";
import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core.service";

export class DiscordMessageConfigService extends AbstractService {
  private static _instance: DiscordMessageConfigService;

  public static getInstance(): DiscordMessageConfigService {
    if (_.isNil(DiscordMessageConfigService._instance)) {
      DiscordMessageConfigService._instance = new DiscordMessageConfigService();
    }

    return DiscordMessageConfigService._instance;
  }

  private readonly _discordMessageConfigCoreService: DiscordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();

  public constructor() {
    super(ServiceNameEnum.DISCORD_MESSAGE_CONFIG_SERVICE);
  }

  public getConfig(): IDiscordMessageConfig {
    return {
      command: this.getMessageCommand(),
      error: this.getMessageError(),
      warning: this.getMessageWarning(),
    };
  }

  public getMessageCommand(): IDiscordMessageCommandConfig {
    return this._discordMessageConfigCoreService.command;
  }

  public getMessageCommandCookie(): IDiscordMessageCommandCookieConfig {
    return this._discordMessageConfigCoreService.command.cookie;
  }

  public getMessageCommandCookieImageColor(): ColorEnum {
    return this._discordMessageConfigCoreService.command.cookie.imageColor;
  }

  public getMessageCommandCookieImageUrl(): IconEnum {
    return this._discordMessageConfigCoreService.command.cookie.imageUrl;
  }

  public getMessageCommandError(): IDiscordMessageCommandErrorConfig {
    return this._discordMessageConfigCoreService.command.error;
  }

  public getMessageCommandErrorImageColor(): ColorEnum {
    return this._discordMessageConfigCoreService.command.error.imageColor;
  }

  public getMessageCommandErrorImageUrl(): IconEnum {
    return this._discordMessageConfigCoreService.command.error.imageUrl;
  }

  public getMessageCommandHelp(): IDiscordMessageCommandErrorConfig {
    return this._discordMessageConfigCoreService.command.help;
  }

  public getMessageCommandHelpImageColor(): ColorEnum {
    return this._discordMessageConfigCoreService.command.help.imageColor;
  }

  public getMessageCommandHelpImageUrl(): IconEnum {
    return this._discordMessageConfigCoreService.command.help.imageUrl;
  }

  public getMessageCommandPrefix(): string | string[] {
    return this._discordMessageConfigCoreService.command.prefix;
  }

  public getMessageCommandVersion(): IDiscordMessageCommandVersionConfig {
    return this._discordMessageConfigCoreService.command.version;
  }

  public getMessageCommandVersionImageColor(): ColorEnum {
    return this._discordMessageConfigCoreService.command.version.imageColor;
  }

  public getMessageCommandVersionImageUrl(): IconEnum {
    return this._discordMessageConfigCoreService.command.version.imageUrl;
  }

  public getMessageError(): IDiscordMessageErrorConfig {
    return this._discordMessageConfigCoreService.error;
  }

  public getMessageErrorImageColor(): ColorEnum {
    return this._discordMessageConfigCoreService.error.imageColor;
  }

  public getMessageErrorImageUrl(): IconEnum {
    return this._discordMessageConfigCoreService.error.imageUrl;
  }

  public getMessageWarning(): IDiscordMessageErrorConfig {
    return this._discordMessageConfigCoreService.warning;
  }

  public getMessageWarningImageColor(): ColorEnum {
    return this._discordMessageConfigCoreService.warning.imageColor;
  }

  public getMessageWarningImageUrl(): IconEnum {
    return this._discordMessageConfigCoreService.warning.imageUrl;
  }
}
