import _ from 'lodash';
import { ConfigService } from '../../../../classes/config-service';
import { removeUndefined } from '../../../../functions/formatters/remove-undefined';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { PartialNested } from '../../../../types/partial-nested';
import { IDiscordConfig } from '../../interfaces/discord-config';
import { IDiscordMessageCommandConfig } from '../../interfaces/discord-message-command-config';
import { IDiscordMessageCommandErrorConfig } from '../../interfaces/discord-message-command-error-config';
import { IDiscordMessageCommandVersionConfig } from '../../interfaces/discord-message-command-version-config';
import { IDiscordMessageConfig } from '../../interfaces/discord-message-config';
import { DISCORD_MESSAGE_CONFIG } from '../constants/discord-message-config';

export class DiscordMessageConfigService extends ConfigService<IDiscordConfig> {
  private static _instance: DiscordMessageConfigService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordMessageConfigService {
    if (_.isNil(DiscordMessageConfigService._instance)) {
      DiscordMessageConfigService._instance = new DiscordMessageConfigService(config);
    }

    return DiscordMessageConfigService._instance;
  }

  protected readonly _className = `DiscordMessageConfigService`;

  protected constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    super(config);
  }

  public getMessage(): IDiscordMessageConfig {
    return DISCORD_MESSAGE_CONFIG;
  }

  public updateMessage(message?: Readonly<PartialNested<IDiscordMessageConfig>>): void {
    if (!_.isNil(message)) {
      this.updateMessageCommand(message.command);
    }
  }

  public getMessageCommand(): IDiscordMessageCommandConfig {
    return DISCORD_MESSAGE_CONFIG.command;
  }

  public updateMessageCommand(command?: Readonly<PartialNested<IDiscordMessageCommandConfig>>): void {
    if (!_.isNil(command)) {
      this.updateMessageCommandPrefix(command.prefix);
      this.updateMessageCommandVersion(command.version);
      this.updateMessageCommandError(command.error);
    }
  }

  public getMessageCommandPrefix(): string | string[] {
    return DISCORD_MESSAGE_CONFIG.command.prefix;
  }

  public updateMessageCommandPrefix(prefix?: string | (string | undefined)[]): void {
    if (_.isString(prefix)) {
      DISCORD_MESSAGE_CONFIG.command.prefix = prefix;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`message command prefix updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_MESSAGE_CONFIG.command.prefix))}`)
      });
    } else if (_.isArray(prefix)) {
      DISCORD_MESSAGE_CONFIG.command.prefix = removeUndefined(prefix);

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`message command prefix updated to: ${this._chalkService.value(this._loggerService.getStringArray(DISCORD_MESSAGE_CONFIG.command.prefix))}`)
      });
    }
  }

  public getMessageCommandVersion(): IDiscordMessageCommandVersionConfig {
    return DISCORD_MESSAGE_CONFIG.command.version;
  }

  public updateMessageCommandVersion(version?: Readonly<PartialNested<IDiscordMessageCommandVersionConfig>>): void {
    if (!_.isNil(version) && _.isPlainObject(version)) {
      this.updateMessageCommandVersionImageColor(version.imageColor);
      this.updateMessageCommandVersionImageUrl(version.imageUrl);
    }
  }

  public getMessageCommandVersionImageColor(): number {
    return DISCORD_MESSAGE_CONFIG.command.version.imageColor;
  }

  public updateMessageCommandVersionImageColor(imageColor?: Readonly<number>): void {
    if (_.isNumber(imageColor)) {
      DISCORD_MESSAGE_CONFIG.command.version.imageColor = imageColor;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`message command version image color updated to: ${this._chalkService.value(DISCORD_MESSAGE_CONFIG.command.version.imageColor)}`)
      });
    }
  }

  public getMessageCommandVersionImageUrl(): string {
    return DISCORD_MESSAGE_CONFIG.command.version.imageUrl;
  }

  public updateMessageCommandVersionImageUrl(imageUrl?: Readonly<string>): void {
    if (_.isString(imageUrl)) {
      DISCORD_MESSAGE_CONFIG.command.version.imageUrl = imageUrl;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`message command version image color updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_MESSAGE_CONFIG.command.version.imageUrl))}`)
      });
    }
  }

  public getMessageCommandError(): IDiscordMessageCommandErrorConfig {
    return DISCORD_MESSAGE_CONFIG.command.error;
  }

  public updateMessageCommandError(error?: Readonly<PartialNested<IDiscordMessageCommandErrorConfig>>): void {
    if (!_.isNil(error) && _.isPlainObject(error)) {
      this.updateMessageCommandErrorImageColor(error.imageColor);
      this.updateMessageCommandErrorImageUrl(error.imageUrl);
    }
  }

  public getMessageCommandErrorImageColor(): number {
    return DISCORD_MESSAGE_CONFIG.command.error.imageColor;
  }

  public updateMessageCommandErrorImageColor(imageColor?: Readonly<number>): void {
    if (_.isNumber(imageColor)) {
      DISCORD_MESSAGE_CONFIG.command.error.imageColor = imageColor;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`message command error image color updated to: ${this._chalkService.value(DISCORD_MESSAGE_CONFIG.command.error.imageColor)}`)
      });
    }
  }

  public getMessageCommandErrorImageUrl(): string {
    return DISCORD_MESSAGE_CONFIG.command.error.imageUrl;
  }

  public updateMessageCommandErrorImageUrl(imageUrl?: Readonly<string>): void {
    if (_.isString(imageUrl)) {
      DISCORD_MESSAGE_CONFIG.command.error.imageUrl = imageUrl;

      this._loggerService.log({
        context: this._className,
        message: this._chalkService.text(`message command error image color updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_MESSAGE_CONFIG.command.error.imageUrl))}`)
      });
    }
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateMessage(config.message);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }
}
