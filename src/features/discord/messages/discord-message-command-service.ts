import _ from 'lodash';
import { DiscordMessageCommandEnum } from './enums/discord-message-command.enum';

export class DiscordMessageCommandService {
  private static _instance: DiscordMessageCommandService;

  public static getInstance(): DiscordMessageCommandService {
    if (_.isNil(DiscordMessageCommandService._instance)) {
      DiscordMessageCommandService._instance = new DiscordMessageCommandService();
    }

    return DiscordMessageCommandService._instance;
  }

  public hasCommand(message: Readonly<string>): boolean {
    if (this.hasVersionCommand(message)) {
      return true;
    }

    return false;
  }

  public hasVersionCommand(message: Readonly<string>): boolean {
    return _.includes(message, DiscordMessageCommandEnum.VERSION);
  }

  public handleVersionCommand(message: Readonly<string>): string {

  }

  public handleCommands(message: Readonly<string>): string | null {
    if (this.hasVersionCommand(message)) {
      return this.handleVersionCommand(message);
    }

    return null;
  }
}
