import _ from 'lodash';
import { removeUndefined } from '../../../../functions/remove-undefined';
import { wrapInQuotes } from '../../../../functions/wrap-in-quotes';
import { PartialNested } from '../../../../types/partial-nested';
import { ChalkService } from '../../../logger/services/chalk-service';
import { LoggerService } from '../../../logger/services/logger-service';
import { IDiscordConfig } from '../../interfaces/discord-config';
import { IDiscordMessageCommandConfig } from '../../interfaces/discord-message-command-config';
import { IDiscordMessageCommandVersionConfig } from '../../interfaces/discord-message-command-version-config';
import { IDiscordMessageConfig } from '../../interfaces/discord-message-config';
import { IDiscordMessageErrorConfig } from '../../interfaces/discord-message-error-config';
import { DISCORD_MESSAGE_CONFIG } from '../constants/discord-message-config';

export class DiscordMessageConfigService {
  private static _instance: DiscordMessageConfigService;

  public static getInstance(config?: Readonly<PartialNested<IDiscordConfig>>): DiscordMessageConfigService {
    if (_.isNil(DiscordMessageConfigService._instance)) {
      DiscordMessageConfigService._instance = new DiscordMessageConfigService(config);
    }

    return DiscordMessageConfigService._instance;
  }

  private readonly _loggerService = LoggerService.getInstance();
  private readonly _chalkService = ChalkService.getInstance();
  private readonly _className = `DiscordMessageConfigService`;

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
    this.updateConfig(config);
  }

  public updateConfig(config?: Readonly<PartialNested<IDiscordConfig>>): void {
    if (!_.isNil(config)) {
      this.updateMessage(config.message);

      this._loggerService.debug(this._className, this._chalkService.text(`configuration updated`));
    }
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
    }
  }

  public getMessageCommandPrefix(): string | string[] {
    return DISCORD_MESSAGE_CONFIG.command.prefix;
  }

  public updateMessageCommandPrefix(prefix?: string | (string | undefined)[]): void {
    if (_.isString(prefix)) {
      DISCORD_MESSAGE_CONFIG.command.prefix = prefix;

      this._loggerService.log(this._className, this._chalkService.text(`message command prefix updated to: ${this._chalkService.value(wrapInQuotes(DISCORD_MESSAGE_CONFIG.command.prefix))}`));
    } else if (_.isArray(prefix)) {
      DISCORD_MESSAGE_CONFIG.command.prefix = removeUndefined(prefix);

      this._loggerService.log(this._className, this._chalkService.text(`message command prefix updated to: ${this._chalkService.value(this._loggerService.getStringArray(DISCORD_MESSAGE_CONFIG.command.prefix))}`));
    }
  }

  public getMessageCommandVersion(): IDiscordMessageCommandVersionConfig {
    return DISCORD_MESSAGE_CONFIG.command.version;
  }

  public getMessageError(): IDiscordMessageErrorConfig {
    return DISCORD_MESSAGE_CONFIG.error;
  }
}
