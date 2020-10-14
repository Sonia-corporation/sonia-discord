import _ from "lodash";
import { FirebaseGuildVersionEnum } from "../../../enums/guilds/firebase-guild-version.enum";
import { IFirebaseGuildV2 } from "../../../interfaces/guilds/firebase-guild-v2";
import { IFirebaseGuildV3 } from "../../../interfaces/guilds/firebase-guild-v3";
import { IFirebaseGuildV4 } from "../../../interfaces/guilds/firebase-guild-v4";
import { IFirebaseGuild } from "../../../types/guilds/firebase-guild";

/**
 * @description
 * Check if the given Firebase guild contains a [last release notes version]{@link IFirebaseGuildV2#lastReleaseNotesVersion}
 *
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-001}
 *
 * @param {Readonly<IFirebaseGuild>} firebaseGuild The Firebase guild
 *
 * @return {boolean} true when the given guild is at least [v2]{@link FirebaseGuildVersionEnum.V2}
 */
export function hasFirebaseGuildLastReleaseNotesVersion(
  firebaseGuild: Readonly<IFirebaseGuild>
): firebaseGuild is IFirebaseGuildV2 | IFirebaseGuildV3 | IFirebaseGuildV4 {
  return _.includes(
    [
      FirebaseGuildVersionEnum.V2,
      FirebaseGuildVersionEnum.V3,
      FirebaseGuildVersionEnum.V4,
    ],
    firebaseGuild.version
  );
}
