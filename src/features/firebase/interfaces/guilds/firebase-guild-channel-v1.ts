import { Snowflake } from "discord.js";
import { FirebaseGuildChannelVersionEnum } from "../../enums/guilds/firebase-guild-channel-version.enum";

export interface IFirebaseGuildChannelV1 {
  /**
   * @description
   * Used to store the last release notes version sent on the guild
   * This is useful to avoid sending release notes on each run
   */
  features?: string | undefined;

  /**
   * @description
   * The Discord channel id
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur
   */
  version?: FirebaseGuildChannelVersionEnum.V1 | undefined;
}
