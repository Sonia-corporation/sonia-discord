import { IFirebaseDmFeatureV1 } from './features/firebase-dm-feature-v1';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { Snowflake } from 'discord.js';

export interface IFirebaseDmV1 {
  /**
   * @description
   * Used to store the configuration of each Sonia feature.
   * Related to the feature command, obviously.
   */
  features?: IFirebaseDmFeatureV1 | undefined;

  /**
   * @description
   * The user id.
   */
  id?: Snowflake | undefined;

  /**
   * @description
   * Used to store the last release notes version sent on the DM.
   * This is useful to avoid sending release notes on each run.
   */
  lastReleaseNotesVersion?: string | undefined;

  /**
   * @description
   * The entity version used to perform a clean update when a breaking change occur.
   */
  version?: FirebaseDmVersionEnum.V1 | undefined;
}
