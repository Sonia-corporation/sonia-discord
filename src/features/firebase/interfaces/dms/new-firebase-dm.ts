import { INewFirebaseDmFeature } from './features/new-firebase-dm-feature';
import { FirebaseDmVersionEnum } from '../../enums/dms/firebase-dm-version.enum';
import { Snowflake } from 'discord.js';

export interface INewFirebaseDm {
  features: INewFirebaseDmFeature;
  id: Snowflake;
  lastReleaseNotesVersion: string;
  version: FirebaseDmVersionEnum.V1;
}
