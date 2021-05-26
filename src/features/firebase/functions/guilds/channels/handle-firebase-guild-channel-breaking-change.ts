import { upgradeFirebaseGuildChannelToV2 } from './upgrade-firebase-guild-channel-to-v2';
import { FirebaseGuildChannelVersionEnum } from '../../../enums/guilds/channels/firebase-guild-channel-version.enum';
import { IFirebaseGuildChannel } from '../../../types/guilds/channels/firebase-guild-channel';
import { IFirebaseGuildChannelVFinal } from '../../../types/guilds/channels/firebase-guild-channel-v-final';

/**
 * @description
 * Upgrade the given object to the latest possible version of a [Firebase guild channel]{@link IFirebaseGuildChannel}
 * Based on the [version]{@link IFirebaseGuildChannel#version}
 *
 * @param {Readonly<IFirebaseGuildChannel>} firebaseGuildChannel The [Firebase guild channel]{@link IFirebaseGuildChannel} to update
 *
 * @returns {IFirebaseGuildChannel} Updated [Firebase guild channel]{@link IFirebaseGuildChannel}
 */
export function handleFirebaseGuildChannelBreakingChange(
  firebaseGuildChannel: Readonly<IFirebaseGuildChannel>
): IFirebaseGuildChannelVFinal | never {
  if (firebaseGuildChannel.version === FirebaseGuildChannelVersionEnum.V2) {
    return firebaseGuildChannel;
  }

  if (firebaseGuildChannel.version === FirebaseGuildChannelVersionEnum.V1) {
    return handleFirebaseGuildChannelBreakingChange(upgradeFirebaseGuildChannelToV2(firebaseGuildChannel));
  }

  throw new Error(`Firebase guild channel version not valid`);
}
