import _ from "lodash";
import { AbstractService } from "../../../../../classes/services/abstract.service";
import { ColorEnum } from "../../../../../enums/color.enum";
import { IconEnum } from "../../../../../enums/icon.enum";
import { ServiceNameEnum } from "../../../../../enums/service-name.enum";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandCookieConfig } from "../../../interfaces/discord-message-command-cookie-config";
import { IDiscordMessageCommandHelpConfig } from "../../../interfaces/discord-message-command-help-config";
import { IDiscordMessageCommandLunchConfig } from "../../../interfaces/discord-message-command-lunch-config";
import { IDiscordMessageCommandReleaseNotesConfig } from "../../../interfaces/discord-message-command-release-notes-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { IDiscordMessageWarningConfig } from "../../../interfaces/discord-message-warning-config";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core.service";

export class DiscordMessageConfigService extends AbstractService {
  private static _instance: DiscordMessageConfigService;

  public static getInstance(): DiscordMessageConfigService {
    if (_.isNil(DiscordMessageConfigService._instance)) {
      DiscordMessageConfigService._instance = new DiscordMessageConfigService();
    }

    return DiscordMessageConfigService._instance;
  }

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
    return DiscordMessageConfigCoreService.getInstance().command;
  }

  public getMessageCommandCliError(): IDiscordMessageCommandCookieConfig {
    return DiscordMessageConfigCoreService.getInstance().command.cliError;
  }

  public getMessageCommandCliErrorImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.cliError
      .imageColor;
  }

  public getMessageCommandCliErrorImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.cliError
      .imageUrl;
  }

  public getMessageCommandCookie(): IDiscordMessageCommandCookieConfig {
    return DiscordMessageConfigCoreService.getInstance().command.cookie;
  }

  public getMessageCommandCookieImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.cookie
      .imageColor;
  }

  public getMessageCommandCookieImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.cookie
      .imageUrl;
  }

  public getMessageCommandError(): IDiscordMessageCommandCookieConfig {
    return DiscordMessageConfigCoreService.getInstance().command.error;
  }

  public getMessageCommandErrorImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.error
      .imageColor;
  }

  public getMessageCommandErrorImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.error.imageUrl;
  }

  public getMessageCommandHelp(): IDiscordMessageCommandHelpConfig {
    return DiscordMessageConfigCoreService.getInstance().command.help;
  }

  public getMessageCommandHelpImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.help
      .imageColor;
  }

  public getMessageCommandHelpImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.help.imageUrl;
  }

  public getMessageCommandLunch(): IDiscordMessageCommandLunchConfig {
    return DiscordMessageConfigCoreService.getInstance().command.lunch;
  }

  public getMessageCommandLunchImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.lunch
      .imageColor;
  }

  public getMessageCommandLunchImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.lunch.imageUrl;
  }

  public getMessageCommandPrefix(): string | string[] {
    return DiscordMessageConfigCoreService.getInstance().command.prefix;
  }

  public getMessageCommandReleaseNotes(): IDiscordMessageCommandReleaseNotesConfig {
    return DiscordMessageConfigCoreService.getInstance().command.releaseNotes;
  }

  public getMessageCommandReleaseNotesImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.releaseNotes
      .imageColor;
  }

  public getMessageCommandReleaseNotesImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.releaseNotes
      .imageUrl;
  }

  public getMessageCommandVersion(): IDiscordMessageCommandVersionConfig {
    return DiscordMessageConfigCoreService.getInstance().command.version;
  }

  public getMessageCommandVersionImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().command.version
      .imageColor;
  }

  public getMessageCommandVersionImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().command.version
      .imageUrl;
  }

  public getMessageError(): IDiscordMessageErrorConfig {
    return DiscordMessageConfigCoreService.getInstance().error;
  }

  public getMessageErrorImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().error.imageColor;
  }

  public getMessageErrorImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().error.imageUrl;
  }

  public getMessageWarning(): IDiscordMessageWarningConfig {
    return DiscordMessageConfigCoreService.getInstance().warning;
  }

  public getMessageWarningImageColor(): ColorEnum {
    return DiscordMessageConfigCoreService.getInstance().warning.imageColor;
  }

  public getMessageWarningImageUrl(): IconEnum {
    return DiscordMessageConfigCoreService.getInstance().warning.imageUrl;
  }
}
