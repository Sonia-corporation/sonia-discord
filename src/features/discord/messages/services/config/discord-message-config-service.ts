import _ from "lodash";
import { IDiscordMessageCommandConfig } from "../../../interfaces/discord-message-command-config";
import { IDiscordMessageCommandErrorConfig } from "../../../interfaces/discord-message-command-error-config";
import { IDiscordMessageCommandVersionConfig } from "../../../interfaces/discord-message-command-version-config";
import { IDiscordMessageConfig } from "../../../interfaces/discord-message-config";
import { IDiscordMessageErrorConfig } from "../../../interfaces/discord-message-error-config";
import { DiscordMessageConfigCoreService } from "./discord-message-config-core-service";

export class DiscordMessageConfigService {
  private static _instance: DiscordMessageConfigService;

  public static getInstance(): DiscordMessageConfigService {
    if (_.isNil(DiscordMessageConfigService._instance)) {
      DiscordMessageConfigService._instance = new DiscordMessageConfigService();
    }

    return DiscordMessageConfigService._instance;
  }

  private readonly _discordMessageConfigCoreService = DiscordMessageConfigCoreService.getInstance();

  public getConfig(): IDiscordMessageConfig {
    return {
      command: this.getMessageCommand(),
      error: this.getMessageError(),
    };
  }

  public getMessageCommand(): IDiscordMessageCommandConfig {
    return this._discordMessageConfigCoreService.command;
  }

  public getMessageCommandError(): IDiscordMessageCommandErrorConfig {
    return this._discordMessageConfigCoreService.command.error;
  }

  public getMessageCommandErrorImageColor(): number {
    return this._discordMessageConfigCoreService.command.error.imageColor;
  }

  public getMessageCommandErrorImageUrl(): string {
    return this._discordMessageConfigCoreService.command.error.imageUrl;
  }

  public getMessageCommandPrefix(): string | string[] {
    return this._discordMessageConfigCoreService.command.prefix;
  }

  public getMessageCommandVersion(): IDiscordMessageCommandVersionConfig {
    return this._discordMessageConfigCoreService.command.version;
  }

  public getMessageCommandVersionImageColor(): number {
    return this._discordMessageConfigCoreService.command.version.imageColor;
  }

  public getMessageCommandVersionImageUrl(): string {
    return this._discordMessageConfigCoreService.command.version.imageUrl;
  }

  public getMessageError(): IDiscordMessageErrorConfig {
    return this._discordMessageConfigCoreService.error;
  }

  public getMessageErrorImageColor(): number {
    return this._discordMessageConfigCoreService.error.imageColor;
  }

  public getMessageErrorImageUrl(): string {
    return this._discordMessageConfigCoreService.error.imageUrl;
  }
}
