import _ from "lodash";
import { FirebaseGuildVersionEnum } from "../../../enums/guilds/firebase-guild-version.enum";
import { IFirebaseGuildV4 } from "../../../interfaces/guilds/firebase-guild-v4";
import { IFirebaseGuild } from "../../../types/guilds/firebase-guild";

/**
 * @description
 * Check if the given Firebase guild contains some [channels]{@link IFirebaseGuildV3#channels}
 *
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/il-est-midi-discord/blob/master/CONTRIBUTING.md#sonia-link-001}
 *
 * @param {Readonly<IFirebaseGuild>} firebaseGuild The Firebase guild
 *
 * @return {boolean} true when the given guild is at least [v4]{@link FirebaseGuildVersionEnum.V4}
 */
export function hasFirebaseGuildChannels(
  firebaseGuild: Readonly<IFirebaseGuild>
): firebaseGuild is IFirebaseGuildV4 {
  return _.includes([FirebaseGuildVersionEnum.V4], firebaseGuild.version);
}
