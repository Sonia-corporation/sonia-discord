export interface IDiscordCommandFlagDuplicated {
  /**
   * @description
   * The description of the duplicated flag.
   * Basically the list of duplicated flags from the message.
   * Usually used as the value for an [embed field]{@link EmbedField}.
   */
  description: string;

  /**
   * @description
   * The humanized name of the duplicated flag.
   * Usually used as the title for an [embed field]{@link EmbedField}.
   */
  name: string;
}
