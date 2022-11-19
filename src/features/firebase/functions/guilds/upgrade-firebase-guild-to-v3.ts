import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV2 } from '../../interfaces/guilds/firebase-guild-v2';
import { IFirebaseGuildV3 } from '../../interfaces/guilds/firebase-guild-v3';

export function upgradeFirebaseGuildToV3({ id, lastReleaseNotesVersion }: IFirebaseGuildV2): IFirebaseGuildV3 {
  return {
    channels: [],
    id,
    lastReleaseNotesVersion,
    version: FirebaseGuildVersionEnum.V3,
  };
}
