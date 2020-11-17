import { IDiscordCommandFlagAction } from '../../../types/commands/flags/discord-command-flag-action';

export interface IDiscordCommandFlag<T extends string, TAction extends IDiscordCommandFlagAction<T>> {
  action: TAction;
  description: string;
  name: T;

  /**
   * @description
   * Using the name is enough
   * No need to list the shortcuts as well
   */
  opposites?: T[] | undefined;
  shortcuts?: T[] | undefined;
}
