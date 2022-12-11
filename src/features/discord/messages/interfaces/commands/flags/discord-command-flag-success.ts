export interface IDiscordCommandFlagSuccess {
  /**
   * @description
   * The description of the success.
   * Basically what is the consequence of the success.
   * Usually used as the value for an [embed field]{@link EmbedField}.
   */
  description: string;

  /**
   * @description
   * The name of the success.
   * Usually used as the title for an [embed field]{@link EmbedField}.
   */
  name: string;
}
