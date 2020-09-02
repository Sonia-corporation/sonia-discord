import { Snowflake } from "discord.js";
import { FirebaseGuildChannelVersionEnum } from "../enums/firebase-guild-channel-version.enum";

export interface IFirebaseGuildChannelV1 {
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
