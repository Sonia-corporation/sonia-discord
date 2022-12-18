export interface IDiscordCommandFlagDuplicated {
  /**
   * @description
   * The description of the duplicated flag.
   * Basically the list of duplicated flags from the message.
   * Usually used as the value for an [embed field]{@link APIEmbedField}.
   */
  description: string;

  /**
   * @description
   * The humanized name of the duplicated flag.
   * Usually used as the title for an [embed field]{@link APIEmbedField}.
   */
  name: string;
}
