import { FirebaseGuildVersionEnum } from '../../../enums/guilds/firebase-guild-version.enum';
import { IFirebaseGuildV4 } from '../../../interfaces/guilds/firebase-guild-v4';
import { IFirebaseGuildV5 } from '../../../interfaces/guilds/firebase-guild-v5';
import { IFirebaseGuild } from '../../../types/guilds/firebase-guild';
import _ from 'lodash';

/**
 * @description
 * Check if the given Firebase guild contains some [channels]{@link IFirebaseGuildV3#channels}.
 * @param   {IFirebaseGuild} firebaseGuild The Firebase guild.
 * @returns {boolean}                      True when the given guild is at least [v4]{@link FirebaseGuildVersionEnum.V4}.
 * @see [sonia-link-001]{@link https://github.com/Sonia-corporation/sonia-discord/blob/master/CONTRIBUTING.md#sonia-link-001}.
 */
export function hasFirebaseGuildChannels(
  firebaseGuild: IFirebaseGuild
): firebaseGuild is IFirebaseGuildV4 | IFirebaseGuildV5 {
  return _.includes([FirebaseGuildVersionEnum.V4, FirebaseGuildVersionEnum.V5], firebaseGuild.version);
}
