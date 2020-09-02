import { Snowflake } from "discord.js";
import admin from "firebase-admin";
import { FirebaseGuildVersionEnum } from "../../enums/guilds/firebase-guild-version.enum";
import { IFirebaseGuildChannelV1 } from "./firebase-guild-channel-v1";
import DocumentData = admin.firestore.DocumentData;

export interface IFirebaseGuildV3 extends DocumentData {
  /**
   * @description
   * A list of channel within the Discord guild
   */
  channels?: IFirebaseGuildChannelV1[] | undefined;

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
  version?: FirebaseGuildVersionEnum.V3 | undefined;
}
