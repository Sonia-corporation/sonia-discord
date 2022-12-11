export interface IDiscordCommandFlagOpposite {
  /**
   * @description
   * The description of the opposite flag.
   * Basically the list of opposite flags from the message.
   * Usually used as the value for an [embed field]{@link EmbedField}.
   */
  description: string;

  /**
   * @description
   * The humanized name of the opposite flag.
   * Usually used as the title for an [embed field]{@link EmbedField}.
   */
  name: string;
}
