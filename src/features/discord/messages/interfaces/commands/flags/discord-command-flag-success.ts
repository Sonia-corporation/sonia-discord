import { DiscordCommandFlagErrorTitleEnum } from "../../../enums/commands/flags/discord-command-flag-error-title.enum";

export interface IDiscordCommandFlagSuccess {
  /**
   * @description
   * The description of the success
   *
   * Basically what is the consequence of the success
   *
   * Usually used as the value for an [embed field]{@link EmbedFieldData}
   */
  description: string;

  /**
   * @description
   * The name of the success
   *
   * Usually used as the title for an [embed field]{@link EmbedFieldData}
   */
  name: DiscordCommandFlagErrorTitleEnum;
}
