import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV1 } from '../../interfaces/guilds/firebase-guild-v1';
import { IFirebaseGuildV2 } from '../../interfaces/guilds/firebase-guild-v2';

/**
 * @param root0
 * @param root0.id
 */
export function upgradeFirebaseGuildToV2({ id }: IFirebaseGuildV1): IFirebaseGuildV2 {
  return {
    id,
    lastReleaseNotesVersion: `0.0.0`,
    version: FirebaseGuildVersionEnum.V2,
  };
}
