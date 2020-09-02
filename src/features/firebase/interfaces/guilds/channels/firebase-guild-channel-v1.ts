import { Snowflake } from "discord.js";
import { FirebaseGuildChannelVersionEnum } from "../../../enums/guilds/channels/firebase-guild-channel-version.enum";
import { IFirebaseGuildChannelFeatureV1 } from "./features/firebase-guild-channel-feature-v1";

export interface IFirebaseGuildChannelV1 {
  /**
   * @description
   * Used to store the configuration of each Sonia feature
   * Related to the feature command obviously
   */
  features?: IFirebaseGuildChannelFeatureV1 | undefined;

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
