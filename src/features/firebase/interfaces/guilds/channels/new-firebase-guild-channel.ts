import { Snowflake } from "discord.js";
import { FirebaseGuildChannelVersionEnum } from "../../../enums/guilds/channels/firebase-guild-channel-version.enum";

/**
 * @see [sonia-link-002]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-002}
 */
export interface INewFirebaseGuildChannel {
  features?: undefined;
  id: Snowflake;
  version: FirebaseGuildChannelVersionEnum.V1;
}
