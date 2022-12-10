import { IFirebaseGuildChannelV1 } from './channels/firebase-guild-channel-v1';
import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { Snowflake } from 'discord.js';

export interface IFirebaseGuildV3 {
  /**
   * @description
   * A list of channel within the Discord guild.
   * Created within the [v3]{@link FirebaseGuildVersionEnum.V3}.
   */
  channels?: IFirebaseGuildChannelV1[] | undefined;

  /**
   * @description
   * The Discord guild id.
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * Used to store the last release notes version sent on the guild.
   * This is useful to avoid sending release notes on each run.
   */
  lastReleaseNotesVersion?: string | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseGuildVersionEnum.V3 | undefined;
}
