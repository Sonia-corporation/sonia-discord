import _ from 'lodash';
import { DiscordMessageCommandEnum } from './enums/discord-message-command.enum';

export class DiscordMessageCommand {
  private static _instance: DiscordMessageCommand;

  public static getInstance(): DiscordMessageCommand {
    if (_.isNil(DiscordMessageCommand._instance)) {
      DiscordMessageCommand._instance = new DiscordMessageCommand();
    }

    return DiscordMessageCommand._instance;
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
