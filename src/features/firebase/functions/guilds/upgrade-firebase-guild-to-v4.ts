import { FirebaseGuildVersionEnum } from '../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV3 } from '../../interfaces/guilds/firebase-guild-v3';
import { IFirebaseGuildV4 } from '../../interfaces/guilds/firebase-guild-v4';

/**
 * @param root0
 * @param root0.id
 * @param root0.lastReleaseNotesVersion
 */
export function upgradeFirebaseGuildToV4({
  id,
  lastReleaseNotesVersion,
}: Readonly<IFirebaseGuildV3>): IFirebaseGuildV4 {
  return {
    channels: {},
    id,
    lastReleaseNotesVersion,
    version: FirebaseGuildVersionEnum.V4,
  };
}
