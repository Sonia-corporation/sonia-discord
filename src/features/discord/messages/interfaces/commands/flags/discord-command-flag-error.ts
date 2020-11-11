import { DiscordCommandFlagErrorTitleEnum } from '../../../enums/commands/flags/discord-command-flag-error-title.enum';

export interface IDiscordCommandFlagError {
  /**
   * @description
   * The description of the error
   *
   * Basically what is causing the error
   * How to solve it
   *
   * Usually used as the value for an [embed field]{@link EmbedFieldData}
   */
  description: string;

  /**
   * @description
   * true when the flag is not allowed in the associated list of flags
   */
  isUnknown: boolean;

  /**
   * @description
   * The name of the error
   *
   * Usually used as the title for an [embed field]{@link EmbedFieldData}
   */
  name: DiscordCommandFlagErrorTitleEnum;
}
