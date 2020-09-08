import { Snowflake } from "discord.js";
import { FirebaseGuildVersionEnum } from "../../enums/guilds/firebase-guild-version.enum";

export interface IFirebaseGuildV2 {
  /**
   * @description
   * The Discord guild id
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * Used to store the last release notes version sent on the guild
   * This is useful to avoid sending release notes on each run
   */
  lastReleaseNotesVersion?: string | undefined;

  /**
   * @description
   * The entity version used to perform clean update when a breaking change occur
   */
  version?: FirebaseGuildVersionEnum.V2 | undefined;
}
