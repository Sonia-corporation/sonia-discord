import _ from 'lodash';
import { DiscordMessageCommandVersionService } from './discord-message-command-version-service';
import { DiscordMessageConfigService } from './discord-message-config-service';
import { DiscordMessageCommandEnum } from './enums/discord-message-command.enum';
import { IDiscordMessageResponse } from './interfaces/discord-message-response';

export class DiscordMessageCommandService {
  private static _instance: DiscordMessageCommandService;

  public static getInstance(): DiscordMessageCommandService {
    if (_.isNil(DiscordMessageCommandService._instance)) {
      DiscordMessageCommandService._instance = new DiscordMessageCommandService();
    }

    return DiscordMessageCommandService._instance;
  }

  private readonly _discordMessageConfigService = DiscordMessageConfigService.getInstance();
  private readonly _discordMessageCommandVersionService = DiscordMessageCommandVersionService.getInstance();

  public hasCommand(message: Readonly<string>): boolean {
    if (this.hasVersionCommand(message)) {
      return true;
    }

    return false;
  }

  public hasVersionCommand(message: Readonly<string>): boolean {
    return this._hasThisCommand(message, DiscordMessageCommandEnum.VERSION);
  }

  public handleVersionCommand(): IDiscordMessageResponse {
    return this._discordMessageCommandVersionService.handle();
  }

  public handleCommands(message: Readonly<string>): IDiscordMessageResponse | null {
    if (this.hasVersionCommand(message)) {
      return this.handleVersionCommand();
    }

    return null;
  }

  private _containsThisCommandWithPrefix(
    message: Readonly<string>,
    prefix: Readonly<string>,
    command: Readonly<DiscordMessageCommandEnum>
  ): boolean {
    return _.includes(message, `${prefix}${command}`);
  }

  private _containsThisCommandWithOneOfThesePrefixes(
    message: Readonly<string>,
    prefixes: Readonly<string[]>,
    command: Readonly<DiscordMessageCommandEnum>
  ): boolean {
    let containsThisCommand = false;

    _.forEach(prefixes, (prefix: Readonly<string>): false | void => {
      if (this._containsThisCommandWithPrefix(message, prefix, command)) {
        containsThisCommand = true;

        return false;
      }
    });

    return containsThisCommand;
  }

  private _hasThisCommand(
    message: Readonly<string>,
    command: Readonly<DiscordMessageCommandEnum>
  ): boolean {
    const prefix: string | string[] = this._discordMessageConfigService.getMessageCommandPrefix();

    if (_.isString(prefix)) {
      return this._containsThisCommandWithPrefix(message, prefix, command);
    } else if (_.isArray(prefix)) {
      return this._containsThisCommandWithOneOfThesePrefixes(message, prefix, command);
    }

    return false;
  }
}
