import _ from 'lodash';
import { AbstractConfigService } from '../../../../classes/abstract-config-service';
import { removeUndefined } from '../../../../functions/formatters/remove-undefined';
import { wrapInQuotes } from '../../../../functions/formatters/wrap-in-quotes';
import { PartialNested } from '../../../../types/partial-nested';
import { IDiscordConfig } from '../../interfaces/discord-config';
import { IDiscordMessageCommandConfig } from '../../interfaces/discord-message-command-config';
import { IDiscordMessageCommandVersionConfig } from '../../interfaces/discord-message-command-version-config';
import { IDiscordMessageConfig } from '../../interfaces/discord-message-config';
import { IDiscordMessageErrorConfig } from '../../interfaces/discord-message-error-config';
import { DISCORD_MESSAGE_CONFIG } from '../constants/discord-message-config';

export class DiscordMessageConfigService extends AbstractConfigService<IDiscordConfig> {
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

  // @todo add coverage
  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateMessage(config.message);

      this._loggerService.debug({
        context: this._className,
        message: this._chalkService.text(`configuration updated`)
      });
    }
  }

  public getMessage(): IDiscordMessageConfig {
    return DISCORD_MESSAGE_CONFIG;
  }

  // @todo add coverage
  public updateMessage(message?: Readonly<PartialNested<IDiscordMessageConfig>>): void {
    if (!_.isNil(message)) {
      this.updateMessageCommand(message.command);
      this.updateMessageError(message.error);
    }
  }

  public getMessageCommand(): IDiscordMessageCommandConfig {
    return DISCORD_MESSAGE_CONFIG.command;
  }

  // @todo add coverage
  public updateMessageCommand(command?: Readonly<PartialNested<IDiscordMessageCommandConfig>>): void {
    if (!_.isNil(command)) {
      this.updateMessageCommandPrefix(command.prefix);
      this.updateMessageCommandVersion(command.version);
    }
  }

  public getMessageCommandPrefix(): string | string[] {
    return DISCORD_MESSAGE_CONFIG.command.prefix;
  }

  // @todo add coverage
  // @todo refactor to use the config service
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

  // @todo add coverage
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
    DISCORD_MESSAGE_CONFIG.command.version.imageColor = this._configService.getUpdatedNumber({
      context: this._className,
      newValue: imageColor,
      oldValue: DISCORD_MESSAGE_CONFIG.command.version.imageColor,
      valueName: `message command version image color`
    });
  }

  public getMessageCommandVersionImageUrl(): string {
    return DISCORD_MESSAGE_CONFIG.command.version.imageUrl;
  }

  public updateMessageCommandVersionImageUrl(imageUrl?: Readonly<string>): void {
    DISCORD_MESSAGE_CONFIG.command.version.imageUrl = this._configService.getUpdatedString({
      context: this._className,
      newValue: imageUrl,
      oldValue: DISCORD_MESSAGE_CONFIG.command.version.imageUrl,
      valueName: `message command version image url`
    });
  }

  public getMessageError(): IDiscordMessageErrorConfig {
    return DISCORD_MESSAGE_CONFIG.error;
  }

  // @todo add coverage
  public updateMessageError(error?: Readonly<PartialNested<IDiscordMessageErrorConfig>>): void {
    if (!_.isNil(error) && _.isPlainObject(error)) {
      this.updateMessageErrorImageColor(error.imageColor);
      this.updateMessageErrorImageUrl(error.imageUrl);
    }
  }

  public getMessageCommandErrorImageColor(): number {
    return DISCORD_MESSAGE_CONFIG.error.imageColor;
  }

  public updateMessageErrorImageColor(imageColor?: Readonly<number>): void {
    DISCORD_MESSAGE_CONFIG.error.imageColor = this._configService.getUpdatedNumber({
      context: this._className,
      newValue: imageColor,
      oldValue: DISCORD_MESSAGE_CONFIG.error.imageColor,
      valueName: `message error image color`
    });
  }

  public getMessageCommandErrorImageUrl(): string {
    return DISCORD_MESSAGE_CONFIG.error.imageUrl;
  }

  public updateMessageErrorImageUrl(imageUrl?: Readonly<string>): void {
    DISCORD_MESSAGE_CONFIG.error.imageUrl = this._configService.getUpdatedString({
      context: this._className,
      newValue: imageUrl,
      oldValue: DISCORD_MESSAGE_CONFIG.error.imageUrl,
      valueName: `message error image url`
    });
  }
}
