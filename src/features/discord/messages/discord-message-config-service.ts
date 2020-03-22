import _ from 'lodash';
import { removeUndefined } from '../../../functions/remove-undefined';
import { PartialNested } from '../../../types/partial-nested';
import { ChalkService } from '../../logger/chalk-service';
import { LoggerService } from '../../logger/logger-service';
import { IDiscordConfig } from '../interfaces/discord-config';
import { IDiscordMessageCommandConfig } from '../interfaces/discord-message-command-config';
import { IDiscordMessageConfig } from '../interfaces/discord-message-config';
import { DISCORD_MESSAGE_CONFIG } from './discord-message-config';

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
  private readonly _className = 'DiscordMessageConfigService';

  public constructor(config?: Readonly<PartialNested<IDiscordConfig>>) {
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

      this._loggerService.log(this._className, this._chalkService.text(`message command prefix updated to: ${this._chalkService.value(`"${DISCORD_MESSAGE_CONFIG.command.prefix}"`)}`));
    } else if (_.isArray(prefix)) {
      DISCORD_MESSAGE_CONFIG.command.prefix = removeUndefined(prefix);

      this._loggerService.log(this._className, this._chalkService.text(`message command prefix updated to: ${this._chalkService.value(this._loggerService.getStringArray(DISCORD_MESSAGE_CONFIG.command.prefix))}`));
    }
  }
}
