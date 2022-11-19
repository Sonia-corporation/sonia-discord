import { FirebaseGuildVersionEnum } from '../../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV2 } from '../../../interfaces/guilds/firebase-guild-v2';
import { IFirebaseGuildV3 } from '../../../interfaces/guilds/firebase-guild-v3';
import { IFirebaseGuildV4 } from '../../../interfaces/guilds/firebase-guild-v4';
import { IFirebaseGuild } from '../../../types/guilds/firebase-guild';
import _ from 'lodash';

/**
 * @description
 * Check if the given Firebase guild contains a [last release notes version]{@link IFirebaseGuildV2#lastReleaseNotesVersion}
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-001}
 * @param {IFirebaseGuild} firebaseGuild The Firebase guild
 * @returns {boolean} true when the given guild is at least [v2]{@link FirebaseGuildVersionEnum.V2}
 */
export function hasFirebaseGuildLastReleaseNotesVersion(
  firebaseGuild: IFirebaseGuild
): firebaseGuild is (IFirebaseGuildV2 | IFirebaseGuildV3 | IFirebaseGuildV4) & { lastReleaseNotesVersion: string } {
  return _.includes(
    [
      FirebaseGuildVersionEnum.V2,
      FirebaseGuildVersionEnum.V3,
      FirebaseGuildVersionEnum.V4,
      FirebaseGuildVersionEnum.V5,
    ],
    firebaseGuild.version
  );
}
